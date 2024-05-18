from rest_framework import serializers
from django.contrib.auth.models import User, Group
from rest_framework_simplejwt.tokens import AccessToken
from .models import UserProfile


class UserSerializer(serializers.ModelSerializer):
    firstname = serializers.CharField(source="first_name", required=True)
    lastname = serializers.CharField(source="last_name", required=True)
    user_type = serializers.CharField(required=True)

    class Meta:
        model = User
        fields = ["firstname", "lastname", "email", "password", "username","user_type"]

    def validate(self, attrs):
        email = attrs.get("email", "")
        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError({"email": "Email already exists"})
        
        usertype = attrs.get("user_type", "")
        if usertype not in ["student", "teacher"]:
            raise serializers.ValidationError({"user_type": "User type must be student or teacher"})
        return attrs
    
    def create(self, validated_data):
        user_type = validated_data.pop("user_type")
        password = validated_data.pop("password")
        self.fields.pop("user_type")

        #create user
        user = super().create(validated_data)
        user.set_password(password)
        user.save()

        # add user to group
        group = Group.objects.get(name=user_type)
        group.user_set.add(user)

        return user
    
    def to_representation(self, instance):
        return {
            "user_id": instance.id,
            "access_token": str(AccessToken.for_user(instance)),
        }
    
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = "__all__"

class GoogleAuthSerializer(serializers.Serializer):
    firstname = serializers.CharField(source="first_name", required=True)
    lastname = serializers.CharField(source="last_name", required=True)
    user_type = serializers.CharField(required=True)
    email = serializers.EmailField(required=True)
    username = serializers.CharField(required=True)
    user_profile = UserProfileSerializer()

    def validate(self, attrs):
        email = attrs.get("email", "")
        if User.objects.filter(email=email).exists():
            return attrs
        
        usertype = attrs.get("user_type", "")
        if usertype not in ["student", "teacher"]:
            raise serializers.ValidationError({"user_type": "User type must be student or teacher"})
        return attrs

    def create(self, validated_data):
        user_type = validated_data.pop("user_type")
        profile_data = validated_data.pop('user_profile')
        self.fields.pop("user_type")

        # check if user exists
        user, created = User.objects.get_or_create(email=validated_data['email'], defaults=validated_data)

        if created:
            # add user to group
            group = Group.objects.get(name=user_type)
            group.user_set.add(user)

            # create user profile
            UserProfile.objects.create(user=user, **profile_data)

        return user

    def to_representation(self, instance):
        return {
            "user_id": instance.id,
            "access_token": str(AccessToken.for_user(instance)),
        }