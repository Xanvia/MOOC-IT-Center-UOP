from django.urls import path
from .views import (
    CourseTeacherViewSet,
    EditPermissionAPIView,
    StudentQuizListAPIView,
    StudentCodingDetailAPIView,
    StudentQuizDetailAPIView,
    GradeCodingAPIView,
    GradeQuizAPIView,
    TeacherPermissionsRetrieveAPIView,
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
        "<int:course_id>/teachers/",
        CourseTeacherViewSet.as_view(
            {"get": "list"},
        ),
        name="course-teacher-list",
    ),
    path(
        "<int:course_id>/teacher-permissions/<int:teacher_id>/",
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
    path(
        "<int:course_id>/teacher/",
        CourseTeacherViewSet.as_view(
            {"get": "list"},
        ),
        name="course-teachers-list",
    ),
    path(
        "<int:course_id>/get-teacher-permissions/<int:teacher_id>/",
        TeacherPermissionsRetrieveAPIView.as_view(),
        name="teacher-permissions",
    ),
]
