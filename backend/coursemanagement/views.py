from django.shortcuts import render
from rest_framework import viewsets
from .serializers import CourseTeachersSerializer
from .models import CourseTeachers
from .permissions import IsCourseCreator


class CourseTeacherViewSet(viewsets.ModelViewSet):
    serializer_class = CourseTeachersSerializer
    queryset = CourseTeachers.objects.all()
    permission_classes = [IsCourseCreator]

    def create(self, request, *args, **kwargs):

        request.data["course"] = kwargs.get("course_id")
        response = super().create(request, *args, **kwargs)
        response.data = {
            "status": "success",
            "message": "Teacher added to course",
        }
        return response
