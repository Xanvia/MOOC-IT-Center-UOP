from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Course,Week,Chapter, Component,Note,Image,Video
from userprofiles.models import Institution
from userprofiles.serializers import InterestSerializer


class CourseTeacherSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ["email", "first_name", "last_name"]

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation["full_name"] = f"{instance.first_name} {instance.last_name}"
        representation["headline"] = instance.userprofile.headline
        representation.pop("first_name")
        representation.pop("last_name")
        return representation


class CourseSerializer(serializers.ModelSerializer):
    institution = serializers.CharField()

    class Meta:
        model = Course
        fields = "__all__"

    def validate(self, data):
        request = self.context.get("request")

        if request and request.method == "POST" or request.method == "PUT":
            institution_name = data.pop("institution")
            institution, _ = Institution.objects.get_or_create(label=institution_name)
            data["institution"] = institution

        if request and request.method == "PATCH":
            allowed_fields = {"outcomes", "specifications","description"}
            # Filter the data to only include allowed fields
            data = {key: value for key, value in data.items() if key in allowed_fields}
        return data

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation["course_creator"] = CourseTeacherSerializer(
            instance.course_creator
        ).data
        representation["category"] = InterestSerializer(instance.category).data
        representation["institution"] = instance.institution.label
        return representation
    

class WeekSerializer(serializers.ModelSerializer):

    class Meta:
        model = Week
        fields = "__all__"

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation["topics"] = ChapterSerializer(instance.topics, many=True).data
        return representation
    

class ChapterSerializer(serializers.ModelSerializer):

    class Meta:
        model = Chapter
        fields = "__all__"

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation["items"] = ItemSerializer(instance.items, many=True).data
        return representation    


class ItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = Component
        fields = "__all__"

    def to_representation(self, instance):
        if instance.component_type == "note":
            return NoteSerializer(instance.note).data
        elif instance.component_type == "image":
            return ImageSerializer(instance.image).data
        elif instance.component_type == "video":
            return VideoSerializer(instance.video).data
        return super().to_representation(instance)
        

class NoteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Note
        fields = "__all__"

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation["type"] = "note"
        representation["content"] =  instance.content

class ImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = Image
        fields = "__all__"

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation["type"] = "image"
        representation["content"] = {
            "note":NoteSerializer(instance.note),
            "image": instance.image
        }


class VideoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Video
        fields = "__all__"  

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation["type"] = "video"
        representation["content"] =  {
            "url":instance.url,
            "duration":instance.duration  
        }         