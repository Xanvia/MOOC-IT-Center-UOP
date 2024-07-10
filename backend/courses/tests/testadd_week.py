from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User, Group
from userprofiles.models import UserProfile, Country
from courses.models import Week,Chapter
from rest_framework_simplejwt.tokens import AccessToken


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
        self.url = reverse("course-detail", args=[1])
    

    def test_add_week(self):
        course_data = {
            "name": "test course",
            "category": 1,
            "institution": 1,
            "difficulty": "beginner",
        }
        url = reverse("course-list")
        response = self.client.post(url, course_data, format="json")
        
        data = {
            "name": "test week",
        }

        response = self.client.post(reverse("week-list", args=[1]), data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        
        self.assertEqual(response.data["status"], "success")
        self.assertEqual(response.data["message"], "Week created successfully")
        self.assertTrue(Week.objects.filter(course_id=1).exists())


    def test_add_chapter(self):

        course_data = {
            "name": "test course",
            "category": 1,
            "institution": 1,
            "difficulty": "beginner",
        }
        url = reverse("course-list")
        response = self.client.post(url, course_data, format="json")
        
        data = {
            "name": "test week",
        }

        response = self.client.post(reverse("week-list", args=[1]), data, format="json")

        data ={
            "name": "test chapter",
        }

        response = self.client.post(reverse("chapter-list", args=[1]), data, format="json")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["status"], "success")
        self.assertTrue(Chapter.objects.filter(week_id=1).exists())
        

    def test_delete_week(self):
        course_data = {
            "name": "test course",
            "category": 1,
            "institution": 1,
            "difficulty": "beginner",
        }
        url = reverse("course-list")
        response = self.client.post(url, course_data, format="json")
        
        data = {
            "name": "test week",
        }

        response = self.client.post(reverse("week-list", args=[1]), data, format="json")

        response = self.client.delete(reverse("week-detail", args=[1]))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(response.data["status"], "success")
        self.assertEqual(response.data["message"], "Week deleted successfully")
        self.assertFalse(Week.objects.filter(course_id=1).exists())