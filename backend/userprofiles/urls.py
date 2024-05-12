from django.urls import path
from .views import UserRegistrationApiView

urlpatterns = [
    path("register/", UserRegistrationApiView.as_view(), name="user-registration"),
]
