from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CourseViewSet,
    WeekViewSet,
    ChapterViewSet,
    NoteViewSet,
    ImageUpload,
    VideoViewSet,
    QuizViewSet,
    EnrollementViewSet,
    AddQuestionsViewSet,
    ProgressTrackViewSet,
    GetProgressAPIView,
)

router = DefaultRouter()
router.register(r"progress", ProgressTrackViewSet, basename="progress")

urlpatterns = [
    # get course details, update course details, create course
    path(
        "<int:course_id>",
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
        "<int:course_id>",
        CourseViewSet.as_view(
            {"get": "retrieve", "patch": "add_details", "put": "update"}
        ),
        name="course-detail",
    ),
    # delete week
    path(
        "week/<int:week_id>/", WeekViewSet.as_view({"delete": "destroy"}), name="week-detail"
    ),
    # get all weeks, create week
    path(
        "<int:course_id>/week/",
        WeekViewSet.as_view({"post": "create", "get": "list"}),
        name="week-list",
    ),
    # create chapter
    path(
        "week/<int:week_id>/chapter/",
        ChapterViewSet.as_view({"post": "create"}),
        name="chapter-list",
    ),
    # delete chapter
    path(
        "week/chapter/<int:chapter_id>/",
        ChapterViewSet.as_view({"delete": "destroy"}),
        name="chapter-detail",
    ),
    # update note , delete note
    path(
        "week/chapter/note/<int:note_id>/",
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
    path(
        "week/chapter/video/<int:video_id>/",
        VideoViewSet.as_view(
            {"put": "update", "delete": "destroy", "patch": "edit_quiz"}
        ),
        name="video-file",
    ),
    # create quiz
    path(
        "week/chapter/<int:chapter_id>/quiz/",
        QuizViewSet.as_view({"post": "create"}),
        name="quiz-list",
    ),
    # update delete quiz
    path(
        "week/chapter/quiz/<int:quiz_id>/",
        QuizViewSet.as_view({"put": "update", "delete": "destroy"}),
        name="quiz-detail",
    ),
    path(
        "quiz/<int:quiz_id>/questions/",
        AddQuestionsViewSet.as_view({"post": "create"}),
        name="add-questions",
    ),
    path(
        "component/<int:component_id>/start/",
        ProgressTrackViewSet.as_view({"post": "start_component"}),
        name="start_component",
    ),
    path(
        "component/completed/<int:pk>/",
        ProgressTrackViewSet.as_view({"patch": "mark_as_completed"}),
        name="mark_as_completed",
    ),
    # get progress
    path(
        "<int:pk>/progress/",
        GetProgressAPIView.as_view(),
        name="get_progress",
    ),
]
