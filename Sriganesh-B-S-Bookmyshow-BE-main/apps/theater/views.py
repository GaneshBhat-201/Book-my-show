from rest_framework import generics, permissions

from apps.theater.filters import TheaterFilter
from apps.theater.models import Theater
from apps.theater.serializers import TheaterSerializer


class TheaterListView(generics.ListAPIView):
    """
    Theater list API view

    GET:
        Returns paginated list of theater

    Filtering:
        Uses django-filter backend
    """

    queryset = Theater.objects.all()
    serializer_class = TheaterSerializer
    permission_classes = [permissions.AllowAny]

    filterset_class = TheaterFilter


class TheaterDetailView(generics.RetrieveAPIView):
    """
    Theater retrieve API view

    GET:
        Returns detailed information of a single theater
    """

    queryset = Theater.objects.all()
    serializer_class = TheaterSerializer
    permission_classes = [permissions.AllowAny]
