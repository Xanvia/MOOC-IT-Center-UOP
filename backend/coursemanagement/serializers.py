from rest_framework import serializers
from .models import CourseTeachers


class CourseTeachersSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseTeachers
        fields = "__all__"

    

