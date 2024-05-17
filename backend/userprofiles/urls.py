from django.urls import path
from .views import UserRegistrationApiView, GoogleAuthView , LoginApiView

urlpatterns = [
    path("register/", UserRegistrationApiView.as_view(), name="user-registration"),
    path("google-auth/", GoogleAuthView.as_view(), name="google-auth"),
    path('login/', LoginApiView.as_view(), name='login'),
]
