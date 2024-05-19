from django.urls import path
from .views import UserRegistrationApiView, GoogleAuthRegisterView,UserLoginApiView,GoogleLoginApiView

urlpatterns = [
    path("register/", UserRegistrationApiView.as_view(), name="user-registration"),
    path("google-auth/login/", GoogleLoginApiView.as_view(), name="user-login-google"),
    path("google-auth/", GoogleAuthRegisterView.as_view(), name="google-auth"),
    path("login/", UserLoginApiView.as_view(), name="user-login"),
]
