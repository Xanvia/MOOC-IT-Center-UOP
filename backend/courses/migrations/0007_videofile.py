# Generated by Django 5.0.4 on 2024-07-12 15:29

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0006_delete_videofile'),
    ]

    operations = [
        migrations.CreateModel(
            name='VideoFile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file', models.FileField(upload_to='videos/')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('video', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='courses.video')),
            ],
        ),
    ]
