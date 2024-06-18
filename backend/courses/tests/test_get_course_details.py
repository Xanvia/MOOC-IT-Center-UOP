from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User, Group
from userprofiles.models import UserProfile, Country, Interest, Institution
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework.exceptions import ErrorDetail
from courses.models import Course


class GetCourseTest(APITestCase):
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
        self.url = reverse("course-detail", args=[1])

    def test_get_course_details_success(self):
        course_data = {
            "name": "test course",
            "category": 1,
            "institution": 1,
            "difficulty": "beginner",
        }
        url = reverse("course-list")
        response = self.client.post(url, course_data, format="json")
        course_id = response.data["data"]["id"]
        self.url = reverse("course-detail", args=[course_id])
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        expected_data = {
            "status": "success",
            "data": {
                "id": course_id,
                "name": "test course",
                "category": 1,
                "institution": 1,
                "difficulty": "beginner",
                "outcomes": "",
                "specifications": "",
                "description": "",
            },
        }
        expected_data = {
            "status": "success",
            "data": {
                "id": 1,
                "name": "test course",
                "description": None,
                "specifications": None,
                "outcomes": [],
                "header_image": None,
                "duration": None,
                "difficulty": "beginner",
                "status": "unpublished",
                "course_creator": "test_user1",
                "category": 1,
                "institution": 1,
            },
        }
        self.assertEqual(response.data, expected_data)
