# Generated by Django 5.0.4 on 2024-05-29 08:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userprofiles', '0006_auto_20240527_1225'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='profile_picture',
            field=models.ImageField(blank=True, null=True, upload_to='profile_images/'),
        ),
    ]
