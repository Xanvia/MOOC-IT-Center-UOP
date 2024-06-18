from django.urls import path
from .views import CourseViewSet, CourseDetailView

urlpatterns = [
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
    path("courses/<int:pk>/", CourseDetailView.as_view(), name="course-detail"),
]
