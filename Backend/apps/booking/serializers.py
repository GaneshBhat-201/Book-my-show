from django.utils import timezone
from rest_framework import serializers
from django.db import transaction

from apps.booking.enums import Status as booking_status
from apps.booking.models import Booking, Ticket
from apps.slot.enums import Status as slot_status
from apps.slot.models import Slot, SlotSeat


class TicketSerializer(serializers.ModelSerializer):
    """
    Serializer for ticket model
    """

    row = serializers.IntegerField(source="seat.seat.row_number", read_only=True)
    seat = serializers.IntegerField(source="seat.seat.seat_number", read_only=True)

    class Meta:
        model = Ticket
        fields = ["row", "seat"]


class BookingCreateSerializer(serializers.Serializer):
    """
    Serializer for create booking
        -Validates data
        -Saves booking and updates slot seat status
    """

    slot = serializers.IntegerField()
    seats = serializers.ListField(child=serializers.IntegerField())

    def validate(self, data):
        slot_id = data["slot"]
        seat_ids = data["seats"]

        slot = Slot.objects.get(id=slot_id)

        if slot.start_time < timezone.now():
            raise serializers.ValidationError("Cannot book past slots")

        slot_seats = SlotSeat.objects.filter(
            slot_id=slot_id, status=slot_status.AVAILABLE, id__in=seat_ids
        )

        if slot_seats.count() != len(seat_ids):
            raise serializers.ValidationError("some seats are not available")

        data["slot_instance"] = slot
        data["slot_seats"] = slot_seats
        return data

    def create(self, validated_data):
        request = self.context["request"]
        slot = validated_data["slot_instance"]
        slot_seats = validated_data["slot_seats"]
        total_price = 0

        with transaction.atomic():

            seats = SlotSeat.objects.select_for_update().filter(
                id__in = slot_seats.values_list("id",flat=True)
            )

            for seat in seats:
                total_price += seat.price

            booking = Booking.objects.create(
                slot=slot, status=booking_status.CONFIRMED, user=request.user, amount=total_price
            )

            tickets = []

            for seat in seats:
                tickets.append(Ticket(booking=booking, seat=seat))

            Ticket.objects.bulk_create(tickets)
            seats.update(
                status = slot_status.BOOKED,
                updated_at = timezone.now()
            )
            return booking


class BookingListSerializer(serializers.ModelSerializer):
    """
    Serializer for booking model
    Handles:
        - serialization and deserialization of booking model
        - adds custom fields ticket count and status (read only)
    """

    poster = serializers.ImageField(source="slot.movie.poster", read_only=True)
    movie = serializers.CharField(source="slot.movie.title", read_only=True)
    theater = serializers.CharField(source="slot.theater.name", read_only=True)
    start_time = serializers.DateTimeField(source="slot.start_time", read_only=True)
    end_time = serializers.DateTimeField(source="slot.end_time", read_only=True)
    tickets_count = serializers.IntegerField(read_only=True)
    tickets = TicketSerializer(many=True, read_only=True)

    class Meta:
        model = Booking
        fields = [
            "id",
            "amount",
            "status",
            "poster",
            "movie",
            "theater",
            "start_time",
            "end_time",
            "tickets_count",
            "tickets",
        ]


class BookingCancelSerializer(serializers.Serializer):
    def validate(self, data):
        booking = self.context["booking"]

        if booking.status == booking_status.CANCELLED:
            raise serializers.ValidationError("Booking already cancelled")

        if booking.slot.start_time <= timezone.now():
            raise serializers.ValidationError("Movie already started or over. cannot cancel")

        return data
