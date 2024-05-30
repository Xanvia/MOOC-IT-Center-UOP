from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Country(models.Model):
    label = models.CharField(max_length=100, unique=True)
    country_code = models.CharField(max_length=5)

    class Meta:
        verbose_name_plural = "Countries"

    def __str__(self):
        return self.label


class Interest(models.Model):
    label = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.label


class UserType(models.Model):
    label = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.label


class AuthenticationType(models.Model):
    label = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.label


class UserProfile(models.Model):
    GENDER_CHOICES = [
        ("M", "Male"),
        ("F", "Female"),
        ("O", "Other"),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_picture = models.URLField(max_length=1000, blank=True, null=True)
    profile_image = models.ImageField(
        upload_to="profile_images/", blank=True, null=True
    )
    country = models.ForeignKey(
        Country, on_delete=models.PROTECT, blank=True, null=True
    )
    description = models.TextField(max_length=2000, blank=True, null=True)
    birth_date = models.DateField(blank=True, null=True)
    interests = models.ManyToManyField(Interest)
    mobile_number = models.CharField(max_length=15, blank=True, null=True)
    gender = models.CharField(
        max_length=1, choices=GENDER_CHOICES, default="O", blank=True, null=True
    )

    def __str__(self):
        return f"{self.user.username}'s Profile"

    def user_type(self):
        return self.user.groups.first().name if self.user.groups.exists() else None


class Degree(models.Model):
    label = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.label


class Institution(models.Model):
    label = models.CharField(max_length=100, unique=True)
    profile_picture = models.CharField(max_length=100, blank=True, null=True)
    country = models.ForeignKey(
        Country, on_delete=models.PROTECT, blank=True, null=True
    )

    def __str__(self):
        return self.label


class Education(models.Model):
    user_profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    institution = models.CharField(max_length=100)
    degree = models.CharField(max_length=500)
    start_date = models.CharField(max_length=7)
    end_date = models.CharField(max_length=7,blank=True, null=True)

    def __str__(self):
        return f"{self.user_profile.user.username}'s Education"


class WorkExperience(models.Model):
    user_profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    company = models.CharField(max_length=100)
    position = models.CharField(max_length=100)
    start_date = models.CharField(max_length=7)
    end_date = models.CharField(max_length=7, null=True, blank=True)

    def __str__(self):
        return f"{self.user_profile.user.username}'s Work Experience"
