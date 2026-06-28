from django.db.models import Prefetch
from django.utils import timezone
from django.utils.dateparse import parse_date
from rest_framework import generics, permissions

from apps.movie.filters import MovieFilter
from apps.movie.models import Movie
from apps.movie.paginations import MovieListPagination
from apps.movie.serializers import MovieListSerializer, MovieRetreiveSerializer
from apps.slot.models import Slot


class MovieListView(generics.ListAPIView):
    """
    Movie list API view

    GET:
        Returns paginated list of movies

    Filtering:
        Uses django-filter backend
    """

    queryset = Movie.objects.prefetch_related("slots").distinct()
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
        Returns detailed information of a single movie with associated slots
    """

    queryset = Movie.objects.prefetch_related("genre", "language", "slots__theater").all()
    serializer_class = MovieRetreiveSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        date_param = self.request.query_params.get("date")

        if date_param:
            date = parse_date(date_param)

            if date < timezone.now().date():
                slot_qs = Slot.objects.none()
            else:
                slot_qs = Slot.objects.filter(start_time__date=date)

            return Movie.objects.prefetch_related(Prefetch("slots", queryset=slot_qs))

        return Movie.objects.prefetch_related("slots")
