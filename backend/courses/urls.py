from django.urls import path
from .views import CourseCreateView

urlpatterns = [
    path(
        "",
        CourseCreateView.as_view({"get": "retrieve", "post": "create"}),
        name="course-list",
    )
]
