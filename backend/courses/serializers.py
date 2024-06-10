from rest_framework import serializers
from django.contrib.auth.models import User, Group
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import AccessToken
from .models import Course
from userprofiles.models import Interest

class CourseSerializer(serializers.ModelSerializer):
    category_id = serializers.PrimaryKeyRelatedField(queryset=Interest.objects.all(), source='category')

    class Meta:
        model = Course
        fields = '__all__' 

    def create(self, validated_data):
        # Assuming `course_creator` will be added later or managed in the view
        return Course.objects.create(**validated_data)

    

