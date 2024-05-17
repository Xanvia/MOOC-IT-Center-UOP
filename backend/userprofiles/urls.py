from django.urls import path
from .views import UserRegistrationApiView, GoogleAuth

urlpatterns = [
    path("register/", UserRegistrationApiView.as_view(), name="user-registration"),
    path("google-auth/", GoogleAuth.as_view(), name="google-auth"),
]
