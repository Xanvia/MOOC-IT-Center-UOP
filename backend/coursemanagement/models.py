from django.db import models
from courses.models import Course
from django.contrib.auth.models import User

class Permission(models.Model):
    label = models.CharField(max_length=100)

class CourseTeachers(models.Model):
    ROLES = [
        ('course_creator', 'Course Creator'),
        ('editing_teacher', 'Editing Teacher'),
        ('non-editing_teacher', 'Non-Editing Teacher'),
    ]

    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    teacher = models.ForeignKey(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=20, choices=ROLES, default='non-editing_teacher')
    permissions = models.ManyToManyField(Permission, blank=True)

    class Meta:
        unique_together = ('course', 'teacher')

    def __str__(self):
        return self.teacher.username

