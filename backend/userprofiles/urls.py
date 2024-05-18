from django.urls import path
from .views import UserRegistrationApiView, GoogleAuthView

urlpatterns = [
    path("register/", UserRegistrationApiView.as_view(), name="user-registration"),
    path("google-auth/", GoogleAuthView.as_view(), name="google-auth"),
]
