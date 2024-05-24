from django.db import migrations
from django.contrib.auth.models import Group, Permission
from django.contrib.contenttypes.models import ContentType
from userprofiles.models import (
    UserProfile,
    Degree,
    Institution,
    Education,
    WorkExperience,
    Country,
    UserType,
    Interest
)


def assign_permissions(apps, schema_editor):
    # Define the models for which you want to assign permissions
    models = [UserProfile, Degree, Institution, Education, WorkExperience]
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


def remove_permissions(apps, schema_editor):
    # Define the models for which you want to remove permissions
    models = [
        UserProfile,
        Degree,
        Institution,
        Education,
        WorkExperience,
    ]
    admin_only_models = [Country, UserType, Interest]

    # Get all groups
    groups = Group.objects.all()
    admin = Group.objects.get(name="admin")

    for model in models:
        # Get the permissions for the model
        content_type = ContentType.objects.get_for_model(model)
        permissions = Permission.objects.filter(content_type=content_type)

        # Remove the permissions from all groups
        for group in groups:
            for permission in permissions:
                group.permissions.remove(permission)
    
    for model in admin_only_models:
        # Get the permissions for the model
        content_type = ContentType.objects.get_for_model(model)
        permissions = Permission.objects.filter(content_type=content_type)

        # Remove the permissions from the admin group
        for permission in permissions:
            admin.permissions.remove(permission)


class Migration(migrations.Migration):

    dependencies = [
        ('userprofiles', '0006_auto_20240508_1448'),
    ]

    operations = [
        migrations.RunPython(assign_permissions, remove_permissions),
    ]
