from django.urls import path
from .views import CourseTeacherViewSet,EditPermissionAPIView,StudentQuizListAPIView


urlpatterns = [
    path(
        "<int:course_id>/add-teacher/", CourseTeacherViewSet.as_view({"post": "create"},), name="course-teacher-list"
    ),
    path(
        "teacher/<int:course_id>/permissions/", EditPermissionAPIView.as_view(), name="edit-permissions"
    ),
    path("<int:course_id>/quizes/<int:student_id>/", StudentQuizListAPIView.as_view(), name="student-quizes"),
]
