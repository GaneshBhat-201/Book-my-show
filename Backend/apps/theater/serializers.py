from collections import defaultdict

from rest_framework import serializers

from apps.slot.serializers import SlotSerializer
from apps.theater.models import Seat, Theater


class TheaterSerializer(serializers.ModelSerializer):
    """
    Serializer for theater model
    """

    city = serializers.CharField(source="city.name", read_only=True)

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


class TheaterRetreiveSerializer(serializers.ModelSerializer):
    """
    Serializer for theater detail with associated slots
    """

    slots = serializers.SerializerMethodField()
    city = serializers.CharField(source="city.name", read_only=True)

    class Meta:
        model = Theater
        fields = ["id", "name", "city", "state", "rows", "seats_per_row", "slots"]

    def get_slots(self, obj):
        group = defaultdict(list)

        for slot in obj.slots.all():
            movie_name = slot.movie.title
            group[movie_name].append(SlotSerializer(slot).data)

        return group
