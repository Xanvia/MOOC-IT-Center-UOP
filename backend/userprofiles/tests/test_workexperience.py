from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User, Group
from userprofiles.models import (
    UserProfile,
    Country,
    WorkExperience,
    Education,
    Institution,
)
from rest_framework_simplejwt.tokens import AccessToken


class GetUserProfileViewSetTest(APITestCase):
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
        cls.group = Group.objects.get(name="student")
        cls.user.groups.add(cls.group)
        cls.user.save()
        cls.token = str(AccessToken.for_user(cls.user))
        cls.maxDiff = None

    def setUp(self):
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.token}")

    def test_add_work_user_profile(self):
        work_data = {
            "position": "Software Engineer",
            "company": "Google",
            "start_date": "2020-01",
            "end_date": "2021-01",
        }

        url = reverse("work-experience")

        response = self.client.post(url, work_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        work = WorkExperience.objects.get(user_profile=self.user_profile)
        self.assertEqual(work.position, work_data["position"])
        self.assertEqual(work.company, work_data["company"])
        self.assertEqual(work.start_date, work_data["start_date"])
        self.assertEqual(work.end_date, work_data["end_date"])

    def test_add_wrong_date_format(self):
        work_data = {
            "position": "Software Engineer",
            "company": "Google",
            "start_date": "2020-01",
            "end_date": "2021-01-01",
        }

        url = reverse("work-experience")

        response = self.client.post(url, work_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(
            response.data["message"],
            ["Ensure this field has no more than 7 characters."],
        )

    def test_add_work_user_profile_required_fields(self):
        work_data = {
            "position": "Software Engineer",
            "company": "Google",
        }

        url = reverse("work-experience")

        response = self.client.post(url, work_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(
            response.data["message"],
            ["start_date field is required."],
        )

        work_data = {
            "company": "Google",
            "start_date": "2020-01",
        }

        response = self.client.post(url, work_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(
            response.data["message"],
            ["position field is required."],
        )

    def test_update_work_user_profile(self):
        work_data = {
            "position": "Software Engineer",
            "company": "Google",
            "start_date": "2020-01",
            "end_date": "2021-01",
        }

        url = reverse("work-experience")

        response = self.client.post(url, work_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        work = WorkExperience.objects.get(user_profile=self.user_profile)
        self.assertEqual(work.position, work_data["position"])
        self.assertEqual(work.company, work_data["company"])
        self.assertEqual(work.start_date, work_data["start_date"])
        self.assertEqual(work.end_date, work_data["end_date"])

        work_data = {
            "position": "Software Engineer",
            "company": "Google",
            "start_date": "2020-01",
            "end_date": "2021-01",
        }

        url = reverse("work-experience-detail", args=[work.id])

        response = self.client.put(url, work_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        work = WorkExperience.objects.get(user_profile=self.user_profile)
        self.assertEqual(work.position, work_data["position"])
        self.assertEqual(work.company, work_data["company"])
        self.assertEqual(work.start_date, work_data["start_date"])
        self.assertEqual(work.end_date, work_data["end_date"])

    def test_delete_work_user_profile(self):
        work_data = {
            "position": "Software Engineer",
            "company": "Google",
            "start_date": "2020-01",
            "end_date": "2021-01",
        }

        url = reverse("work-experience")

        response = self.client.post(url, work_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        work = WorkExperience.objects.get(user_profile=self.user_profile)
        self.assertEqual(work.position, work_data["position"])
        self.assertEqual(work.company, work_data["company"])
        self.assertEqual(work.start_date, work_data["start_date"])
        self.assertEqual(work.end_date, work_data["end_date"])

        url = reverse("work-experience-detail", args=[work.id])

        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        self.assertFalse(
            WorkExperience.objects.filter(user_profile=self.user_profile).exists()
        )

    def test_delete_not_owner(self):
        user = User.objects.create_user(username="test_user2", email="test@gmail.com")
        user_profile = UserProfile.objects.create(user=user)
        work_data = {
            "user_profile": user_profile,
            "position": "Software Engineer",
            "company": "Google",
            "start_date": "2020-01",
            "end_date": "2021-01",
        }

        work = WorkExperience.objects.create(**work_data)

        url = reverse("work-experience-detail", args=[work.id])

        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        expected_data = {"status": "fail", "message": ["Not found."]}
        self.assertEqual(expected_data, response.data)
        self.assertTrue(
            WorkExperience.objects.filter(user_profile=user_profile).exists()
        )

    def test_update_not_owner(self):
        user = User.objects.create_user(username="test_user2", email="test@gmail.com")
        user_profile = UserProfile.objects.create(user=user)
        work_data = {
            "position": "Software Engineer",
            "company": "Google",
            "start_date": "2020-01",
            "end_date": "2021-01",
        }

        work = WorkExperience.objects.create(**work_data,user_profile=user_profile)

        url = reverse("work-experience-detail", args=[work.id])

        response = self.client.put(url, work_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        expected_data = {"status": "fail", "message": ["Not found."]}
        self.assertEqual(expected_data, response.data)

