from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User, Group
from userprofiles.models import UserProfile, Country, Interest, Institution
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework.exceptions import ErrorDetail
from courses.models import Course


class EnrollCourseTest(APITestCase):
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
        cls.student_data = {
            "username": "test_user2",
            "email": "test@gmail.com"
        }
        cls.student= User.objects.create_user(**cls.student_data)
        student_group = Group.objects.get(name="student")
        cls.student.groups.add(student_group)
        cls.token = str(AccessToken.for_user(cls.student))
        cls.maxDiff = None

    def setUp(self):
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.token}")
        self.url = reverse("enroll-course", args=[1])


    def test_enroll_success(self):
        institution = Institution.objects.get(id=1)
        category = Interest.objects.get(id=1)
        course_data = {
            "name": "test course",
            "category": category,
            "institution": institution,
            "difficulty": "beginner",
            "course_creator": self.user
        }

        course = Course.objects.create(**course_data)
        course_id = course.id
        self.url = reverse("enroll-course", args=[course_id])
        response = self.client.post(self.url)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data, {"status": "success", "message": "Enrolled successfully"})