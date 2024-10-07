from rest_framework import serializers
from django.contrib.auth.models import User
from .models import (
    Course,
    Week,
    Chapter,
    Component,
    Note,
    Image,
    Video,
    Quiz,
    Enrollment,
    Question,
    Answer,
    Progress,
    CodingAssignment,
    StudentQuiz,
    StudentCodingAnswer,
    Announcement,
    ItemChat,
    Message,
    Discussion,
)
from userprofiles.models import Institution
from userprofiles.serializers import InterestSerializer
from coursemanagement.models import CourseTeachers


class CourseTeacherSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ["email", "first_name", "last_name"]

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation["full_name"] = f"{instance.first_name} {instance.last_name}"
        representation["headline"] = instance.userprofile.headline
        if instance.userprofile.profile_image:
            representation["profile_picture"] = instance.userprofile.profile_image.url
        else:
            representation["profile_picture"] = instance.userprofile.profile_picture if instance.userprofile else None
        representation.pop("first_name")
        representation.pop("last_name")
        return representation


class CourseSerializer(serializers.ModelSerializer):
    institution = serializers.CharField()

    class Meta:
        model = Course
        fields = "__all__"

    def validate(self, data):
        request = self.context.get("request")

        if request and request.method == "POST" or request.method == "PUT":
            institution_name = data.pop("institution")
            institution, _ = Institution.objects.get_or_create(label=institution_name)
            data["institution"] = institution

        if request and request.method == "PATCH":
            allowed_fields = {"outcomes", "specifications", "description"}
            # Filter the data to only include allowed fields
            data = {key: value for key, value in data.items() if key in allowed_fields}
        return data

    def to_representation(self, instance):
        # if request.user is a student and if student has an enrollement with this course set isEnrolled to True
        request = self.context.get("request")

        representation = super().to_representation(instance)

        teachers = CourseTeachers.objects.filter(course=instance)
        instructors = [CourseTeacherSerializer(instance.course_creator).data]
        instructors.extend(CourseTeacherSerializer(teacher.teacher).data for teacher in teachers)
        representation["instructors"] = instructors
        representation["category"] = InterestSerializer(instance.category).data
        representation["institution"] = instance.institution.label

        if request and request.user.is_authenticated:
            user = request.user
            try:
                Enrollment.objects.get(student=user, course=instance)
                representation["isEnrolled"] = True
            except Enrollment.DoesNotExist:
                representation["isEnrolled"] = False

            # check if user is a teacher
            # and teacher is the creator of the course or has permissions to edit public details set can edit to true
            if user.groups.filter(name="teacher").exists():
                if instance.course_creator == user:
                    representation["canEdit"] = True
                else:
                    course_teacher = CourseTeachers.objects.filter(
                        teacher=user, course=instance
                    ).first()
                    representation["canEdit"] = course_teacher.permissions.filter(
                        label="edit_course_public_details"
                    ).exists()
            else:
                representation["canEdit"] = False

        return representation


class WeekSerializer(serializers.ModelSerializer):

    class Meta:
        model = Week
        fields = "__all__"

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation["chapters"] = ChapterSerializer(
            instance.chapters, many=True, context=self.context
        ).data

        user = self.context["request"].user
        course = instance.course  # Assuming `instance` has a `course` attribute

        return representation


class ChapterSerializer(serializers.ModelSerializer):

    class Meta:
        model = Chapter
        fields = "__all__"

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation["items"] = ItemSerializer(
            instance.components, many=True, context=self.context
        ).data
        return representation


class ItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = Component
        fields = "__all__"

    def to_representation(self, instance):

        request = self.context.get("request")
        student = request.user
        progress = Progress.objects.filter(
            component=instance, enrollment__student=student
        ).first()
        if instance.type == "Note":
            representation = NoteSerializer(instance.note).data
        elif instance.type == "Quiz":
            representation = QuizSerializer(instance.quiz).data
        elif instance.type == "Video":
            representation = VideoSerializer(instance.video).data
        elif instance.type == "Code":
            representation = CodingQuizSerializer(instance.codingassignment).data
        else:
            return super().to_representation(instance)

        representation["has_started"] = False
        representation["completed"] = False
        if progress:
            representation["has_started"] = True
            if progress.completed:
                representation["completed"] = True

        return representation


class NoteSerializer(serializers.ModelSerializer):
    type = serializers.CharField(default="Note")

    class Meta:
        model = Note
        fields = "__all__"

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation["content"] = instance.content
        return representation


class ImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = Image
        fields = "__all__"


class QuizSerializer(serializers.ModelSerializer):
    type = serializers.CharField(default="Quiz")

    class Meta:
        model = Quiz
        fields = "__all__"

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation["content"] = {
            "deadline": instance.deadline,
            "questions": QuestionSerializer(instance.questions, many=True).data,
        }
        return representation


