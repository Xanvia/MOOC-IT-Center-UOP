from django.urls import path
from .views import (
    CourseViewSet,
    WeekViewSet,
    ChapterViewSet,
    NoteViewSet,
    ImageUpload,
    VideoViewSet,
    EnrollementViewSet,
)

urlpatterns = [
    # get course details, update course details, create course
    path(
        "<int:pk>",
        CourseViewSet.as_view(
            {"get": "retrieve", "patch": "add_details", "put": "update"}
        ),
        name="course-detail",
    ),
    # get all courses, create course
    path(
        "",
        CourseViewSet.as_view({"get": "list", "post": "create"}),
        name="course-list",
    ),
    # get course detials, update course details, delete course
    path(
        "<int:pk>",
        CourseViewSet.as_view(
            {"get": "retrieve", "patch": "add_details", "put": "update"}
        ),
        name="course-detail",
    ),
    # delete week
    path(
        "week/<int:pk>/", WeekViewSet.as_view({"delete": "destroy"}), name="week-detail"
    ),
    # get all weeks, create week
    path(
        "<int:course_id>/week/",
        WeekViewSet.as_view({"post": "create", "get": "list"}),
        name="week-list",
    ),
    # create chapter
    path(
        "week/<int:pk>/chapter/",
        ChapterViewSet.as_view({"post": "create"}),
        name="chapter-list",
    ),
    # delete chapter
    path(
        "week/chapter/<int:pk>/",
        ChapterViewSet.as_view({"delete": "destroy"}),
        name="chapter-detail",
    ),
    # update note , delete note
    path(
        "week/chapter/note/<int:pk>/",
        NoteViewSet.as_view({"put": "update", "delete": "destroy"}),
        name="note-detail",
    ),
    # create note
    path(
        "week/chapter/<int:chapter_id>/note/",
        NoteViewSet.as_view({"post": "create"}),
        name="note-list",
    ),
    # upload image
    path("note/<int:note_id>/image/", ImageUpload.as_view(), name="image-upload"),
    # create video
    path(
        "week/chapter/<int:chapter_id>/video/",
        VideoViewSet.as_view({"post": "create"}),
        name="video-list",
    ),
    # enroll in course
    path(
        "<int:course_id>/enroll/",
        EnrollementViewSet.as_view({"post": "enroll"}),
        name="enroll-course",
    ),
    # upload video file
    path("video/<int:pk>/", VideoViewSet.as_view({"put": "update"}), name="video-file"),
]
