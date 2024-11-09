from rest_framework import viewsets, generics
from rest_framework.response import Response
from .serializers import (
    CourseTeachersSerializer,
    EditCoursePermissionsSerializer,
    CoursePermissionsSerializer,
)
from .models import CourseTeachers, CoursePermissions
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


class PermissionsListAPIView(generics.ListAPIView):
    queryset = CoursePermissions.objects.all()
    serializer_class = CoursePermissionsSerializer


class EditPermissionAPIView(generics.UpdateAPIView):
    serializer_class = EditCoursePermissionsSerializer
    queryset = CourseTeachers.objects.all()
    permission_classes = [IsCourseCreator]

    def get_object(self):
        return self.queryset.get(course=self.kwargs.get("course_id"))

    def update(self, request, *args, **kwargs):
        response = super().update(request, partial=True, *args, **kwargs)

        response.data = {
            "status": "success",
            "message": "Permissions updated successfully",
        }

        return response
    
class AdminStatisticApiView(generics.GenericAPIView):
    def get(self, request, *args, **kwargs):
        total_students = Student.objects.count()
        total_teachers = Teacher.objects.count()
        total_courses = Course.objects.count()
        total_paid_students = Student.objects.filter(is_paid=True).count()

        # Add other statistics or any additional data processing here as needed

        data = {
            'total_students': total_students,
            'total_teachers': total_teachers,
            'total_courses': total_courses,
            'total_paid_students': total_paid_students,
        }

        return Response(data)

