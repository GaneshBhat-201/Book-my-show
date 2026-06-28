from collections import defaultdict

from rest_framework import serializers

from apps.movie.models import Movie
from apps.slot.serializers import SlotSerializer


class MovieListSerializer(serializers.ModelSerializer):
    """
    Serializes and deserializes movie data model

    Fields: title, description, duration, poster
    """

    class Meta:
        model = Movie
        fields = ["id", "title", "description", "duration", "poster"]
        read_only_fields = ["id"]


class MovieSerializer(serializers.ModelSerializer):
    """
    Serializes and deserializes movie data model

    Fields: all
    """

    genre = serializers.SlugRelatedField(many=True, read_only=True, slug_field="name")
    language = serializers.SlugRelatedField(many=True, read_only=True, slug_field="name")

    class Meta:
        model = Movie
        fields = [
            "id",
            "title",
            "description",
            "duration",
            "genre",
            "language",
            "release_date",
            "poster",
        ]
        read_only_fields = ["id"]


class MovieRetreiveSerializer(serializers.ModelSerializer):
    """
    Serializer for movie and associated slots
    """

    slots = serializers.SerializerMethodField()
    genre = serializers.SlugRelatedField(many=True, read_only=True, slug_field="name")
    language = serializers.SlugRelatedField(many=True, read_only=True, slug_field="name")

    class Meta:
        model = Movie
        fields = [
            "id",
            "title",
            "description",
            "duration",
            "genre",
            "language",
            "release_date",
            "poster",
            "slots",
        ]
        read_only_fields = ["id"]

    def get_slots(self, obj):
        group = defaultdict(list)

        for slot in obj.slots.all():
            theater_name = slot.theater.name
            group[theater_name].append(SlotSerializer(slot).data)

        return group
