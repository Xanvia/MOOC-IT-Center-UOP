from rest_framework import serializers
from django.contrib.auth.models import User, Group
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import AccessToken
from .models import Course
from userprofiles.models import Interest

class CourseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Course
        fields = '__all__' 

 
    