class CodingQuizSerializer(serializers.ModelSerializer):
    type = serializers.CharField(default="Code")

    class Meta:
        model = CodingAssignment
        fields = "__all__"

    def to_representation(self, instance):
        representation =  super().to_representation(instance)
        representation.pop("test_cases")
        representation.pop("starter_code")
        representation.pop("grading_type")
        representation.pop("language")
        representation.pop("explanation")
        representation.pop("question")
        representation["content"] = {
            "question": instance.question,
            "explanation": instance.explanation,
            "language": instance.language,
            "test_cases": instance.test_cases,
            "duration": instance.duration,
            "starter_code": instance.starter_code,
            "grading_type": instance.grading_type,
        }
        return representation



class VideoSerializer(serializers.ModelSerializer):
    type = serializers.CharField(default="Video")

    class Meta:
        model = Video
        fields = "__all__"

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation.pop("video_link")
        representation.pop("video_id")
        representation.pop("quizzes")
        representation["content"] = {
            "video_link": instance.video_link,
            "duration": instance.duration,
            "quizzes": instance.quizzes,
        }
        return representation


class EnrollementSerializer(serializers.ModelSerializer):

    class Meta:
        model = Enrollment
        fields = "__all__"

    def validate(self, attrs):
        # check if user has an enrollement with this course already
        request = self.context.get("request")
        user = request.user
        course = attrs.get("course")
        try:
            Enrollment.objects.get(student=user, course=course)
            raise serializers.ValidationError("You are already enrolled in this course")
        except Enrollment.DoesNotExist:
            pass
        # TODO: check if user has an payment object that has not linked with an enrollement object
        return super().validate(attrs)


class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ["text", "is_correct"]


class QuestionSerializer(serializers.ModelSerializer):
    answers = AnswerSerializer(many=True, required=False)

    class Meta:
        model = Question
        fields = "__all__"

    def create(self, validated_data):
        answers_data = validated_data.pop("answers", [])
        question = Question.objects.create(**validated_data)
        if answers_data:
            for answer_data in answers_data:
                Answer.objects.create(question=question, **answer_data)
        return question


class ProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Progress
        fields = "__all__"

    def to_internal_value(self, data):
        request = self.context.get("request")
        if request.method == "POST":
            component_id = data.get("component")
            component = Component.objects.get(id=component_id)
            user = request.user
            course = course = component.chapter.week.course
            try:
                enrollement = Enrollment.objects.get(student=user, course=course)
            except Enrollment.DoesNotExist:
                raise serializers.ValidationError("You are not enrolled in this course")
            data["enrollment"] = enrollement.id
        return super().to_internal_value(data)


class ProgressTrackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ["id"]

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        components = Component.objects.filter(chapter__week__course=instance)

        request = self.context.get("request")
        user = request.user
        try:
            enrollement = Enrollment.objects.get(student=user.id, course=instance.id)
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
                progress__completed=False, progress__enrollment__student=user
            ).first()

            representation["progress"] = progress_percentage
            if current_component:
                representation["current_component"] = {
                    "week": current_component.chapter.week.id,
                    "chapter": current_component.chapter.id,
                    "id": current_component.id,
                    "name": current_component.name,
                }
            return representation

        except Enrollment.DoesNotExist:
            raise serializers.ValidationError(
                {"error": "You are not enrolled in this course"}
            )


class StudentQuizSerializer(serializers.ModelSerializer):

    class Meta:
        model = StudentQuiz
        fields = ["quiz", "student_answers","score"]

    def validate(self, attrs):
        # check if student has already answered this quiz
        request = self.context.get("request")
        user = request.user
        quiz = attrs.get("quiz")
        enrollement = Enrollment.objects.get(student=user, course=quiz.chapter.week.course)
        attrs["enrollement"] = enrollement
        try:
            StudentQuiz.objects.get(enrollement__student=user, quiz=quiz)
            raise serializers.ValidationError("You have already answered this quiz")
        except StudentQuiz.DoesNotExist:
            pass
        return super().validate(attrs)
    
    def create(self, validated_data):
        quiz = validated_data.get("quiz")
        # we have to iterate through all the questions in the quiz, in order to check if theres atleast one open_ended
        open_ended = False
        for question in quiz.questions.all():
            if question.question_type == Question.OPENN_ENDED:
                open_ended = True
        validated_data["graded"] = not open_ended


        return super().create(validated_data)
    
    

class StudentCodingSerializer(serializers.ModelSerializer):

    class Meta:
        model = StudentCodingAnswer
        fields = ["coding_assignment", "code", "result","grade"]

    def validate(self, attrs):
        # check if student has already answered this quiz
        request = self.context.get("request")
        user = request.user
        coding_assignment = attrs.get("coding_assignment")
        enrollement = Enrollment.objects.get(student=user, course=coding_assignment.chapter.week.course)
        attrs["enrollement"] = enrollement
        try:
            StudentCodingAnswer.objects.get(enrollement__student=user, coding_assignment=coding_assignment)
            raise serializers.ValidationError("You have already submitted this quiz")
        except StudentCodingAnswer.DoesNotExist:
            pass
        return super().validate(attrs)
    


class AnnouncementSerializer(serializers.ModelSerializer):

    class Meta:
        model = Announcement
        fields = "__all__"
