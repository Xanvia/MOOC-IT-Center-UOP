# Generated by Django 5.0.4 on 2024-10-05 05:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0012_codingassignment_starter_code'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='codingassignment',
            name='deadline',
        ),
    ]
