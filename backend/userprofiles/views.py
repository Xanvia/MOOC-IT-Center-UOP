from rest_framework import generics, permissions, viewsets
from rest_framework.response import Response
from rest_framework import status
from .serializers import (
    UserSerializer,
    UserLoginSerializer,
    InterestSerializer,
    AddUserInfoSerializer,
    CountrySerializer,
    UserProfileSerializer,
    WorkExperienceSerializer,
    EducationSerializer,
    InstitutionSerializer,
)
from .utils import google_authenticate
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import AccessToken
from .models import (
    Education,
    UserProfile,
    Interest,
    Country,
    WorkExperience,
    Institution,
)
from django.contrib.auth.models import User
from django.core.exceptions import PermissionDenied


class UserRegistrationApiView(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        request.data["auth_mode"] = "password"
        response = super().post(request)

        response.data = {
            "status": "success",
            "message": "User registered successfully",
            "data": response.data,
        }
        return response


class GoogleAuthRegisterView(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        code = request.data.get("code")
        redirect_uri = request.data.get("redirect_uri")

        user = google_authenticate(code, redirect_uri)
        request.data.update(user)

        response = super().create(request)

        response.data = {
            "status": "success",
            "message": "User registered successfully",
            "data": response.data,
        }

        return Response(response.data, status=status.HTTP_200_OK)


class UserLoginApiView(generics.GenericAPIView):
    serializer_class = UserLoginSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user_name = serializer.validated_data["username"]
        password = serializer.validated_data["password"]
        user = authenticate(username=user_name, password=password)
        try:
            user_profile = UserProfile.objects.get(user=user) if user else None
        except UserProfile.DoesNotExist:
            user_profile = None
        if user:
            user_data = UserSerializer(user).data
            respObj = {
                "status": "success",
                "message": "User Loged In Successfully",
                "data": user_data,
            }
            return Response(respObj, status=status.HTTP_200_OK)
        else:
            respObj = {
                "status": "fail",
                "message": ["Invalid email or password"],
            }

        return Response(respObj, status=status.HTTP_403_FORBIDDEN)


class GoogleLoginApiView(generics.GenericAPIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        code = request.data.get("code")
        redirect_uri = request.data.get("redirect_uri")
        try:
            user_data = google_authenticate(code, redirect_uri)
        except Exception as e:
            print(e)
        try:
            user = User.objects.get(email=user_data.get("email"))
        except User.DoesNotExist:
            raise PermissionDenied("User does not exist")
        user_data = UserSerializer(user).data
        respObj = {
            "status": "success",
            "message": "User Loged In Successfully",
            "data": user_data,
        }

        return Response(respObj, status=status.HTTP_200_OK)


class InterestListAPIView(generics.ListAPIView):
    queryset = Interest.objects.all().order_by("label")
    serializer_class = InterestSerializer
    pagination_class = None

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        return Response(
            {"status": "success", "data": {"interests": response.data}},
            status=status.HTTP_200_OK,
        )


class AddUserInfoView(generics.UpdateAPIView):
    serializer_class = AddUserInfoSerializer
    queryset = UserProfile.objects.all()

    def get_object(self):
        user = self.request.user
        return user.userprofile

    def update(self, request, *args, **kwargs):

        response = super().update(request, *args, partial=True, **kwargs)

        response.data = {
            "status": "success",
            "message": "User info added successfully",
        }
        return response


class CountryListAPIView(generics.ListAPIView):
    queryset = Country.objects.all().order_by("label")
    serializer_class = CountrySerializer
    pagination_class = None

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        return Response(
            {"status": "success", "data": {"countries": response.data}},
            status=status.HTTP_200_OK,
        )


class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

    def get_object(self):
        user = self.request.user
        return user.userprofile

    def retrieve(self, request, *args, **kwargs):
        response = super().retrieve(request, *args, **kwargs)

        response.data = {
            "status": "success",
            "data": response.data,
        }
        return response

    def update(self, request, *args, **kwargs):
        response = super().update(request, partial=True, *args, **kwargs)

        response.data = {
            "status": "success",
            "message": "User info updated successfully",
        }
        return response


class RemoveUserProfileImage(generics.UpdateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

    def get_object(self):
        user = self.request.user
        return user.userprofile

    def patch(self, request, *args, **kwargs):
        user_profile = self.get_object()
        user_profile.profile_image = None
        user_profile.save()
        data = {
            "status": "success",
            "message": "User profile image removed successfully",
        }
        return Response(data, status=status.HTTP_200_OK)


class WorkExperienceApiView(viewsets.ModelViewSet):
    queryset = WorkExperience.objects.all()
    serializer_class = WorkExperienceSerializer

    def filter_queryset(self, queryset):
        return (
            super()
            .filter_queryset(queryset)
            .filter(user_profile=self.request.user.userprofile)
        )

    def create(self, request, *args, **kwargs):

        request.data["user_profile"] = request.user.userprofile.id
        response = super().create(request, *args, **kwargs)

        response.data = {
            "status": "success",
            "message": "Work experience added successfully",
        }
        return response

    def update(self, request, *args, **kwargs):

        response = super().update(request, partial=True, *args, **kwargs)

        response.data = {
            "status": "success",
            "message": "Work experience updated successfully",
        }
        return response

    def destroy(self, request, *args, **kwargs):

        response = super().destroy(request, *args, **kwargs)

        response.data = {
            "status": "success",
            "message": "Work experience deleted successfully",
        }
        return response


class EducationApiView(viewsets.ModelViewSet):
    queryset = Education.objects.all()
    serializer_class = EducationSerializer

    def filter_queryset(self, queryset):
        return (
            super()
            .filter_queryset(queryset)
            .filter(user_profile=self.request.user.userprofile)
        )

    def create(self, request, *args, **kwargs):

        request.data["user_profile"] = request.user.userprofile.id
        response = super().create(request, *args, **kwargs)

        response.data = {
            "status": "success",
            "message": "Education details added successfully",
        }
        return response

    def update(self, request, *args, **kwargs):

        response = super().update(request, partial=True, *args, **kwargs)

        response.data = {
            "status": "success",
            "message": "Education details updated successfully",
        }
        return response

    def destroy(self, request, *args, **kwargs):

        response = super().destroy(request, *args, **kwargs)

        response.data = {
            "status": "success",
            "message": "Education details deleted successfully",
        }
        return response


class InstitutionsListAPIView(generics.ListAPIView):
    queryset = Institution.objects.all().order_by("label")
    serializer_class = InstitutionSerializer
    pagination_class = None

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        return Response(
            {"status": "success", "data": {"institutions": response.data}},
            status=status.HTTP_200_OK,
        )
