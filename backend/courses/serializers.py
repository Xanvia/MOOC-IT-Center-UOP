from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Course
from userprofiles.models import Institution

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

        if request and request.method == "PATCH":
            allowed_fields = {"outcomes", "specifications"}
            # Filter the data to only include allowed fields
            data = {key: value for key, value in data.items() if key in allowed_fields}
        return data
    

    def create(self, validated_data):
        institution_name = validated_data.pop("institution")
        institution, _ = Institution.objects.get_or_create(label=institution_name)
        validated_data["institution"] = institution
        return super().create(validated_data)

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation["course_creator"] = CourseTeacherSerializer(
            instance.course_creator
        ).data
        representation["category"] = instance.category.label
        representation["institution"] = instance.institution.label
        return representation
