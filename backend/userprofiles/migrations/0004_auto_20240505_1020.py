# Generated by Django 4.2.10 on 2024-05-05 10:20

from django.db import migrations
from django.core.management import call_command


def load_initial_data(apps, schema_editor):
    call_command(
        "loaddata",
        "institution.json",
        app_label="userprofiles",
    )


def unload_initial_data(apps, schema_editor):
    InsitutionModel = apps.get_model("userprofiles", "Insitution")
    InsitutionModel.objects.all().delete()


class Migration(migrations.Migration):

    dependencies = [
        ("userprofiles", "0003_auto_20240505_1020"),
    ]

    operations = [
        migrations.RunPython(load_initial_data, unload_initial_data),
    ]
