from rest_framework import generics, permissions

from apps.movie.filters import MovieFilter
from apps.movie.models import Movie
from apps.movie.paginations import MovieListPagination
from apps.movie.serializers import MovieListSerializer, MovieSerializer


class MovieListView(generics.ListAPIView):
    """
    Movie list API view

    GET:
        Returns paginated list of movies

    Filtering:
        Uses django-filter backend
    """

    queryset = Movie.objects.prefetch_related("genre", "language").all()
    serializer_class = MovieListSerializer
    permission_classes = [permissions.AllowAny]
    pagination_class = MovieListPagination

    ordering_fields = ["release_date"]
    ordering = ["-release_date"]
    filterset_class = MovieFilter


class MovieRetrieveView(generics.RetrieveAPIView):
    """
    Movie retrieve API view

    GET:
        Returns detailed information of a single movie
    """

    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    permission_classes = [permissions.AllowAny]
