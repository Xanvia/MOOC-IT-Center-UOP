from django.urls import path
from .views import CourseTeacherViewSet


urlpatterns = [
    path(
        "<int:course_id>/add-teacher/", CourseTeacherViewSet.as_view({"post": "create"})
    ),
]
