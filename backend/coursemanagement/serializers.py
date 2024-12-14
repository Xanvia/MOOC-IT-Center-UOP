from rest_framework import serializers
from .models import CourseTeachers, CoursePermissions, AdminMessages, Payments
from django.contrib.auth.models import User
from courses.models import (
    Progress,
    StudentCodingAnswer,
    StudentQuiz,
    Quiz,
    CodingAssignment,
    Question,
    Answer,
    Enrollment,
    Component,
    Course,
)
import uuid


class CourseTeachersSerializer(serializers.ModelSerializer):
    teacher = serializers.CharField()

    class Meta:
        model = CourseTeachers
        fields = "__all__"

    def validate(self, attrs):
        course = attrs.get("course")
        teacher = attrs.get("teacher")
        try:
            teacher = User.objects.get(username=teacher)
            if not teacher.groups.filter(name="teacher").exists():
                raise serializers.ValidationError("User is not a teacher")
            attrs["teacher"] = teacher
        except User.DoesNotExist:
            raise serializers.ValidationError({"teacher": "User does not exist"})

        if CourseTeachers.objects.filter(course=course, teacher=teacher).exists():
            raise serializers.ValidationError("Teacher already added to course")
        return attrs

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation["name"] = (
            instance.teacher.first_name + " " + instance.teacher.last_name
        )
        representation["email"] = instance.teacher.email
        representation["role"] = instance.role

        try:
            if instance.teacher.userprofile.profile_image:
                representation["profile_picture"] = (
                    instance.teacher.userprofile.profile_image.url
                )
            else:
                representation["profile_picture"] = (
                    instance.teacher.userprofile.profile_picture
                    if instance.teacher.userprofile
                    else None
                )
        except Exception:
            representation["profile_picture"] = None

        return representation


class EditCoursePermissionsSerializer(serializers.Serializer):
    permissions = serializers.ListField(child=serializers.CharField())

    def validate(self, attrs):
        permissions = attrs.get("permissions")
        if permissions is None:
            raise serializers.ValidationError("Permissions is required")
        elif len(permissions) == 0:
            raise serializers.ValidationError("Permissions is required")

        for permission in permissions:
            if not CoursePermissions.objects.filter(label=permission).exists():
                raise serializers.ValidationError(
                    f"Permission {permission} does not exist"
                )
        return attrs

    def update(self, instance, validated_data):
        instance.permissions.clear()
        for permission in validated_data.get("permissions"):
            permission_obj = CoursePermissions.objects.get(label=permission)
            instance.permissions.add(permission_obj)
        self.fields.pop("permissions")
        return instance


class CoursePermissionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoursePermissions
        fields = "__all__"


class StudentQuizSerializer(serializers.ModelSerializer):
    quiz_details = serializers.SerializerMethodField()

    class Meta:
        model = Progress
        fields = ["quiz_details"]

    def get_quiz_details(self, instance):
        component = instance.component
        result = {
            "name": component.name,
            "type": component.type,
            "grade": None,
            "graded": False,
            "grade_approved": False,
            "id": None,
            "completed": instance.completed,
        }

        # Get enrollment
        enrollment = instance.enrollment
        if instance.component.type == "Quiz":
            try:
                student_quiz = StudentQuiz.objects.get(
                    enrollement=enrollment, quiz=component
                )
                result.update(
                    {
                        "grade": student_quiz.score,
                        "graded": student_quiz.graded,
                        "grade_approved": student_quiz.grade_approved,
                        "id": student_quiz.id,
                    }
                )
            except StudentQuiz.DoesNotExist:
                pass
        elif instance.component.type == "Code":
            try:
                student_coding = StudentCodingAnswer.objects.get(
                    enrollement=enrollment, coding_assignment=component
                )
                result.update(
                    {
                        "grade": float(student_coding.grade),
                        "graded": student_coding.graded is True,
                        "grade_approved": student_coding.graded is True,
                        "id": student_coding.id,
                    }
                )
            except StudentCodingAnswer.DoesNotExist:
                pass
        return result

    def to_representation(self, instance):
        if not instance.completed:
            return None
        representation = super().to_representation(instance)

        course = instance.enrollment.course
        user = self.context.get("request").user

        if course.course_creator == user:
            representation["quiz_details"]["can_grade"] = True
        else:
            course_teacher = CourseTeachers.objects.filter(
                course=course, teacher=user
            ).first()

            has_grading_permission = (
                course_teacher
                and CoursePermissions.objects.filter(label="grade_assignments").first()
                in course_teacher.permissions.all()
            )
            representation["quiz_details"]["can_grade"] = has_grading_permission

        return representation["quiz_details"]


class QuestionAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ["id", "text", "is_correct"]


