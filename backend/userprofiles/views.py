from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer,GoogleAuthSerializer
from .utils import get_access_token, get_user_info


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


class GoogleAuthView(generics.CreateAPIView):
    def post(self, request):
        code = request.data.get('code')
        redirect_uri = request.data.get('redirect_uri')

        access_token = get_access_token(code, redirect_uri)
        user_info = get_user_info(access_token)

        # Add user info to request data
        request.data.update(user_info)

        response = super.create(request)

        response.data = {
            "status": "success",
            "message": "User authenticated successfully",
            "data": response.data,
        }
