from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from userprofiles.models import UserProfile
from rest_framework_simplejwt.tokens import AccessToken


class AddUserInfoTest(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.url = reverse("user-login")
        cls.username = "test@example.com"
        cls.email = "test@example.com"
        cls.password = "testpassword"
        cls.user = User.objects.create_user(
            username=cls.username, email=cls.email, password=cls.password
        )
        cls.user_profile = UserProfile.objects.create(user=cls.user)
        cls.token = str(AccessToken.for_user(cls.user))

    def setUp(self):
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.token}")
        self.url = reverse("add-user-info")

    def test_add_user_data_success(self):

        user_data = {
            "country": 2,
            "gender": "F",
            "birth_date": "2000-10-12",
            "mobile_number": "+94 872 2323",
            "interests": [2, 3, 4],
        }

        response = self.client.put(self.url, user_data, format="json")

        expected_data = {"status": "success", "message": "User info added successfully"}

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(expected_data, response.data)

        self.user.refresh_from_db()

        user_profile = self.user.userprofile

        self.assertEqual(user_profile.country.id, user_data["country"])
        self.assertEqual(user_profile.gender, "F")
        self.assertEqual(user_profile.mobile_number, user_data["mobile_number"])

        user_interests = user_profile.interests.values_list("id", flat=True)

        self.assertCountEqual(user_data["interests"], list(user_interests))

    def test_required_data(self):
        user_data = {
            "country": 2,
        }

        response = self.client.put(self.url, user_data, format="json")
        expected_data = {"status": "fail", "message": ["Birth_date is required."]}

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(expected_data, response.data)

        user_data = {
            "birth_date": "2000-10-12",
        }

        response = self.client.put(self.url, user_data, format="json")
        expected_data = {"status": "fail", "message": ["Country is required."]}

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(expected_data, response.data)

        user_data = {
            "country": 2,
            "birth_date": "2000-10-12",
        }

        response = self.client.put(self.url, user_data, format="json")
        expected_data = {"status": "fail", "message": ["Interests is required."]}

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(expected_data, response.data)

        user_data = {"country": 2, "birth_date": "2000-10-12", "interests": [1, 2, 3]}

        response = self.client.put(self.url, user_data, format="json")
        expected_data = {"status": "fail", "message": ["Gender is required."]}

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(expected_data, response.data)

        user_data = {
            "country": 2,
            "birth_date": "2000-10-12",
            "interests": [1, 2, 3],
            "gender": "M",
        }

        response = self.client.put(self.url, user_data, format="json")
        expected_data = {"status": "fail", "message": ["Mobile_number is required."]}

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(expected_data, response.data)
