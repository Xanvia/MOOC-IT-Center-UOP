from django.db import models
from courses.models import Course, Enrollment
from django.contrib.auth.models import User
from datetime import datetime


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
    order_id = models.CharField(max_length=100, blank=True, null=True)
    payment_id = models.CharField(max_length=100, blank=True, null=True)

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
    messages = models.JSONField(default=dict, blank=True, null=True)

    class Meta:
        unique_together = ("course", "teacher")

    def add_message(self, sender, message, status="unread"):
        """
        Adds a new message to the messages field.
        """
        # Ensure 'messages' is a list, not a dictionary
        if isinstance(self.messages, dict):
            self.messages = []

        # Append the new message to the list of messages
        self.messages.append({"sender": sender, "message": message, "status": status, "date": str(datetime.now())})
        
        # Save the updated instance
        self.save()

    def update_message_status(self, sender, status="read"):
        """
        Updates the read status of a message for a specific sender.
        """
        for msg in self.messages:
            if msg["sender"] == sender:
                msg["status"] = status
        self.save()

    def __str__(self):
        return self.teacher.username


class AdminMessages(models.Model):
    sender_choice = [
        ("teacher", "Teacher"),
        ("admin", "Admin"),
    ]
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    sender = models.CharField(max_length=10, choices=sender_choice,default="admin")
    message = models.TextField()
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.course.title
