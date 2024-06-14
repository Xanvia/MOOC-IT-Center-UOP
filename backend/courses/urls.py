from django.urls import path
from .views import CourseCreateView

urlpatterns = [
    path(
        "",
        CourseCreateView.as_view({"get": "list", "post": "create"}),
        name="course-list",
    ),
    path(
        "<int:pk>",
        CourseCreateView.as_view({"get": "retrieve", "patch": "add_details"}),
        name="course-detail",
    ),
]
