from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User, Group
from userprofiles.models import UserProfile, Country, Interest, Institution
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework.exceptions import ErrorDetail
from courses.models import Course, Week, Chapter, Quiz


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
        cls.course_data = {
            "name": "test course",
            "category": Interest.objects.get(id=1),
            "institution": Institution.objects.get(id=1),
            "difficulty": "beginner",
            "course_creator": cls.user,
        }
        cls.course = Course.objects.create(**cls.course_data)
        cls.week_data = {
            "name": "test week",
            "course": cls.course,
        }
        cls.week = Week.objects.create(**cls.week_data)
        cls.chapter_data = {
            "name": "test chapter",
            "week": cls.week,
        }
        cls.chapter = Chapter.objects.create(**cls.chapter_data)
        cls.token = str(AccessToken.for_user(cls.user))
        cls.maxDiff = None

    def setUp(self):
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.token}")
        self.url = reverse("quiz-list", args=[self.chapter.id])

    def test_create_a_quiz(self):
        data = {
            "name": "test quiz",
            "chapter": self.chapter.id,
        }
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        expected_data = {
            "status": "success",
            "message": "Quiz created successfully",
            "data": {"id": 1},
        }
        self.assertEqual(response.data, expected_data)

    def test_add_questions(self):
        chapter = Chapter.objects.get(id=1)
        quiz_data = {  
            "name": "test quiz",
            "chapter": chapter,
        }
        quiz_object = Quiz.objects.create(**quiz_data)
        data = {
            "text": "Which property is used to change the background color in CSS?",
            "question_type": "MC",
            "answers": [
                {"text": "bgcolor"},
                {"text": "color"},
                {"text": "background ", "is_correct": "True"},
                {"text": "bg-color"},
            ],
        }
        response = self.client.post(
            reverse("add-questions", args=[1]), data, format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        expected_data = {
            "status": "success",
            "message": "Question added successfully",
            "data": {"id": 1},
        }
        self.assertEqual(response.data, expected_data)
