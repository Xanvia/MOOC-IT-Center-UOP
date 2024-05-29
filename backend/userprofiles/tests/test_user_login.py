from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User, Group
from userprofiles.models import UserProfile


class UserLoginViewTest(APITestCase):
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
        cls.group = Group.objects.get(name="student")
        cls.user.groups.add(cls.group)
        cls.user.save()

    def post_request(self, data):
        return self.client.post(self.url, data, format="json")

    def test_user_login_success(self):
        data = {"email": self.email, "password": self.password}
        response = self.post_request(data)

        user = User.objects.get(username=self.username)
        user_object = {
            "user_id": user.id,
            "profile_picture": None,
            "profile_image":None,
            "userRole":"student"
        }
        expected_response = {"status": "success", "data": {"user": user_object}}
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["status"], expected_response["status"])
        self.assertEqual(
            response.data["data"]["user"], expected_response["data"]["user"]
        )
        self.assertIn("access_token", response.data["data"])

    def test_user_login_invalid_password(self):
        data = {"email": self.email, "password": "invalidpassword"}
        response = self.post_request(data)
        expected_data = {"status": "fail", "message": ["Invalid email or password"]}

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertEqual(response.data, expected_data)

    def test_user_login_invalid_email(self):
        data = {"email": "wrong@abc.com", "password": self.password}
        response = self.post_request(data)
        expected_data = {"status": "fail", "message": ["Invalid email or password"]}

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertEqual(response.data, expected_data)

    def test_user_login_invalid_email_format(self):
        data = {"email": "wrong", "password": self.password}
        response = self.post_request(data)
        expected_data = {
            "status": "fail",
            "message": ["Enter a valid email address."],
        }

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data, expected_data)

    def test_user_login_missing_fields(self):
        data = {
            "email": self.username,
        }
        response = self.post_request(data)
        expected_data = {
            "status": "fail",
            "message": ["password field is required."],
        }
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data, expected_data)

        data = {"password": self.password}
        response = self.post_request(data)
        expected_data = {
            "status": "fail",
            "message": ["email field is required."],
        }
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data, expected_data)
