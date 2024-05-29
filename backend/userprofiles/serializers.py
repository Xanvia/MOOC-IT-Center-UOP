from rest_framework import serializers
from django.contrib.auth.models import User, Group
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import AccessToken
from .models import UserProfile, Interest, Country, WorkExperience, Education
from random import choice


class UserSerializer(serializers.ModelSerializer):
    firstname = serializers.CharField(source="first_name", required=True)
    lastname = serializers.CharField(source="last_name", required=True)
    user_type = serializers.CharField(required=True)
    password = serializers.CharField(required=False)
    profile_picture = serializers.URLField(required=False)

    class Meta:
        model = User
        fields = [
            "firstname",
            "lastname",
            "email",
            "password",
            "username",
            "user_type",
            "profile_picture",
        ]

    def validate(self, attrs):
        request = self.context.get("request")
        auth_mode = request.data.get("auth_mode", None)
        if auth_mode == "password":
            if attrs.get("password", None) is None:
                raise serializers.ValidationError({"password": "Password is required"})

        email = attrs.get("email", None)
        if email is None:
            raise serializers.ValidationError({"email": "Email is required"})
        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError({"email": "Email already exists"})

        usertype = attrs.get("user_type", "")
        if usertype not in ["student", "teacher"]:
            raise serializers.ValidationError(
                {"user_type": "User type must be student or teacher"}
            )
        return attrs

    def create(self, validated_data):
        user_type = validated_data.pop("user_type")
        password = validated_data.pop("password", None)
        profile_picture = validated_data.pop("profile_picture", None)
        self.fields.pop("user_type")

        # create user
        user = super().create(validated_data)
        if password:  # Set the password, if provided
            user.set_password(password)
        user.save()

        # add user to group
        group = Group.objects.get(name=user_type)
        group.user_set.add(user)

        if profile_picture is not None:
            profile_picture = profile_picture.split("=")[0]
        else:
            colors = ["008080", "20B2AA", "072dd0", "45a158", "fca158"]
            random_color = choice(colors)
            name = f"{user.first_name} {user.last_name}"
            profile_picture = f"https://ui-avatars.com/api/?name={name}&color=ffffff&background={random_color}"

        UserProfile.objects.create(user=user, profile_picture=profile_picture)

        return user

    def to_representation(self, instance):
        user_profile = instance.userprofile
        return {
            "access_token": str(AccessToken.for_user(instance)),
            "user": {
                "user_id": instance.id,
                "username": instance.username,
                "full_name": f"{instance.first_name} {instance.last_name}",
                "email": instance.email,
                "profile_picture": (
                    user_profile.profile_picture if user_profile else None
                ),
            },
        }


class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, attrs):
        email = attrs["email"]
        try:
            user = User.objects.get(email=email)
            attrs["username"] = user.username
        except User.DoesNotExist:
            attrs["username"] = None
        return attrs


class InterestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Interest
        fields = ["id", "label"]


class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = ["id", "label"]


class AddUserInfoSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserProfile
        exclude = ["profile_picture", "description"]

    def validate(self, attrs):
        required_fields = [
            "country",
            "birth_date",
            "interests",
            "gender",
            "mobile_number",
        ]

        for field in required_fields:
            if not attrs.get(field):
                raise serializers.ValidationError(
                    {field: f"{field.capitalize()} is required."}
                )
        return super().validate(attrs)


class UserProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserProfile
        fields = "__all__"

    def to_representation(self, instance):
        representation = super().to_representation(instance)

        representation["full_name"] = (
            f"{instance.user.first_name} {instance.user.last_name}"
        )
        representation["email"] = instance.user.email
        representation["username"] = instance.user.username
        representation["country"] = instance.country.label
        representation["user_role"] = (
            instance.user.groups.first().name if instance.user.groups.exists() else None
        )
        representation["gender"] = instance.get_gender_display()
        representation.pop("interests")
        representation["educations"] = EducationSerializer(
            instance.education_set.all(), many=True
        ).data
        representation["work_experiences"] = WorkExperienceSerializer(
            instance.workexperience_set.all(), many=True
        ).data
        return representation
    

class WorkExperienceSerializer(serializers.ModelSerializer):

    class Meta:
        model = WorkExperience
        fields = "__all__"

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation.pop("user_profile")

        return representation


class EducationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Education
        fields = "__all__"

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation["institution"] = instance.institution.label
        representation.pop("user_profile")
        return representation
