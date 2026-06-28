from rest_framework import serializers

from apps.core.serializers import GenreSerializer, LanguageSerializer
from apps.movie.models import Movie


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

    genre = GenreSerializer(many=True, read_only=True)
    language = LanguageSerializer(many=True, read_only=True)

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
