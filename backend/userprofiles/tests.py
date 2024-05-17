from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from django.contrib.auth.models import Group


class UserRegisterViewTest(APITestCase):

    @classmethod
    def setUpTestData(cls):
        cls.url = reverse("user-registration")

    def setUp(self):
        self.data = {
            "username": "testuser",
            "firstname": "first",
            "user_type": "student",
            "lastname": "last",
            "email": "test@gmail.com",
            "password": "password",
        }

    def create_user(self, email):
        return User.objects.create_user(
            first_name="existing",
            last_name="user",
            username=email,
            email=email,
            password="password123",
        )

    def post_request(self, data):
        return self.client.post(self.url, data)

    def test_create_user_success(self):
        response = self.post_request(self.data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        created_user = User.objects.get(email=self.data["email"])
        self.assertEqual(created_user.email, self.data["email"])

        group = Group.objects.get(name="student")
        self.assertTrue(created_user.groups.filter(name=group.name).exists())

    def test_create_user_wrong_email_format(self):
        self.data["email"] = "testgmail.com"
        response = self.post_request(self.data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["message"], ["Enter a valid email address."])

    def test_email_uniqueness(self):
        self.create_user("existing@example.com")
        self.data["email"] = "existing@example.com"
        response = self.post_request(self.data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["message"], ["Email already exists"])

    def test_email_and_password_not_provided(self):
        del self.data["email"]
        del self.data["password"]
        response = self.post_request(self.data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        messages = ["email field is required.", "password field is required."]

        self.assertTrue(
            any(message in response.data["message"] for message in messages)
        )

    def test_cannot_be_added_to_admin_group(self):
        self.data["user_type"] = "admin"
        response = self.post_request(self.data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["message"], ["User type must be student or teacher"])


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

    def post_request(self, data):
        return self.client.post(self.url, data, format="json")

    def test_user_login_success(self):
        data = {"email": self.email, "password": self.password}
        response = self.post_request(data)

        user = User.objects.get(username=self.username)
        user_object = {
            "user_id": user.id,
            "username": user.username,
            "full_name": f"{user.first_name} {user.last_name}",
            "email": user.email,
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

