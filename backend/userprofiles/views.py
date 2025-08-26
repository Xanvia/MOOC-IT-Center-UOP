from rest_framework import generics, permissions, viewsets, status
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
    StudentSerializer,
    PasswordResetRequestSerializer,
    PasswordResetSerializer,
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
    PasswordReset,
)
from django.contrib.auth.models import User, Group
from django.core.exceptions import PermissionDenied
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mail
from random import randint


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


class UserProfileByIdView(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

    def get(self, request, user_id):
        user = User.objects.filter(id=user_id).first()
        if user:
            serializer = UserProfileSerializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)


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


class StudentListView(generics.ListAPIView):
    serializer_class = StudentSerializer
    pagination_class = None

    def get_queryset(self):
        student_group = Group.objects.get(name="student")  # Get the "student" group
        return User.objects.filter(
            groups=student_group
        )  # Filter users in the "student" group

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        return Response(
            {"status": "success", "data": {"students": response.data}},
            status=status.HTTP_200_OK,
        )


class VerifyEmailView(generics.GenericAPIView):
    def post(self, request):
        token = request.data.get("token")
        if not token:
            return Response(
                {"error": "Token is required"}, status=status.HTTP_400_BAD_REQUEST
            )

        try:
            access_token = AccessToken(token)
            user_id = access_token["user_id"]
            user = User.objects.get(id=user_id)
            user.is_active = True
            user.save()
            return Response(
                {"message": "Email verified successfully"}, status=status.HTTP_200_OK
            )
        except Exception as e:
            return Response(
                {"error": "Invalid or expired token"},
                status=status.HTTP_400_BAD_REQUEST,
            )


class PasswordResetRequestView(APIView):
    def post(self, request):
        serializer = PasswordResetRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data["email"]

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response(
                {"error": "User not found"}, status=status.HTTP_404_NOT_FOUND
            )

        otp = str(randint(100000, 999999))
        PasswordReset.objects.update_or_create(user=user, defaults={"otp": otp})

        send_mail(
            "Password Reset OTP",
            f"Your OTP is {otp}",
            "no-reply@example.com",
            [email],
        )

        return Response({"message": "OTP sent to email"}, status=status.HTTP_200_OK)


class PasswordResetView(APIView):
    def post(self, request):
        serializer = PasswordResetSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        otp = serializer.validated_data["otp"]
        new_password = serializer.validated_data["new_password"]

        try:
            password_reset = PasswordReset.objects.get(otp=otp)
        except PasswordReset.DoesNotExist:
            return Response(
                {"error": "Invalid OTP"}, status=status.HTTP_400_BAD_REQUEST
            )

        user = password_reset.user
        user.set_password(new_password)
        user.save()

        password_reset.delete()

        return Response(
            {"message": "Password updated successfully"}, status=status.HTTP_200_OK
        )

