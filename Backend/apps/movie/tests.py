from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from apps.movie.models import Movie
from apps.core.models import Genre,Language
from datetime import timedelta,date

class MovieAPITest(APITestCase):
    
    def setUp(self):
        self.genre1 = Genre.objects.create(name="drama")
        self.lang1 = Language.objects.create(name = "english")

        self.movie = Movie.objects.create(
            title = "Interstellar",
            description = "Direct by CN",
            duration = timedelta(hours=2),
            release_date = "2026-03-03",
        )
        self.movie.genre.add(self.genre1)
        self.movie.language.add(self.lang1)

        self.movie_list_url = reverse("movie-list")
        self.movie_retrieve_url = reverse("movie-retrieve",args=[self.movie.id])


    def test_movie_list(self):
        response = self.client.get(self.movie_list_url)
        self.assertEqual(response.status_code,status.HTTP_200_OK)
        self.assertEqual(len(response.data["results"]),1)
        self.assertEqual(response.data["results"][0]["title"],"Interstellar")

    def test_movie_retrieve(self):
        response = self.client.get(self.movie_retrieve_url)
        self.assertEqual(response.status_code,status.HTTP_200_OK)
        self.assertEqual(response.data["title"],"Interstellar")
        self.assertIn("slots",response.data)
        
    def test_movie_genre_filter(self):
        response = self.client.get(self.movie_list_url,{"genre":self.genre1.id})
        self.assertEqual(response.status_code,status.HTTP_200_OK)
        self.assertEqual(len(response.data["results"]),1)
        self.assertEqual(response.data["results"][0]["title"],"Interstellar")

    def test_movie_language_filter(self):
        response = self.client.get(self.movie_list_url,{"language":3})
        self.assertEqual(response.status_code,status.HTTP_200_OK)
        self.assertEqual(len(response.data["results"]),0)