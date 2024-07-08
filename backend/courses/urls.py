from django.urls import path
from .views import (
    CourseViewSet,
    WeekViewSet,
    ChapterViewSet,
    NoteViewSet,
    ImageUpload,
    VideoViewSet,
)

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
    path("<int:pk>/week/", WeekViewSet.as_view({"post": "create", "get":"list"}), name="week-list"),
    path(
        "week/<int:pk>/", WeekViewSet.as_view({"delete": "destroy"}), name="week-detail"
    ),
    path(
        "week/<int:pk>/chapter/",
        ChapterViewSet.as_view({"post": "create"}),
        name="chapter-list",
    ),
    path(
        "week/chapter/<int:pk>/",
        ChapterViewSet.as_view({"delete": "destroy"}),
        name="chapter-detail",
    ),
    path(
        "week/chapter/note/<int:pk>/",
        NoteViewSet.as_view({"put": "update", "delete": "destroy"}),
        name="note-detail",
    ),
    path(
        "week/chapter/<int:chapter_id>/note/",
        NoteViewSet.as_view({"post": "create"}),
        name="note-list",
    ),
    path("note/<int:note_id>/image/", ImageUpload.as_view(), name="image-upload"),
    path(
        "week/chapter/<int:chapter_id>/video/",
        VideoViewSet.as_view({"post": "create"}),
        name="video-list",
    ),
]
