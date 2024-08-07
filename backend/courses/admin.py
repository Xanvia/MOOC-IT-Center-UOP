from django.contrib import admin
from .models import (
    Course,
    Week,
    Chapter,
    Note,
    Video,
    Quiz,
    CodingAssignment,
    Image,
    Enrollment,
    Progress,
    Question,
    Answer,
    VideoFile,
)


@admin.register(Chapter)
class ChapterAdmin(admin.ModelAdmin):
    list_display = ["id", "name", "week"]


@admin.register(Week)
class WeekAdmin(admin.ModelAdmin):
    list_display = ["id", "name", "course"]


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ["id", "name", "course_creator"]


@admin.register(Note)
class NoteAdmin(admin.ModelAdmin):
    list_display = ["id", "content"]


@admin.register(Video)
class VideoAdmin(admin.ModelAdmin):
    list_display = ["id", "name", "video_link"]


@admin.register(VideoFile)
class VideoFileAdmin(admin.ModelAdmin):
    list_display = ["id"]


@admin.register(Enrollment)
class EnrollmentAdmin(admin.ModelAdmin):
    list_display = ["id", "course", "student"]


@admin.register(Quiz)
class QuizAdmin(admin.ModelAdmin):
    list_display = ["id", "name"]


@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ["id", "text"]


@admin.register(Answer)
class Answerdmin(admin.ModelAdmin):
    list_display = ["id", "text", "is_correct"]

@admin.register(Progress)
class ProgressAdmin(admin.ModelAdmin):
    list_display = ["id","enrollment", "completed"]