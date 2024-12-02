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
    CourseStudentsListAPIView,
    CourseMessagesViewSet,
    GetAllTeachers,
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
        name="course-teachers-list",
    ),
    path(
        "<int:course_id>/add-teacher/<int:teacher_id>/",
        CourseTeacherViewSet.as_view(
            {"delete": "destroy"},
        ),
        name="course-teachers-list",
    ),
    path(
        "<int:course_id>/teachers-all/",
        GetAllTeachers.as_view(),
        name="course-teachers-list",
    ),
    path(
        "<int:course_id>/students/",
        CourseStudentsListAPIView.as_view(),
        name="course-students-list",
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
    path(
        "<int:course_id>/grade-quiz/<int:pk>",
        GradeQuizAPIView.as_view(),
        name="grade-quiz",
    ),
    path(
        "<int:course_id>/grade-code/<int:pk>",
        GradeCodingAPIView.as_view(),
        name="grade-code",
    ),
    path(
        "<int:course_id>/get-teacher-permissions/<int:teacher_id>/",
        TeacherPermissionsRetrieveAPIView.as_view(),
        name="teacher-permissions",
    ),
    path(
        "<int:course_id>/messages/",
        CourseMessagesViewSet.as_view(
            {
                "get": "list",
                "post": "add_message_teacher",
                "put": "update_message_status_teacher",
            },
        ),
        name="course-messages",
    ),
    path(
        "<int:course_id>/messages/<int:teacher_id>/",
        CourseMessagesViewSet.as_view(
            {
                "get": "list",
                "post": "add_message_admin",
                "put": "update_message_status_admin",
            },
        ),
        name="course-messages",
    ),
]
