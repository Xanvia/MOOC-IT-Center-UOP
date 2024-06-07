from django.contrib import admin
from .models import (
    Course, CourseStats, Week, Chapter , Note, Video, Quiz, 
    CodingAssignment, Image, Enrollment, Progress, Question, Answer, 
    UserAnswer, UserCodingAnswer
)

@admin.register(Chapter)
class ChapterAdmin(admin.ModelAdmin):
    list_display = ['name', 'week']


@admin.register(Week)
class WeekAdmin(admin.ModelAdmin):
    list_display = ['name', 'course']

@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ['name', 'course_creator']


@admin.register(Note)
class NoteAdmin(admin.ModelAdmin):
    list_display = ['chapter', 'text']

