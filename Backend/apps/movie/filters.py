import django_filters

from apps.core.filters import NumberInFilter
from apps.movie.models import Movie


class MovieFilter(django_filters.FilterSet):
    """
    Provides filtering capabilities for movie list API.
    Supported filters:
        -genre
        -language
    """

    genre = NumberInFilter(field_name="genre", lookup_expr="in")
    language = NumberInFilter(field_name="language", lookup_expr="in")
    theater = NumberInFilter(field_name="slots__theater_id", lookup_expr="in")
    date = django_filters.DateFilter(field_name="slots__start_time__date")

    class Meta:
        model = Movie
        fields = ["genre", "language", "theater", "date"]
