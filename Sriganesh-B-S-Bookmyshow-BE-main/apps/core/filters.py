import django_filters


class NumberInFilter(django_filters.BaseInFilter, django_filters.NumberFilter):
    """
    Custom filter that enables filtering using comma-separated integer values.
    """

    pass
