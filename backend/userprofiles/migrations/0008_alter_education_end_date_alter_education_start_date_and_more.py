# Generated by Django 5.0.4 on 2024-05-26 15:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userprofiles', '0007_auto_20240524_0539'),
    ]

    operations = [
        migrations.AlterField(
            model_name='education',
            name='end_date',
            field=models.CharField(max_length=7),
        ),
        migrations.AlterField(
            model_name='education',
            name='start_date',
            field=models.CharField(max_length=7),
        ),
        migrations.AlterField(
            model_name='workexperience',
            name='end_date',
            field=models.CharField(max_length=7),
        ),
        migrations.AlterField(
            model_name='workexperience',
            name='start_date',
            field=models.CharField(max_length=7),
        ),
    ]
