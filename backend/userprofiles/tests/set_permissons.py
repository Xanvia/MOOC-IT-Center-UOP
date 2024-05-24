# utils.py
from django.contrib.auth.models import Permission
from django.contrib.contenttypes.models import ContentType


def assign_permission_to_group(group, model, permission_codename):
    # Get the content type for the given model
    content_type = ContentType.objects.get_for_model(model)

    # Get the permission
    permission = Permission.objects.get(
        codename=permission_codename,
        content_type=content_type,
    )

    # Add the permission to the group
    group.permissions.add(permission)
    group.save()
