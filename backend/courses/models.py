from django.db import models

# Create your models here.
class Title(models.Model):
    label = models.CharField(max_length=100)
    description = models.CharField(max_length=300)

    def __str__(self):
        return self.label


class OfferedBy(models.Model):
    label = models.CharField(max_length=150)
    institution = models.CharField(max_length=100)
    
    def __str__(self):
        return self.label
    

class CourseCreator(models.Model):
    label = models.CharField(max_length=100)

    def __str__(self):
        return self.label
    

class Duration(models.Model):
    label = models.CharField(max_length=100)
    start_date = models.CharField(max_length=7)
    end_date = models.CharField(max_length=7,blank=True, null=True)

    def __str__(self):
        return self.label

