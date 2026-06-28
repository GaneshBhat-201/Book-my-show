from rest_framework import serializers

from apps.theater.models import Seat, Theater


class TheaterSerializer(serializers.ModelSerializer):
    """
    Serializer for theater model
    """

    class Meta:
        model = Theater
        fields = ["id", "name", "city", "state", "rows", "seats_per_row"]


class SeatSerializer(serializers.ModelSerializer):
    """
    Serializer for seat model
    """

    class Meta:
        model = Seat
        fields = ["id", "theater", "row_number", "seat_number", "is_available"]