class QuestionSerializer(serializers.ModelSerializer):
    answers = serializers.SerializerMethodField()
    student_answer = serializers.SerializerMethodField()

    class Meta:
        model = Question
        fields = ["id", "text", "question_type", "score", "answers", "student_answer"]

    def get_answers(self, question):
        # For open-ended questions, don't return answer choices
        if question.question_type == Question.OPENN_ENDED:
            return None

        return QuestionAnswerSerializer(question.answers.all(), many=True).data

    def get_student_answer(self, question):
        student_quiz = self.context.get("student_quiz")
        if not student_quiz:
            return None

        # Assuming student_answers is a dictionary
        student_answers = student_quiz.student_answers
        question_id = str(
            question.id
        )  # Ensure question_id is a string to match the dictionary keys

        # Get the student's answer for this question
        student_answer = student_answers.get(question_id)
        if student_answer is None:
            return None

        # Fetch correct answers from the Answer model
        correct_answers = question.answers.filter(is_correct=True).values_list(
            "text", flat=True
        )

        # Handle the response based on the question type
        if question.question_type == Question.OPENN_ENDED:
            return {"id": question_id, "text": student_answer}
        elif question.question_type == Question.MULTIPLE_CORRECT:
            return {
                "selected_answers": student_answer,
                "correct_answers": list(correct_answers),
            }
        else:  # SINGLE_CORRECT
            return {
                "selected_answer": student_answer,
                "correct_answer": correct_answers.first(),
            }

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation.pop("answers")
        return representation


class StudentQuizDetailSerializer(serializers.ModelSerializer):
    questions = serializers.SerializerMethodField()
    quiz_name = serializers.CharField(source="quiz.name")
    deadline = serializers.DateTimeField(source="quiz.deadline")
    duration = serializers.DurationField(source="quiz.duration")

    class Meta:
        model = StudentQuiz
        fields = [
            "id",
            "quiz_name",
            "deadline",
            "duration",
            "score",
            "graded",
            "completed_at",
            "questions",
            "grade_approved",
        ]

    def get_questions(self, student_quiz):
        questions = student_quiz.quiz.questions.all()
        # Pass the student_quiz instance to the QuestionSerializer context
        serializer = QuestionSerializer(
            questions, many=True, context={"student_quiz": student_quiz}
        )
        return serializer.data


class StudentCodeDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentCodingAnswer
        fields = "__all__"

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation["question"] = instance.coding_assignment.question
        representation["language"] = instance.coding_assignment.language
        return representation


class AdminMessagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdminMessages
        fields = "__all__"


class GetCoursePermissionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseTeachers
        fields = ["permissions"]

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation["permissions"] = [
            permission.label for permission in instance.permissions.all()
        ]
        return representation


class StudentListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Enrollment
        fields = ["student"]

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        student = instance.student
        representation["id"] = student.id
        representation["name"] = student.first_name + " " + student.last_name
        representation["email"] = student.email
        representation.pop("student")

        components = Component.objects.filter(chapter__week__course=instance.course)
        try:

            enrollement = Enrollment.objects.get(
                student=student.id, course=instance.course.id
            )
            completed_components = components.filter(
                progress__completed=True, progress__enrollment=enrollement.id
            )
            progress_percentage = round(
                (completed_components.count() / components.count()) * 100
                if components.count() > 0
                else 0
            )

            # Identify the current component
            current_component = components.filter(
                progress__completed=False, progress__enrollment__student=student.id
            ).first()

            representation["progress"] = progress_percentage

        except Exception as e:
            raise serializers.ValidationError(
                {"error": "You are not enrolled in this course"}
            )

        try:
            representation["profile_picture"] = student.userprofile.profile_image.url
        except ValueError:
            representation["profile_picture"] = student.userprofile.profile_picture
        return representation


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payments
        fields = "__all__"

    def validate(self, attrs):
        enrollement = attrs.get("enrollement")
        attrs["order_id"] = str(uuid.uuid4())
        attrs["amount"] = enrollement.course.price
        return super().validate(attrs)


class GradeQuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentQuiz
        fields = ["score", "student_answers"]

    def validate(self, attrs):
        if attrs.get("score") is None:
            raise serializers.ValidationError("Score is required")
        attrs["graded"] = True
        return super().validate(attrs)

    def update(self, instance, validated_data):
        if instance.graded == True:
            instance.grade_approved = True
        return super().update(instance, validated_data)


class GradeCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentCodingAnswer
        fields = ["grade"]

    def validate(self, attrs):
        if attrs.get("grade") is None:
            raise serializers.ValidationError("Grade is required")
        attrs["graded"] = True
        return super().validate(attrs)


class CourseMessagesSerializer(serializers.ModelSerializer):

    class Meta:
        model = CourseTeachers
        fields = ["messages"]
    
class TeacherSerializer(serializers.ModelSerializer):
    course_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = User
        fields = ["id", "first_name", "last_name", "email", "course_id", "username"]

    def to_representation(self, instance):
        course_id = (
            self.context.get("request").parser_context["kwargs"].get("course_id")
        )
        representation = super().to_representation(instance)

        try:
            if course_id:
                course = Course.objects.get(id=course_id)
                user = User.objects.get(id=instance.id)
                course_teacher = CourseTeachers.objects.get(course=course, teacher=user)
                representation["added"] = True
            else:
                representation["added"] = False
        except Course.DoesNotExist:
            pass
        except User.DoesNotExist:
            pass
        except CourseTeachers.DoesNotExist:
            representation["added"] = False

        representation["name"] = instance.first_name + " " + instance.last_name

        return representation
