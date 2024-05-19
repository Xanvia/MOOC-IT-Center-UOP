from django.urls import path
from .views import UserRegistrationApiView, GoogleAuthRegisterView

urlpatterns = [
    path("register/", UserRegistrationApiView.as_view(), name="user-registration"),
    path("google-auth/", GoogleAuthRegisterView.as_view(), name="google-auth"),
]
