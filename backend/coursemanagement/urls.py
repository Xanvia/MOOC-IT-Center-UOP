from django.urls import path
from .views import CourseTeacherViewSet,EditPermissionAPIView


urlpatterns = [
    path(
        "<int:course_id>/add-teacher/", CourseTeacherViewSet.as_view({"post": "create"},), name="course-teacher-list"
    ),
    # path(
    #     "<int:course_id>/add-teacher/", EditPermissionAPIView.as_view({"post": "create", "put": "update"},), name="course-teacher-list"
    # ),
    path(
        "course-teacher/<int:pk>/edit-permissions/", EditPermissionAPIView.as_view(), name="edit-permissions"
    ),

]
