from rest_framework import serializers
from .models import CourseTeachers, CoursePermissions
from django.contrib.auth.models import User
from courses.models import (
    Progress,
    StudentCodingAnswer,
    StudentQuiz,
    Quiz,
    CodingAssignment,
)


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
        fields = ["completed", "quiz_details"]

    def get_quiz_details(self, instance):
        component = instance.component
        result = {
            "name": component.name,
            "type": component.type,
            "grade": None,
            "graded": False,
            "student_submission_id": None,
        }

        # Get enrollment
        enrollment = instance.enrollment
        # Check if component is Quiz
        if instance.component.type == "Quiz":
            try:
                student_quiz = StudentQuiz.objects.get(
                    enrollement=enrollment, quiz=component
                )
                result.update(
                    {
                        "grade": student_quiz.score,
                        "graded": student_quiz.graded,
                        "student_submission_id": student_quiz.id,
                    }
                )
            except StudentQuiz.DoesNotExist:
                pass

        if instance.component.type == "Code":
            try:
                student_coding = StudentCodingAnswer.objects.get(
                    enrollement=enrollment, coding_assignment=component
                )
                result.update(
                    {
                        "grade": float(student_coding.grade),
                        "graded": True if student_coding.grade is not None else False,
                        "student_submission_id": student_coding.id,
                    }
                )
            except StudentCodingAnswer.DoesNotExist:
                pass

        return result

    def to_representation(self, instance):
        if not instance.completed:
            pass

        if instance.component.type != "Quiz":
            if instance.component.type != "Code":
                pass

        representation = super().to_representation(instance)
        return representation
