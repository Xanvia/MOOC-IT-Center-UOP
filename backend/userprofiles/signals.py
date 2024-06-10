from django.apps import apps
from django.contrib.auth.models import Group, Permission
from django.contrib.contenttypes.models import ContentType
from django.db.models.signals import post_migrate
from django.dispatch import receiver
from userprofiles.models import (
    UserProfile,
    Degree,
    Education,
    WorkExperience,
    Country,
    UserType,
    Interest,
)

@receiver(post_migrate)
def assign_permissions(sender, **kwargs):
    # Define the models for which you want to assign permissions
    models = [UserProfile, Degree, Education, WorkExperience]
    admin_only_models = [Country, UserType, Interest]

    # Get all groups
    groups = Group.objects.all()
    admin = Group.objects.get(name="admin")

    for model in models:
        # Get the permissions for the model
        content_type = ContentType.objects.get_for_model(model)
        permissions = Permission.objects.filter(content_type=content_type)

        # Assign the permissions to all groups
        for group in groups:
            for permission in permissions:
                group.permissions.add(permission)

    for model in admin_only_models:
        # Get the permissions for the model
        content_type = ContentType.objects.get_for_model(model)
        permissions = Permission.objects.filter(content_type=content_type)

        # Assign the permissions to the admin group
        for permission in permissions:
            admin.permissions.add(permission)



     
