import django_filters

from apps.movie.models import Movie
from apps.core.filters import NumberInFilter


class MovieFilter(django_filters.FilterSet):
    """
    Provides filtering capabilities for movie list API.
    Supported filters:
        -genre
        -language
    """

    genre = NumberInFilter(field_name="genre", lookup_expr="in")
    language = NumberInFilter(field_name="language", lookup_expr="in")

    class Meta:
        model = Movie
        fields = ["genre", "language"]
