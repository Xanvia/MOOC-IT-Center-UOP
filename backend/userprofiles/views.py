from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer, GoogleAuthSerializer , LoginSerializer
from .utils import google_authenticate
from rest_framework.views import APIView


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
    

class LoginApiView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            return Response(serializer.validated_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



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
            "message": "User authenticated successfully",
            "data": response.data,
        }
        return Response(response.data, status=status.HTTP_200_OK)


