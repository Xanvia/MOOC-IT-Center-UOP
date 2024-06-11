from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User, Group
from userprofiles.models import (
    UserProfile,
    Country,
    WorkExperience,
    Institution,
    Education,
)
from rest_framework_simplejwt.tokens import AccessToken


class GetUserProfileViewSetTest(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.userdata = {
            "username": "test_user1",
            "email": "test@gmail.com",
            "password": "password",
            "first_name": "test",
            "last_name": "user",
        }
        cls.user = User.objects.create_user(**cls.userdata)
        cls.country = Country.objects.get(id=1)
        cls.user_profile_data = {
            "user": cls.user,
            "description": "test description",
            "mobile_number": "1234567890",
            "country": cls.country,
            "gender": "M",
            "birth_date": "2000-01-01",
        }
        cls.user_profile = UserProfile.objects.create(**cls.user_profile_data)
        cls.token = str(AccessToken.for_user(cls.user))
        cls.maxDiff = None

    def setUp(self):
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.token}")
        self.url = reverse("user-profile")

    def test_get_user_profile_success(self):
        work = WorkExperience.objects.create(
            user_profile=self.user_profile,
            position="Software Engineer",
            company="Google",
            start_date="2019-01",
            end_date="2021-01",
        )
        institution = Institution.objects.create(label="University of Nairobi")
        education = Education.objects.create(
            user_profile=self.user_profile,
            degree="Bsc Hons in Computer Science",
            institution=institution,
            start_date="2015-01",
            end_date="2019-01",
        )
        response = self.client.get(self.url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
