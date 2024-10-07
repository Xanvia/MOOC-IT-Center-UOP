# Generated by Django 5.0.4 on 2024-10-07 06:03

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0017_remove_studentcodinganswer_result'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='message',
            name='discussion',
        ),
        migrations.AddField(
            model_name='message',
            name='course',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='courses.course'),
        ),
        migrations.DeleteModel(
            name='Discussion',
        ),
    ]
