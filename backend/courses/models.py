from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from userprofiles.models import Institution, Interest


class Course(models.Model):
    PAYMENT_TYPE_CHOICES = [
        ("free", "Free"),
        ("paid", "Completely Paid"),
        ("trial", "1 Week Free Trial and Paid"),
    ]

    course_creator = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    specifications = models.TextField(blank=True, null=True)
    category = models.ForeignKey(Interest, on_delete=models.CASCADE)
    institution = models.ForeignKey(Institution, on_delete=models.CASCADE)
    faculty = models.CharField(max_length=255, blank=True, null=True)
    department = models.CharField(max_length=255, blank=True, null=True)
    outcomes = models.JSONField(default=list, blank=True, null=True)
    header_image = models.ImageField(upload_to="course_images/", blank=True, null=True)
    duration = models.CharField(max_length=255, blank=True, null=True)
    difficulty = models.CharField(max_length=255)
    status = models.CharField(max_length=255, default="unpublished")
    payment_type = models.CharField(
        max_length=50, choices=PAYMENT_TYPE_CHOICES, default="trial"
    )


class Week(models.Model):
    name = models.CharField(max_length=255)
    course = models.ForeignKey(Course, related_name="weeks", on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    class Meta:
        unique_together = (
            "name",
            "course",
        )


class Chapter(models.Model):
    name = models.CharField(max_length=255)
    week = models.ForeignKey(Week, related_name="chapters", on_delete=models.PROTECT)

    def get_progress(self, user):
        components = self.components.all()
        if not components:
            return 0
        total_progress = sum([component.get_progress(user) for component in components])
        return total_progress / len(components)

    def __str__(self):
        return self.name


class Component(models.Model):
    name = models.CharField(max_length=255)
    type = models.CharField(max_length=255, blank=True, null=True)
    chapter = models.ForeignKey(
        Chapter, related_name="components", on_delete=models.PROTECT
    )


class VideoQuiz(models.Model):
    question = models.TextField()
    options = models.JSONField(default=list)
    correct_option = models.IntegerField()
    time_stamp = models.CharField(max_length=255, blank=True, null=True)


class ItemChat(models.Model):
    VISIBILITY_CHOICES = [
        ("all", "All"),
        ("teachers", "Teachers"),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    visibility = models.CharField(
        max_length=10, choices=VISIBILITY_CHOICES, default="all"
    )

    def __str__(self):
        return self.message


class Video(Component):
    video_id = models.CharField(max_length=255, blank=True, null=True)
    video_link = models.CharField(max_length=1000, blank=True, null=True)
    duration = models.CharField(max_length=255, null=True, blank=True)
    quizzes = models.JSONField(default=list, blank=True, null=True)
    chat = models.ForeignKey(
        ItemChat, on_delete=models.CASCADE, related_name="videos", blank=True, null=True
    )


class Note(Component):
    content = models.TextField(blank=True, null=True)
    chat = models.ForeignKey(
        ItemChat, on_delete=models.CASCADE, related_name="notes", blank=True, null=True
    )


class Quiz(Component):
    deadline = models.DateTimeField(default=timezone.now, blank=True, null=True)
    duration = models.DurationField(blank=True, null=True)


class CodingAssignment(Component):
    question = models.TextField(blank=True, null=True)
    explanation = models.TextField(blank=True, null=True)
    grading_type = models.CharField(max_length=255, blank=True, null=True)
    # deadline = models.DateTimeField(default=timezone.now, blank=True, null=True)
    duration = models.IntegerField(blank=True, null=True)
    test_cases = models.JSONField(default=list, blank=True, null=True)
    language = models.CharField(max_length=255, blank=True, null=True)
    starter_code = models.TextField(blank=True, null=True)


class Image(models.Model):
    note = models.ForeignKey(Note, on_delete=models.CASCADE, related_name="images")
    image = models.ImageField(upload_to="note_images/")


class Enrollment(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    student = models.ForeignKey(User, on_delete=models.CASCADE)
    date_enrolled = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.student.username

    class Meta:
        unique_together = (
            "course",
            "student",
        )


class Progress(models.Model):
    enrollment = models.ForeignKey(Enrollment, on_delete=models.CASCADE)
    component = models.ForeignKey(Component, on_delete=models.CASCADE)
    completed = models.BooleanField(default=False)

    class Meta:
        unique_together = (
            "enrollment",
            "component",
        )


class Question(models.Model):
    SINGLE_CORRECT = "SC"
    MULTIPLE_CORRECT = "MC"
    OPENN_ENDED = "OE"

    QUESTION_TYPES = [
        (SINGLE_CORRECT, "Single Correct"),
        (MULTIPLE_CORRECT, "Multiple Correct"),
        (OPENN_ENDED, "Open Ended"),
    ]

    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name="questions")
    score = models.IntegerField(default=1)
    text = models.TextField()
    question_type = models.CharField(max_length=2, choices=QUESTION_TYPES)

    def __str__(self):
        return self.text


class Answer(models.Model):
    question = models.ForeignKey(
        Question, on_delete=models.CASCADE, related_name="answers"
    )
    text = models.CharField(max_length=255)
    is_correct = models.BooleanField(default=False)

    def __str__(self):
        return self.text


class StudentQuiz(models.Model):
    enrollement = models.ForeignKey(Enrollment, on_delete=models.CASCADE)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    score = models.IntegerField(default=0)
    graded = models.BooleanField(default=False)
    completed_at = models.DateTimeField(auto_now_add=True)
    student_answers = models.JSONField(default=list)

    def __str__(self):
        return f"{self.quiz.name}"


class StudentCodingAnswer(models.Model):
    enrollement = models.ForeignKey(Enrollment, on_delete=models.CASCADE)
    coding_assignment = models.ForeignKey(CodingAssignment, on_delete=models.CASCADE)
    code = models.TextField()
    grade = models.DecimalField(max_digits=5, decimal_places=2)


class VideoFile(models.Model):
    file = models.FileField(upload_to="videos/")
    created_at = models.DateTimeField(auto_now_add=True)


class Announcement(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Announcement for {self.course.name} by {self.user.username}"


class Discussion(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='discussions')

class Message(models.Model):
    discussion = models.ForeignKey(Discussion, on_delete=models.CASCADE, related_name='messages')
    visibility = models.BooleanField(default=True)
    time = models.DateTimeField(default=timezone.now)
    content = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)

class Thread(models.Model):
    message = models.ForeignKey(Message, on_delete=models.CASCADE, related_name='threads')
    visibility = models.BooleanField(default=True)
    time = models.DateTimeField(default=timezone.now)
    content = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)