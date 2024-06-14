from rest_framework import serializers
from django.contrib.auth.models import User, Group
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import AccessToken
from .models import Course
from userprofiles.models import Interest

class CourseSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Course
        fields = "__all__"

    def validate(self, data):
        request = self.context.get("request")
        if request and request.method == "PATCH":
            allowed_fields = {"outcomes", "specifications"}
            # Filter the data to only include allowed fields
            data = {key: value for key, value in data.items() if key in allowed_fields}

        
        return data
