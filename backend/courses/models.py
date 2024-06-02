from django.db import models
from django.contrib.auth.models import User


class Course(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()

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


class Image(models.Model):
    image = models.ImageField(upload_to="note_images/")
    alt_text = models.CharField(max_length=255)


class Video(Component):
    url = models.URLField()


class Quiz(Component):
    pass


class Progress(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    component = models.ForeignKey(Component, on_delete=models.CASCADE)
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
