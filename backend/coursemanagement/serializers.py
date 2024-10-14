from rest_framework import serializers
from .models import CourseTeachers, CoursePermissions
from django.contrib.auth.models import User


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
