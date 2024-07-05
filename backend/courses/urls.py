from django.urls import path
from .views import CourseViewSet, WeekViewSet, ChapterViewSet, NoteViewSet

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
    path("<int:pk>/week/", WeekViewSet.as_view({"post": "create"}), name="week-list"),
    path(
        "week/<int:pk>/chapter/",
        ChapterViewSet.as_view({"post": "create"}),
        name="chapter-list",
    ),
    path(
        "week/chapter/<int:chapter_id>/note/",
        NoteViewSet.as_view({"post": "create"}),
        name="note-list",
    ),
]
