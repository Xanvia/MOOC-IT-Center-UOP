from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User, Group
from userprofiles.models import (
    UserProfile,
    Country,
    Institution,
    Education,
)
from rest_framework_simplejwt.tokens import AccessToken
from collections import OrderedDict
from .set_permissons import assign_permission_to_group


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
        assign_permission_to_group(cls.group, Education, "change_education")
        assign_permission_to_group(cls.group, Education, "delete_education")
        assign_permission_to_group(cls.group, Education, "add_education")
        assign_permission_to_group(cls.group, Institution, "change_institution")
        assign_permission_to_group(cls.group, Institution, "add_institution")
        cls.token = str(AccessToken.for_user(cls.user))
        cls.maxDiff = None

    def setUp(self):
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.token}")

    def test_add_edu_user_profile(self):

        edu_data = {
            "institution": "Google",
            "degree": "Google",
            "start_date": "2020-01",
            "end_date": "2021-01",
        }

        url = reverse("education")

        response = self.client.post(url, edu_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        education = Education.objects.get(user_profile=self.user_profile)
        self.assertEqual(education.institution.label, edu_data["institution"])
        self.assertEqual(education.degree, edu_data["degree"])
        self.assertEqual(education.start_date, edu_data["start_date"])
        self.assertEqual(education.end_date, edu_data["end_date"])

    def test_update_edu_user_profile(self):
        work_data = {
            "institution": "Google2",
            "degree": "Google",
            "start_date": "2020-01",
            "end_date": "2021-01",
        }

        url = reverse("education")

        response = self.client.post(url, work_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        edu = Education.objects.get(user_profile=self.user_profile)
        self.assertEqual(edu.institution.label, work_data["institution"])
        self.assertEqual(edu.degree, work_data["degree"])
        self.assertEqual(edu.start_date, work_data["start_date"])
        self.assertEqual(edu.end_date, work_data["end_date"])

        work_data = {
            "institution": "Google2",
            "degree": "Google",
            "start_date": "2020-01",
            "end_date": "2021-01",
        }

        url = reverse("education-detail", args=[edu.id])

        response = self.client.put(url, work_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        work = Education.objects.get(user_profile=self.user_profile)
        self.assertEqual(work.institution.label, work_data["institution"])
        self.assertEqual(work.degree, work_data["degree"])
        self.assertEqual(work.start_date, work_data["start_date"])
        self.assertEqual(work.end_date, work_data["end_date"])

    def test_delete_work_user_profile(self):
        work_data = {
            "institution": "ABC",
            "degree": "Google",
            "start_date": "2020-01",
            "end_date": "2021-01",
        }

        url = reverse("education")

        response = self.client.post(url, work_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        work = Education.objects.get(user_profile=self.user_profile)
        self.assertEqual(work.institution.label, work_data["institution"])
        self.assertEqual(work.degree, work_data["degree"])
        self.assertEqual(work.start_date, work_data["start_date"])
        self.assertEqual(work.end_date, work_data["end_date"])

        url = reverse("education-detail", args=[work.id])

        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        self.assertFalse(
            Education.objects.filter(user_profile=self.user_profile).exists()
        )

    def test_delete_not_owner(self):
        user = User.objects.create_user(username="test_user2", email="test@gmail.com")
        user_profile = UserProfile.objects.create(user=user)
        
        institution = Institution.objects.create(label="Google")

        work_data = {
            "user_profile": user_profile,
            "institution": institution,
            "degree": "Google",
            "start_date": "2020-01",
            "end_date": "2021-01",
        }

        work = Education.objects.create(**work_data)

        url = reverse("education-detail", args=[work.id])

        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        expected_data = {"status": "fail", "message": ["Not found."]}
        self.assertEqual(expected_data, response.data)
        self.assertTrue(Education.objects.filter(user_profile=user_profile).exists())

    def test_update_not_owner(self):
        user = User.objects.create_user(username="test_user2", email="test@gmail.com")
        user_profile = UserProfile.objects.create(user=user)

        institution = Institution.objects.create(label="Google")

        work_data = {
            "institution": institution,
            "degree": "Google",
            "start_date": "2020-01",
            "end_date": "2021-01",
        }

        updated_data = {
            "institution": "new",
            "degree": "Google",
            "start_date": "2020-01",
            "end_date": "2021-01",
        }

        work = Education.objects.create(**work_data, user_profile=user_profile)

        url = reverse("education-detail", args=[work.id])

        response = self.client.put(url, updated_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        expected_data = {"status": "fail", "message": ["Not found."]}
        self.assertEqual(expected_data, response.data)
