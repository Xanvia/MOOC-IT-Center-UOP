from django.urls import path
from .views import UserRegistrationApiView, GoogleAuthView, UserLoginApiView

urlpatterns = [
    path("register/", UserRegistrationApiView.as_view(), name="user-registration"),
    path("google-auth/", GoogleAuthView.as_view(), name="google-auth"),
    path("login/", UserLoginApiView.as_view(), name="user-login"),
]
