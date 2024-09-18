from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User, Group
from userprofiles.models import UserProfile, Country, Interest, Institution
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework.exceptions import ErrorDetail
from courses.models import Course


class AddTeacherCourseTest(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.userdata = {
            "username": "test_user1",
            "email": "test@email.com",
            "password": "password",
            "first_name": "test",
            "last_name": "user",
        }
        cls.user = User.objects.create_user(**cls.userdata)
        cls.country = Country.objects.get(id=1)
        cls.group = Group.objects.get(name="teacher")
        cls.user.groups.add(cls.group)
        cls.user.save()
        cls.token = str(AccessToken.for_user(cls.user))
        category = Interest.objects.get(id=1)
        institution = Institution.objects.get(id=1)
        cls.course_data = {
            "name": "test course",
            "category": category,
            "institution": institution,
            "difficulty": "beginner",
            "course_creator": cls.user,
        }
        cls.course = Course.objects.create(**cls.course_data)

        cls.maxDiff = None

    def setUp(self):
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.token}")
        self.url = reverse("course-teacher-list", args=[self.course.id])

    def test_add_teacher_course_success(self):
        teacher = User.objects.create_user(
            username="teacher_user",
            email="teacher@test.com",
            password="password",
            first_name="teacher",
            last_name="user",
        )
        teacher.groups.add(Group.objects.get(name="teacher"))

        data = {
            "teacher": teacher.username,
            "role": "editing_teacher",
        }

        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data, {
            "status": "success",
            "message": "Teacher added to course",
        })


    def test_add_teacher_course_invalid_teacher(self):
        data = {
            "teacher": "invalid_teacher",
            "role": "editing_teacher",
        }

        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data, {
            "status": "fail",
            "message": [ErrorDetail(string='User does not exist', code='invalid')]
        })

    def test_add_teacher_not_a_teacher(self):
        user = User.objects.create_user(
            username="user",
            email="abc@s.co"
        )
        data = {
            "teacher": user.username,
            "role": "editing_teacher",
        }

        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data, {
            "status": "fail",
            "message": [ErrorDetail(string='User is not a teacher', code='invalid')]
        })
    