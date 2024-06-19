from rest_framework import serializers
from django.contrib.auth.models import User, Group
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import AccessToken
from .models import Course
from userprofiles.models import Interest
from userprofiles.serializers import WorkExperienceSerializer


# class CourseTeacherSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = User
#         fields = ["email", "first_name", "last_name"]

    # def to_representation(self, instance):
    #     representation = super().to_representation(instance)
    #     representation["full_name"] = f"{instance.first_name} {instance.last_name}"
    #     representation.pop("first_name")
    #     work = self.get_current_work(instance)
    #     representation["work"] = work
    #     return representation

    # def get_current_work(self, instance):
    #     # Filter the WorkExperience objects related to the user profile to find the current work experience
    #     current_work = instance.userprofile.workexperience_set.filter(is_current=True).first()
        
    #     # Serialize the current work experience if it exists
    #     if current_work:
    #         current_work = WorkExperienceSerializer(current_work).data
        
    #     return current_work
    
# class CourseCategorySerializer(serializers.ModelSerializer):

#     class Meta:
#         model = User
#         fields = "__all__"

#     def to_representation(self, instance):
#         representation = super().to_representation(instance)
#         return representation

class CourseTeacherSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ["email", "first_name", "last_name"]

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation["full_name"] = f"{instance.first_name} {instance.last_name}"
        representation.pop("first_name")
        representation.pop("last_name")
        work = self.get_current_work(instance)
        representation["work"] = work
        return representation

    def get_current_work(self,instance):
        work = instance.userprofile.workexperience_set.last()
        if work:
            return work.company
        return work

    # def to_representation(self, instance):
    #     representation =  super().to_representation(instance)
    #     return representation
        
class CourseCategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = "__all__"

    


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
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation["course_creator"] = CourseTeacherSerializer(instance.course_creator).data 
#        representation["course_category"] = CourseCategorySerializer(instance.course_category).data 
        return representation




