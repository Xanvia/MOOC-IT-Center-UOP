from django.db import models
from courses.models import Course, Enrollment
from django.contrib.auth.models import User


class CoursePermissions(models.Model):
    label = models.CharField(max_length=100)


class Payments(models.Model):
    STATUS = [
        ("PENDING", "Pending"),
        ("SUCCESS", "Success"),
        ("FAILED", "Failed"),
    ]

    student = models.ForeignKey(User, on_delete=models.CASCADE)
    enrollement = models.ForeignKey(Enrollment, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=10, choices=STATUS, default="PENDING")

    def __str__(self):
        return self.student.username


class CourseTeachers(models.Model):
    ROLES = [
        ("editing_teacher", "Editing Teacher"),
        ("non-editing_teacher", "Non-Editing Teacher"),
    ]

    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    teacher = models.ForeignKey(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=20, choices=ROLES, default="non-editing_teacher")
    permissions = models.ManyToManyField(CoursePermissions, blank=True)

    class Meta:
        unique_together = ("course", "teacher")

    def __str__(self):
        return self.teacher.username


class AdminMessages(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    message = models.TextField()
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.course.title
