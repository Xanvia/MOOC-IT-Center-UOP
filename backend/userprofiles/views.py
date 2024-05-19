from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer, GoogleAuthSerializer , UserLoginSerializer
from .utils import google_authenticate
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import AccessToken
from .models import UserProfile
from django.contrib.auth.models import User
from django.core.exceptions import PermissionDenied


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
    

# class UserLoginApiView(generics.GenericAPIView):
#     serializer_class = UserLoginSerializer
#     permission_classes = [permissions.AllowAny]

#     def post(self, request):
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         user_name = serializer.validated_data["username"]
#         password = serializer.validated_data["password"]
#         user = authenticate(username=user_name, password=password)
#         response_serializer = UserRepresentationSerializer(user)
#         if user:
#             respObj = {
#                 "status": "success",
#                 "data": response_serializer.data,
#             }
#             return Response(respObj, status=status.HTTP_200_OK)
#         else:
#             respObj = {
#                 "status": "fail",
#                 "message": ["Invalid email or password"],
#             }

#         return Response(respObj, status=status.HTTP_403_FORBIDDEN)



class GoogleAuthRegisterView(generics.CreateAPIView):
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
    
# class GoogleAuthLoginView(generics.GenericAPIView):
#     serializer_class = UserRepresentationSerializer
#     permission_classes = [permissions.AllowAny]

#     def get_object(self,email):
#         try:
#             return User.objects.get(user__email=email)
#         except UserProfile.DoesNotExist:
#            raise PermissionDenied

#     def post(self, request):
#         code = request.data.get("code")
#         redirect_uri = request.data.get("redirect_uri")
        
#         user_data = google_authenticate(code, redirect_uri)
#         user = self.get_object(user_data.email)

#         # Create a serializer instance with the user instance
#         serializer = self.get_serializer(user)

#         response = {
#             "status": "success",
#             "data": serializer.data,
#         }
#         print(serializer.data)

#         return Response(response, status=status.HTTP_200_OK)




