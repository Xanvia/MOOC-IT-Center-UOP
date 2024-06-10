from django.apps import apps
from django.contrib.auth.models import Group, Permission
from django.contrib.contenttypes.models import ContentType
from django.db.models.signals import post_migrate
from django.dispatch import receiver
from coursemanagement.models import CourseTeachers, CoursePermissions, Payments

@receiver(post_migrate)
def assign_permissions(sender, **kwargs):
    admin_teacher_models = [CourseTeachers, CoursePermissions]
    student_models = [Payments]

    # Get the groups
    admin = Group.objects.get(name="admin")
    teacher = Group.objects.get(name="teacher")
    student = Group.objects.get(name="student")

    for model in admin_teacher_models:
        # Get the permissions for the model
        content_type = ContentType.objects.get_for_model(model)
        permissions = Permission.objects.filter(content_type=content_type)

        # Assign the permissions to the admin and teacher groups
        for permission in permissions:
            admin.permissions.add(permission)
            teacher.permissions.add(permission)

    for model in student_models:
        # Get the permissions for the model
        content_type = ContentType.objects.get_for_model(model)
        permissions = Permission.objects.filter(content_type=content_type)

        # Assign the permissions to the student group
        for permission in permissions:
            student.permissions.add(permission)

