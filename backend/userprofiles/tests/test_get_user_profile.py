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
            "profile_picture": "google.com",
            "user": cls.user,
            "description": "test description",
            "mobile_number": "1234567890",
            "country": cls.country,
            "gender": "M",
            "birth_date": "2000-01-01",
        }
        cls.user_profile = UserProfile.objects.create(**cls.user_profile_data)
        cls.token = str(AccessToken.for_user(cls.user))
        cls.maxDiff = None

    def setUp(self):
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.token}")
        self.url = reverse("user-profile")

    def test_get_user_profile_success(self):
        work = WorkExperience.objects.create(
            user_profile=self.user_profile,
            position="Software Engineer",
            company="Google",
            start_date="2019-01",
            end_date="2021-01",
        )

        institution = Institution.objects.get(id=1)
        education = Education.objects.create(
            user_profile=self.user_profile,
            degree="Bsc Hons in Computer Science",
            institution=institution,
            start_date="2015-01",
            end_date="2019-01",
        )

        expected_data = {
            "status": "success",
            "data": {
                "id": self.user_profile.id,
                "profile_picture": self.user_profile.profile_picture,
                "description": self.user_profile.description,
                "birth_date": str(self.user_profile.birth_date),
                "mobile_number": self.user_profile.mobile_number,
                "gender": self.user_profile.get_gender_display(),
                "user": self.user_profile.user.id,
                "country": self.country.label,
                "full_name": f"{self.user_profile.user.first_name} {self.user_profile.user.last_name}",
                "email": self.user_profile.user.email,
                "username": self.user_profile.user.username,
                "user_role": (
                    self.user_profile.user.groups.first().name
                    if self.user_profile.user.groups.exists()
                    else None
                ),
                "educations": [
                    {
                        "id": education.id,
                        "start_date": str(education.start_date),
                        "end_date": str(education.end_date),
                        "institution": education.institution.label,
                        "degree": "Bsc Hons in Computer Science",
                    }
                    for education in self.user_profile.education_set.all()
                ],
                "work_experiences": [
                    {
                        "id": work.id,
                        "company": work.company,
                        "position": work.position,
                        "start_date": str(work.start_date),
                        "end_date": str(work.end_date),
                    }
                    for work in self.user_profile.workexperience_set.all()
                ],
            },
        }

        response = self.client.get(self.url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(expected_data, response.data)
