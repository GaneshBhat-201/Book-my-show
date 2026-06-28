from rest_framework import serializers

from apps.slot.models import Slot, SlotSeat


class SlotSerializer(serializers.ModelSerializer):
    """
    Serializere for slots of movie and theaters
    """

    language = serializers.CharField(source="language.name", read_only=True)

    class Meta:
        model = Slot
        fields = ["id", "start_time", "end_time", "language"]


class SlotSeatSerializer(serializers.ModelSerializer):
    """
    Serializer for SlotSeat model
    """

    row = serializers.SerializerMethodField()
    seat = serializers.SerializerMethodField()

    class Meta:
        model = SlotSeat
        fields = ["id", "row", "seat", "status", "price"]

    def get_row(self, obj):
        return obj.seat.row_number

    def get_seat(self, obj):
        return obj.seat.seat_number


class SlotDetailSerializer(serializers.ModelSerializer):
    """
    Serializer for slot model
    """

    theater = serializers.CharField(source="theater.name", read_only=True)
    movie = serializers.CharField(source="movie.title", read_only=True)
    date = serializers.SerializerMethodField()
    time = serializers.SerializerMethodField()
    language = serializers.CharField(source="language.name", read_only=True)
    slot_seats = SlotSeatSerializer(many=True, read_only=True)

    class Meta:
        model = Slot
        fields = ["id", "theater", "movie", "date", "time", "language", "slot_seats"]

    def get_date(self, obj):
        return obj.start_time.date()

    def get_time(self, obj):
        return obj.start_time.strftime("%H:%M")
