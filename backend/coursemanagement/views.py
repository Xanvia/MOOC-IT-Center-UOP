from rest_framework import viewsets, generics
from rest_framework.response import Response
from .serializers import (
    CourseTeachersSerializer,
    EditCoursePermissionsSerializer,
    CoursePermissionsSerializer,
    StudentQuizSerializer,
    StudentCodeDetailSerializer,
    StudentQuizDetailSerializer,
)
from .models import CourseTeachers, CoursePermissions
from .permissions import IsCourseCreator
from courses.models import (
    Course,
    Progress,
    Enrollment,
    StudentCodingAnswer,
    StudentQuiz,
)


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


class StudentQuizListAPIView(generics.ListAPIView):
    queryset = Progress.objects.all()
    serializer_class = StudentQuizSerializer

    def get_queryset(self):
        try:
            enrollement = Enrollment.objects.get(
                course=self.kwargs.get("course_id"),
                student=self.kwargs.get("student_id"),
            )
        except Enrollment.DoesNotExist:
            return Response({"error": "Enrollment not found"}, status=404)
        return self.queryset.filter(enrollment=enrollement)


class StudentQuizDetailAPIView(generics.RetrieveAPIView):
    queryset = StudentQuiz.objects.all()
    serializer_class = StudentQuizDetailSerializer

    def get_object(self):
        print("here")
        return super().get_object()


class StudentCodingDetailAPIView(generics.RetrieveAPIView):
    queryset = StudentCodingAnswer.objects.all()
    serializer_class = StudentCodeDetailSerializer
