# Generated by Django 5.0.4 on 2024-06-04 14:56

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0003_auto_20240603_1101'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='course',
            name='stats',
        ),
        migrations.CreateModel(
            name='CourseStats',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('duration', models.CharField(max_length=255)),
                ('difficulty', models.CharField(max_length=255)),
                ('students', models.IntegerField(default=0)),
                ('rating', models.DecimalField(decimal_places=2, default=0, max_digits=5)),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='courses.course')),
            ],
        ),
    ]
