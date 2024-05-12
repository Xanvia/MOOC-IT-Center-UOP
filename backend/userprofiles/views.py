from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer


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



