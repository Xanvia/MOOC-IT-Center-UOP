from rest_framework import serializers
from django.contrib.auth.models import  User, Group
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import AccessToken
from .models import UserProfile
from rest_framework_simplejwt.tokens import RefreshToken


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

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(source="user", required=True)
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')

        if username and password:
            user = authenticate(username=username, password=password)
            if user is None:
                raise serializers.ValidationError('Invalid login credentials')

            refresh = RefreshToken.for_user(user)

            return {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }
        else:
            raise serializers.ValidationError('Must include "username" and "password"') 
    
    
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
    profile_picture = serializers.CharField(required=False)

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
        profile_picture = validated_data.pop("profile_picture", None)
        self.fields.pop("user_type")

        # check if user exists
        user, created = User.objects.get_or_create(email=validated_data['email'], defaults=validated_data)

        if created:
            # add user to group
            group = Group.objects.get(name=user_type)
            group.user_set.add(user)

            # create user profile
            UserProfile.objects.create(user=user, profile_picture=profile_picture)

        return user

    def to_representation(self, instance):
        return {
            "user_id": instance.id,
            "access_token": str(AccessToken.for_user(instance)),
        }