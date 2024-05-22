from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from userprofiles.models import Interest, Country


class GetInitialDataFromDBTest(APITestCase):

    def test_get_interests(self):
        interests = Interest.objects.all()

        url = reverse("interests-list")

        response = self.client.get(url)
        response_data = response.data["data"]
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(interests), len(response_data["interests"]))

    # def test_get_countries(self):
    #     countries = Country.objects.all()
    #     url = reverse("countries-list")

    #     response = self.client.get(url)
    #     response_data = response.data["data"]
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)
    #     self.assertEqual(len(countries), len(response_data["countries"]))
