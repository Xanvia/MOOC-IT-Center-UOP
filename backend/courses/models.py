from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from userprofiles.models import Institution, Interest


class Course(models.Model):
    course_creator = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    specifications = models.TextField(blank=True, null=True)
    category = models.ForeignKey(Interest, on_delete=models.CASCADE)
    institution = models.ForeignKey(Institution, on_delete=models.CASCADE)
    outcomes = models.JSONField(default=list, blank=True, null=True)
    header_image = models.ImageField(upload_to="course_images/", blank=True, null=True)
    duration = models.CharField(max_length=255, blank=True, null=True)
    difficulty = models.CharField(max_length=255)
    status = models.CharField(max_length=255, default="unpublished")

    def get_progress(self, user):
        weeks = self.weeks.all()
        if not weeks:
            return 0
        total_progress = sum([week.get_progress(user) for week in weeks])
        return total_progress / len(weeks)


class Week(models.Model):
    name = models.CharField(max_length=255)
    course = models.ForeignKey(Course, related_name="weeks", on_delete=models.CASCADE)

    def get_progress(self, user):
        chapters = self.chapters.all()
        if not chapters:
            return 0
        total_progress = sum([chapter.get_progress(user) for chapter in chapters])
        return total_progress / len(chapters)

    def __str__(self):
        return self.name

    class Meta:
        unique_together = (
            "name",
            "course",
        )


class Chapter(models.Model):
    name = models.CharField(max_length=255)
    week = models.ForeignKey(Week, related_name="chapters", on_delete=models.CASCADE)

    def get_progress(self, user):
        components = self.components.all()
        if not components:
            return 0
        total_progress = sum([component.get_progress(user) for component in components])
        return total_progress / len(components)

    def __str__(self):
        return self.name


class Component(models.Model):
    COMPONENT_TYPES = (
        ("video", "Video"),
        ("note", "Note"),
        ("quiz", "Quiz"),
        ("coding_assignment", "CodingAssignment"),
    )
    name = models.CharField(max_length=255)
    chapter = models.ForeignKey(
        Chapter, related_name="components", on_delete=models.CASCADE
    )
    component_type = models.CharField(max_length=20, choices=COMPONENT_TYPES)

    class Meta:
        unique_together = ("name", "chapter", "component_type")


class Video(Component):
    video_link = models.URLField()
    duration = models.CharField(max_length=255, null=True, blank=True)


class Note(Component):
    content = models.TextField(blank=True, null=True)


class Quiz(Component):
    title = models.CharField(max_length=255)
    deadline = models.DateTimeField(default=timezone.now)
    full_grades = models.IntegerField(default=100)
    questions = models.JSONField()


class CodingAssignment(Component):
    question = models.TextField()
    test_cases = models.JSONField(default=list, blank=True, null=True)


class Image(models.Model):
    note = models.ForeignKey(Note, on_delete=models.CASCADE, related_name="images")
    image = models.ImageField(upload_to="note_images/")


class Enrollment(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    student = models.ForeignKey(User, on_delete=models.CASCADE)
    date_enrolled = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.student.username


class Progress(models.Model):
    enrollment = models.ForeignKey(Enrollment, on_delete=models.CASCADE)
    component = models.ForeignKey(Component, on_delete=models.CASCADE)
    completed = models.BooleanField(default=False)


class Question(models.Model):
    quiz = models.ForeignKey(
        Quiz, on_delete=models.CASCADE, related_name="quiz_questions"
    )
    text = models.TextField()


class Answer(models.Model):
    question = models.ForeignKey(
        Question, on_delete=models.CASCADE, related_name="answers"
    )
    text = models.TextField()
    is_correct = models.BooleanField(default=False)


class UserAnswer(models.Model):
    enrollement = models.ForeignKey(Enrollment, on_delete=models.CASCADE)
    answer = models.ForeignKey(Answer, on_delete=models.CASCADE)
    grade = models.DecimalField(max_digits=5, decimal_places=2)


class UserCodingAnswer(models.Model):
    enrollement = models.ForeignKey(Enrollment, on_delete=models.CASCADE)
    coding_assignment = models.ForeignKey(CodingAssignment, on_delete=models.CASCADE)
    code = models.TextField()
    result = models.TextField()
    grade = models.DecimalField(max_digits=5, decimal_places=2)
