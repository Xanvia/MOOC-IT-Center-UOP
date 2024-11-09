from django.urls import path
from .views import CourseTeacherViewSet,EditPermissionAPIView


urlpatterns = [
    path(
        "<int:course_id>/add-teacher/", CourseTeacherViewSet.as_view({"post": "create"},), name="course-teacher-list"
    ),
    path(
        "teacher/<int:course_id>/permissions/", EditPermissionAPIView.as_view(), name="edit-permissions"
    ),
    # path('api/admin-statistics/', AdminStatisticApiView.as_view(), name='admin-statistics'
    # ),
]
