# Generated by Django 5.0.4 on 2024-06-05 10:26

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0003_auto_20240603_1101'),
        ('userprofiles', '0005_auto_20240527_1224'),
    ]

    operations = [
        migrations.AddField(
            model_name='course',
            name='category',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='userprofiles.interest'),
        ),
    ]
