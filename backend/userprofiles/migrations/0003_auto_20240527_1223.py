# Generated by Django 5.0.4 on 2024-05-27 12:23


from django.db import migrations
from django.core.management import call_command


def load_initial_data(apps, schema_editor):
    call_command(
        "loaddata",
        "institution.json",
        app_label="userprofiles",
    )


def unload_initial_data(apps, schema_editor):
    InsitutionModel = apps.get_model("userprofiles", "Institution")
    InsitutionModel.objects.all().delete()


class Migration(migrations.Migration):

    dependencies = [
        ("userprofiles", "0002_auto_20240505_1018"),
    ]

    operations = [
        migrations.RunPython(load_initial_data, unload_initial_data),
    ]