from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType


class Course(models.Model):
    course_creator = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    description = models.TextField()
    stats = models.JSONField(default=dict, blank=True, null=True)
    outcomes = models.JSONField(default=list, blank=True, null=True)

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


class Chapter(models.Model):
    name = models.CharField(max_length=255)
    week = models.ForeignKey(Week, related_name="chapters", on_delete=models.CASCADE)

    def get_progress(self, user):
        components = self.components.all()
        if not components:
            return 0
        total_progress = sum([component.get_progress(user) for component in components])
        return total_progress / len(components)


class Component(models.Model):
    name = models.CharField(max_length=255)
    chapter = models.ForeignKey(
        Chapter, related_name="components", on_delete=models.CASCADE
    )

    class Meta:
        abstract = True

    def get_progress(self, user):
        progress = self.progress_set.filter(user=user).first()
        return progress.percentage if progress else 0


class Note(Component):
    text = models.TextField()
    images = models.ManyToManyField("Image")
    chapter = models.ForeignKey(
        Chapter, related_name="notes", on_delete=models.CASCADE
    )

class Video(Component):
    url = models.URLField()
    duration = models.CharField(max_length=255)
    chapter = models.ForeignKey(
        Chapter, related_name="videos", on_delete=models.CASCADE
    )

class Quiz(Component):
    title = models.CharField(max_length=255)
    deadline = models.DateTimeField(default=timezone.now)
    full_grades = models.IntegerField(default=100)
    chapter = models.ForeignKey(
        Chapter, related_name="quizzes", on_delete=models.CASCADE
    )

class CodingAssignment(Component):
    question = models.TextField()
    test_cases = models.JSONField(default=list)
    chapter = models.ForeignKey(
        Chapter, related_name="coding_assignments", on_delete=models.CASCADE
    )

class Image(models.Model):
    image = models.ImageField(upload_to="note_images/")
    alt_text = models.CharField(max_length=255)

class Progress(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    component = GenericForeignKey('content_type', 'object_id')
    percentage = models.DecimalField(max_digits=5, decimal_places=2, default=0)

class Question(models.Model):
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name="questions")
    text = models.TextField()


class Answer(models.Model):
    question = models.ForeignKey(
        Question, on_delete=models.CASCADE, related_name="answers"
    )
    text = models.TextField()
    is_correct = models.BooleanField(default=False)


class UserAnswer(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    answer = models.ForeignKey(Answer, on_delete=models.CASCADE)
    grade = models.DecimalField(max_digits=5, decimal_places=2)


class UserCodingAnswer(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    coding_assignment = models.ForeignKey(CodingAssignment, on_delete=models.CASCADE)
    code = models.TextField()
    result = models.TextField()
    grade = models.DecimalField(max_digits=5, decimal_places=2)