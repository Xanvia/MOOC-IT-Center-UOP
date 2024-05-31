from django.db import models

# Create your models here.
class Title(models.Model):
    label = models.CharField(max_length=100)
    description = models.CharField(max_length=300)
