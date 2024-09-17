from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User, Group
from userprofiles.models import UserProfile, Country, Interest
from courses.models import Enrollment, Progress, Week, Chapter, Note
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework.exceptions import ErrorDetail
from courses.models import Course


class ProgressViewsetTest(APITestCase):
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
        cls.student_data = {"username": "test_user2", "email": "test@gmail.com"}
        cls.student = User.objects.create_user(**cls.student_data)
        student_group = Group.objects.get(name="student")
        cls.student.groups.add(student_group)
        cls.token = str(AccessToken.for_user(cls.student))
        cls.maxDiff = None

    def setUp(self):
        category = Interest.objects.get(id=1)
        course = Course.objects.create(
            name="test course",
            category=category,
            difficulty="beginner",
            course_creator=self.user,
            institution_id=1,
        )
        week = Week.objects.create(course=course, name="week1")
        chapter = Chapter.objects.create(week=week, name="chapter1")

        note = Note.objects.create(chapter=chapter, content="note content")
        self.component_id = note.id
        enrollement = Enrollment.objects.create(course=course, student=self.student)

    def test_start_progress(self):
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.token}")
        self.url = reverse(
            "start_component", kwargs={"component_id": self.component_id}
        )
        response = self.client.post(self.url)
        component = response.data.get("data")["id"]
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(
            response.data,
            {
                "status": "success",
                "message": "Component started successfully",
                "data": {"id": component},
            },
        )

    def test_mark_as_completed(self):
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.token}")
        self.url = reverse(
            "start_component", kwargs={"component_id": self.component_id}
        )
        self.client.post(self.url)
        self.url = reverse("mark_as_completed", kwargs={"pk": 1})
        response = self.client.patch(self.url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            response.data,
            {
                "status": "success",
                "message": "Component marked as completed successfully",
            },
        )

    def test_get_progress(self):
        # create more notes to the chapter
        week = Week.objects.get(id=1)
        chapter = Chapter.objects.get(id=1)

        note = Note.objects.create(chapter=chapter, content="note content")
        note2 = Note.objects.create(chapter=chapter, content="note content")
        note3 = Note.objects.create(chapter=chapter, content="note content")

        # start all notes and complete only 2

        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.token}")
        self.url = reverse("start_component", kwargs={"component_id": 1})
        self.client.post(self.url)
        self.url = reverse("start_component", kwargs={"component_id": 2})
        self.client.post(self.url)
        self.url = reverse("start_component", kwargs={"component_id": 3})
        self.client.post(self.url)
        self.url = reverse("mark_as_completed", kwargs={"pk": 1})
        self.client.patch(self.url)
        self.url = reverse("mark_as_completed", kwargs={"pk": 2})
        self.client.patch(self.url)

        self.url = reverse("get_progress", kwargs={"pk": 1})
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        expected_data = {
            "status": "success",
            "data": {
                "id": 1,
                "progress": 50,
                "current_component": {"week": 1, "chapter": 1, "id": 3, "name": ""},
            },
        }
        self.assertEqual(response.data, expected_data)
