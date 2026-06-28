from django.urls import path

from apps.movie.views import MovieListView, MovieRetrieveView

urlpatterns = [
    path("", MovieListView.as_view(), name="movie-list"),
    path("<int:pk>/", MovieRetrieveView.as_view(), name="movie-retrieve"),
]
