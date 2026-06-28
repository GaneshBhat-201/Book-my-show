from django.db.models import Prefetch
from django.utils import timezone
from django.utils.dateparse import parse_date
from rest_framework import generics, permissions

from apps.slot.models import Slot
from apps.theater.filters import TheaterFilter
from apps.theater.models import Theater
from apps.theater.serializers import TheaterRetreiveSerializer, TheaterSerializer


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
    serializer_class = TheaterRetreiveSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        date_param = self.request.query_params.get("date")

        if date_param:
            date = parse_date(date_param)

            if date < timezone.now().date():
                slot_qs = Slot.objects.none()
            else:
                slot_qs = Slot.objects.filter(start_time__date=date)

            return Theater.objects.prefetch_related(Prefetch("slots", queryset=slot_qs))

        return Theater.objects.prefetch_related("slots")
