from django.shortcuts import render
from rest_framework import viewsets
from .serializers import CourseTeacherSerializer
from .models import CourseTeachers
from .permissions import IsCourseCreator


class CourseTeacherViewSet(viewsets.ModelViewSet):
    serializer_class = CourseTeacherSerializer
    queryset = CourseTeachers.objects.all()
    permission_classes = [IsCourseCreator]

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        response.data = {
            "message": "Teacher added to course",
            "data": response.data,
        }
        return response
