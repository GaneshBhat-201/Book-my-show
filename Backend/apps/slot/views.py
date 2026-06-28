from django.db.models import Prefetch
from rest_framework import generics, permissions

from apps.slot.models import Slot, SlotSeat
from apps.slot.serializers import SlotDetailSerializer


class SlotRetrieve(generics.RetrieveAPIView):
    """
    API for retrieving a particular slot
    """

    queryset = Slot.objects.select_related("movie", "theater").prefetch_related(
        Prefetch(
            "slot_seats",
            queryset=SlotSeat.objects.all().order_by("seat__row_number", "seat__seat_number"),
        )
    )
    serializer_class = SlotDetailSerializer
    permission_classes = [permissions.AllowAny]
