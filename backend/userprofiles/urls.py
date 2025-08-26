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
    EducationApiView,
    StudentListView,
    UserProfileByIdView,
    VerifyEmailView,
    PasswordResetRequestView,
    PasswordResetView,
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
        "profile/<int:pk>/",
        UserProfileByIdView.as_view({"get": "retrieve", "put": "update"}),
        name="user-profile-detail",
    ),
    path(
        "profile-image", RemoveUserProfileImage.as_view(), name="remove-profile-image"
    ),
    path(
        "work/",
        WorkExperienceApiView.as_view({"post": "create"}),
        name="work-experience",
    ),
    path(
        "work/<int:pk>/",
        WorkExperienceApiView.as_view({"put": "update", "delete": "destroy"}),
        name="work-experience-detail",
    ),
    path(
        "education/",
        EducationApiView.as_view({"post": "create"}),
        name="education",
    ),
    path(
        "education/<int:pk>/",
        EducationApiView.as_view({"put": "update", "delete": "destroy"}),
        name="education-detail",
    ),
    path("verify-email/", VerifyEmailView.as_view(), name="verify-email"),
    path(
        "password-reset-request/",
        PasswordResetRequestView.as_view(),
        name="password-reset-request",
    ),
    path("password-reset/", PasswordResetView.as_view(), name="password-reset"),
]
