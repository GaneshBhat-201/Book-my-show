from django.db.models import Count
from rest_framework import generics, mixins, permissions, status, viewsets
from rest_framework.response import Response

from apps.booking.enums import Status as booking_status
from apps.booking.models import Booking
from apps.booking.serializers import (
    BookingCancelSerializer,
    BookingCreateSerializer,
    BookingListSerializer,
)
from apps.slot.enums import Status as slot_status
from apps.slot.models import SlotSeat


class BookingView(mixins.CreateModelMixin, mixins.ListModelMixin, viewsets.GenericViewSet):
    """
    API for booking seats
    """

    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return (
            Booking.objects.select_related("user", "slot__movie", "slot__theater")
            .order_by("-id")
            .annotate(tickets_count=Count("tickets"))
        )

    def get_serializer_class(self):
        if self.action == "create":
            return BookingCreateSerializer
        return BookingListSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, context={"request": request})
        serializer.is_valid(raise_exception=True)

        serializer.create(serializer.validated_data)

        return Response({"success": "Booked successfully"}, status=status.HTTP_201_CREATED)


class IsBookingOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.user == request.user


class BookingCancelView(generics.GenericAPIView):
    """
    API for cancelling the booking
    """

    permission_classes = [permissions.IsAuthenticated, IsBookingOwner]
    queryset = Booking.objects.select_related("slot")
    serializer_class = BookingCancelSerializer

    def delete(self, request, *args, **kwargs):
        """
        - User can cancel only their booking
        - Cannot cancel already cancelled booking
        - Cannot cancel past booking
        - Responsible for freeing seats that was booked
        """
        booking = self.get_object()

        serializer = self.get_serializer(data={}, context={"request": request, "booking": booking})
        serializer.is_valid(raise_exception=True)
        SlotSeat.objects.filter(tickets__booking=booking).update(status=slot_status.AVAILABLE)

        booking.status = booking_status.CANCELLED
        booking.save()

        return Response({"success": "Cancelled successfully"}, status=status.HTTP_200_OK)
