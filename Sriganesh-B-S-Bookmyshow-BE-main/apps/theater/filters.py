import django_filters

from apps.core.filters import NumberInFilter
from apps.theater.models import Theater


class TheaterFilter(django_filters.FilterSet):
    city = NumberInFilter(field_name="city", lookup_expr="in")

    class Meta:
        model = Theater
        fields = ["city"]
