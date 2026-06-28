from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from apps.theater.models import Theater
from apps.core.models import City

class TheaterAPITest(APITestCase):
    
    def setUp(self):
        self.city = City.objects.create(name="Banglore")

        self.theater = Theater.objects.create(
            name = "Inox",
            rows=10,
            seats_per_row = 10,
            city = self.city
        )

        self.theater_list_url = reverse("theater-list")
        self.theater_retrieve_url = reverse("theater-details",args=[self.theater.id])


    def test_theater_list(self):
        response = self.client.get(self.theater_list_url)
        self.assertEqual(response.status_code,status.HTTP_200_OK)
        self.assertEqual(len(response.data["results"]),1)
        self.assertEqual(response.data["results"][0]["name"],"Inox")

    def test_theater_retrieve(self):
        response = self.client.get(self.theater_retrieve_url)
        self.assertEqual(response.status_code,status.HTTP_200_OK)
        self.assertEqual(response.data["name"],"Inox")
        self.assertIn("city",response.data)
        
    def test_theater_city_filter(self):
        response = self.client.get(self.theater_list_url,{"city":self.city.id})
        self.assertEqual(response.status_code,status.HTTP_200_OK)
        self.assertEqual(len(response.data["results"]),1)
        self.assertEqual(response.data["results"][0]["city"],"Banglore")
