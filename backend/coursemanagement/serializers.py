from rest_framework import serializers
from .models import (CourseTeachers,CoursePermissions)
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
    

class CoursePermissionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoursePermissions
        fields = "__all__"
