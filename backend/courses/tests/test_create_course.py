from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User, Group
from userprofiles.models import UserProfile, Country, Interest, Institution
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework.exceptions import ErrorDetail
from courses.models import Course


class CreateCourseTest(APITestCase):
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
        cls.group = Group.objects.get(name="teacher")
        cls.user.groups.add(cls.group)
        cls.user.save()
        cls.token = str(AccessToken.for_user(cls.user))
        cls.maxDiff = None

    def setUp(self):
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.token}")
        self.url = reverse("course-list")

    def test_create_course_success(self):
        institute = Institution.objects.get(id=1)
        category = Interest.objects.get(id=1)
        data = {
            "name": "test course",
            "category": 1,
            "institution": 1,
            "difficulty": "beginner",
        }
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        expected_data = {
            "status": "success",
            "message": "Course created successfully",
        }
        self.assertEqual(response.data, expected_data)

        # check if the course is created in db
        course = Course.objects.get(name="test course")
        self.assertEqual(course.name, "test course")

    def test_create_course_required_fields(self):
        response = self.client.post(self.url, {}, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        expected_data = {
            "status": "fail",
            "message": [
                "name field is required.",
                "difficulty field is required.",
                "category field is required.",
                "institution field is required.",
            ],
        }

        self.assertEqual(response.data, expected_data)

    def test_create_course_invalid_category(self):
        data = {
            "name": "test course",
            "category": 1000,
            "institution": 1,
            "difficulty": "beginner",
        }
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        expected_data = {
            "status": "fail",
            "message": [
                ErrorDetail(
                    string='Invalid pk "1000" - object does not exist.',
                    code="does_not_exist",
                )
            ],
        }

        self.assertEqual(response.data, expected_data)
