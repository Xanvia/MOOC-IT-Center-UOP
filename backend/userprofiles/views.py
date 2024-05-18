from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer, GoogleAuthSerializer , UserLoginSerializer
from .utils import google_authenticate
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import AccessToken
from .models import UserProfile


class UserRegistrationApiView(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        response = super().post(request)

        response.data = {
            "status": "success",
            "message": "User registered successfully",
            "data": response.data,
        }
        return response
    

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
            respObj = {
                "status": "success",
                "data": {
                    "access_token": str(AccessToken.for_user(user)),
                    "user": {
                        "user_id": user.id,
                        "username": user.username,
                        "full_name": f"{user.first_name} {user.last_name}",
                        "email": user.email,
                        "profile_picture": user_profile.profile_picture if user_profile else None,
                    },
                },
            }
            return Response(respObj, status=status.HTTP_200_OK)
        else:
            respObj = {
                "status": "fail",
                "message": ["Invalid email or password"],
            }

        return Response(respObj, status=status.HTTP_403_FORBIDDEN)



class GoogleAuthView(generics.CreateAPIView):
    serializer_class = GoogleAuthSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        code = request.data.get("code")
        redirect_uri = request.data.get("redirect_uri")

        user = google_authenticate(code, redirect_uri)

        request.data.update(user)

        response = super().create(request)

        response.data = {
            "status": "success",
            "data": response.data,
        }

        return Response(response.data, status=status.HTTP_200_OK)

