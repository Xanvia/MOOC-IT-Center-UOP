from django.urls import path
from .views import (
    UserRegistrationApiView,
    GoogleAuthRegisterView,
    UserLoginApiView,
    GoogleLoginApiView,
    AddUserInfoView,
    CountryListAPIView,
    UserProfileViewSet,
    RemoveUserProfileImage,
    WorkExperienceApiView,
)

urlpatterns = [
    path("register/", UserRegistrationApiView.as_view(), name="user-registration"),
    path("add-user-info/", AddUserInfoView.as_view(), name="add-user-info"),
    path("google-auth/login/", GoogleLoginApiView.as_view(), name="user-login-google"),
    path("google-auth/", GoogleAuthRegisterView.as_view(), name="google-auth"),
    path("login/", UserLoginApiView.as_view(), name="user-login"),
    path("countries/", CountryListAPIView.as_view(), name="country-list"),
    path(
        "profile/",
        UserProfileViewSet.as_view({"get": "retrieve", "put": "update"}),
        name="user-profile",
    ),
    path(
        "profile-image", RemoveUserProfileImage.as_view(), name="remove-profile-image"
    ),
    path("work/", WorkExperienceApiView.as_view(), name="workxp"),
]
