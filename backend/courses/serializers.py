from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Course,Week,Chapter, Component,Note
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

class ChapterSerializer(serializers.ModelSerializer):

    class Meta:
        model = Chapter
        fields = "__all__"

class NoteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Note
        fields = "__all__"

