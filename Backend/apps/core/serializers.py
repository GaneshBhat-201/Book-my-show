from rest_framework import serializers

from apps.core.models import City, Genre, Language


class GenreSerializer(serializers.ModelSerializer):
    """
    Serializer for genre for validating name
    """

    class Meta:
        model = Genre
        fields = ["name"]


class LanguageSerializer(serializers.ModelSerializer):
    """
    Serializer for language for validating name
    """

    class Meta:
        model = Language
        fields = ["name"]


class CitySerializer(serializers.ModelSerializer):
    """
    Serializer for city for validating name
    """

    class Meta:
        model = City
        fields = ["name"]
