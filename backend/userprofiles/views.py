from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer
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


class GoogleAuth(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        code = request.data.get("code")
        redirect_uri = request.data.get("redirect_uri")
        access_token = get_access_token(code, redirect_uri)
        
        if not access_token:
            return Response({"error": "Failed to obtain access token from Google."},
                            status=status.HTTP_400_BAD_REQUEST)

        user_info = get_user_info(access_token)        

        if not user_info.get("email"):
            return Response({"error": "Failed to obtain user info from Google."},
                            status=status.HTTP_400_BAD_REQUEST)

        request.data["email"] = user_info["email"] 
        request.data["first_name"] = user_info["given_name"]
        request.data["last_name"] = user_info["family_name"]
        request.data["password"] = ""
        request.data["username"] = user_info["email"]

        response = super().post(request)

        response.data = {
            "status": "success",
            "message": "User registered successfully",
            "data": response.data,
        }
