from django.urls import path
from .views import (
    CourseTeacherViewSet,
    EditPermissionAPIView,
    StudentQuizListAPIView,
    StudentCodingDetailAPIView,
    StudentQuizDetailAPIView,
    GradeCodingAPIView,
    GradeQuizAPIView,
)


urlpatterns = [
    path(
        "<int:course_id>/add-teacher/",
        CourseTeacherViewSet.as_view(
            {"post": "create"},
        ),
        name="course-teacher-list",
    ),
    path(
        "teacher/<int:course_id>/permissions/",
        EditPermissionAPIView.as_view(),
        name="edit-permissions",
    ),
    path(
        "<int:course_id>/quizes/<int:student_id>/",
        StudentQuizListAPIView.as_view(),
        name="student-quizes",
    ),
    path(
        "quiz/<int:pk>", StudentQuizDetailAPIView.as_view(), name="submission-details"
    ),
    path(
        "code/<int:pk>", StudentCodingDetailAPIView.as_view(), name="submission-details"
    ),
    path("grade-quiz/<int:pk>", GradeQuizAPIView.as_view(), name="grade-quiz"),
    path("grade-code/<int:pk>", GradeCodingAPIView.as_view(), name="grade-code"),
]
