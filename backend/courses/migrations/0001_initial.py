# Generated by Django 5.0.4 on 2024-07-11 14:37

import django.db.models.deletion
import django.utils.timezone
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('userprofiles', '0006_userprofile_headline'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Chapter',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Component',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('chapter', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='components', to='courses.chapter')),
            ],
        ),
        migrations.CreateModel(
            name='Question',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='CodingAssignment',
            fields=[
                ('component_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='courses.component')),
                ('question', models.TextField()),
                ('test_cases', models.JSONField(blank=True, default=list, null=True)),
            ],
            bases=('courses.component',),
        ),
        migrations.CreateModel(
            name='Note',
            fields=[
                ('component_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='courses.component')),
                ('content', models.TextField(blank=True, null=True)),
            ],
            bases=('courses.component',),
        ),
        migrations.CreateModel(
            name='Quiz',
            fields=[
                ('component_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='courses.component')),
                ('deadline', models.DateTimeField(default=django.utils.timezone.now)),
                ('full_grades', models.IntegerField(default=100)),
                ('questions', models.JSONField()),
            ],
            bases=('courses.component',),
        ),
        migrations.CreateModel(
            name='Video',
            fields=[
                ('component_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='courses.component')),
                ('video_link', models.URLField()),
                ('duration', models.CharField(blank=True, max_length=255, null=True)),
            ],
            bases=('courses.component',),
        ),
        migrations.CreateModel(
            name='Course',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('description', models.TextField(blank=True, null=True)),
                ('specifications', models.TextField(blank=True, null=True)),
                ('outcomes', models.JSONField(blank=True, default=list, null=True)),
                ('header_image', models.ImageField(blank=True, null=True, upload_to='course_images/')),
                ('duration', models.CharField(blank=True, max_length=255, null=True)),
                ('difficulty', models.CharField(max_length=255)),
                ('status', models.CharField(default='unpublished', max_length=255)),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='userprofiles.interest')),
                ('course_creator', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('institution', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='userprofiles.institution')),
            ],
        ),
        migrations.CreateModel(
            name='Enrollment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_enrolled', models.DateTimeField(auto_now_add=True)),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='courses.course')),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Progress',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('completed', models.BooleanField(default=False)),
                ('component', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='courses.component')),
                ('enrollment', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='courses.enrollment')),
            ],
        ),
        migrations.CreateModel(
            name='Answer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.TextField()),
                ('is_correct', models.BooleanField(default=False)),
                ('question', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='answers', to='courses.question')),
            ],
        ),
        migrations.CreateModel(
            name='UserAnswer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('grade', models.DecimalField(decimal_places=2, max_digits=5)),
                ('answer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='courses.answer')),
                ('enrollement', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='courses.enrollment')),
            ],
        ),
        migrations.CreateModel(
            name='Week',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='weeks', to='courses.course')),
            ],
            options={
                'unique_together': {('name', 'course')},
            },
        ),
        migrations.AddField(
            model_name='chapter',
            name='week',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='chapters', to='courses.week'),
        ),
        migrations.CreateModel(
            name='UserCodingAnswer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.TextField()),
                ('result', models.TextField()),
                ('grade', models.DecimalField(decimal_places=2, max_digits=5)),
                ('enrollement', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='courses.enrollment')),
                ('coding_assignment', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='courses.codingassignment')),
            ],
        ),
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='note_images/')),
                ('note', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='images', to='courses.note')),
            ],
        ),
        migrations.AddField(
            model_name='question',
            name='quiz',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='quiz_questions', to='courses.quiz'),
        ),
    ]
