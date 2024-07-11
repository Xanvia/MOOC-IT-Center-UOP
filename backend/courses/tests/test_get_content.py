from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User, Group
from userprofiles.models import UserProfile, Country, Interest, Institution
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework.exceptions import ErrorDetail
from courses.models import Course, Week, Chapter, Note, Video
from collections import OrderedDict


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
        cls.note_data = {
            "name": "test note",
            "content": "test content",
            "chapter": cls.chapter,
        }
        cls.note = Note.objects.create(**cls.note_data)
        cls.video_data = {
            "name": "test video",
            "video_link": "https://www.youtube.com/watch?v=1234567890",
            "chapter": cls.chapter,
        }
        cls.video = Video.objects.create(**cls.video_data)
        cls.token = str(AccessToken.for_user(cls.user))
        cls.maxDiff = None

    def setUp(self):
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.token}")
        self.url = reverse("week-list", args=[self.week.id])

    def test_get_content_success(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        expected_data= {
            "status": "success",
            "data": [
                OrderedDict(
                    {
                        "id": 1,
                        "name": "test week",
                        "course": 1,
                        "chapters": [
                            OrderedDict(
                                {
                                    "id": 1,
                                    "name": "test chapter",
                                    "week": 1,
                                    "items": [
                                        OrderedDict(
                                            {
                                                "id": 1,
                                                "name": "test note",
                                                "type": None,
                                                "chapter": 1,
                                            }
                                        ),
                                        OrderedDict(
                                            {
                                                "id": 2,
                                                "name": "test video",
                                                "type": None,
                                                "chapter": 1,
                                            }
                                        ),
                                    ],
                                }
                            )
                        ],
                    }
                )
            ],
        }
        self.assertEqual(response.data, expected_data)
