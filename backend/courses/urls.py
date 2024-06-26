from django.urls import path
from .views import CourseViewSet, WeekCreateView

urlpatterns = [
    path(
        "<int:pk>",
        CourseViewSet.as_view(
            {"get": "retrieve", "patch": "add_details", "put": "update"}
        ),
        name="course-detail",
    ),
    path(
        "",
        CourseViewSet.as_view({"get": "list", "post": "create"}),
        name="course-list",
    ),
    path(
        "<int:pk>",
        CourseViewSet.as_view(
            {"get": "retrieve", "patch": "add_details", "put": "update"}
        ),
        name="course-detail",
    ),
    path(
        "<int:pk>/week/", WeekCreateView.as_view({"post": "create"}), name="week-list"
    ),
]
