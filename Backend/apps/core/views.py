from rest_framework import generics, permissions

from apps.core.models import Genre, Language
from apps.core.serializers import GenreSerializer, LanguageSerializer


class GenreView(generics.ListAPIView):
    """
    Genre list API view which returns all genre
    """

    queryset = Genre.objects.all()
    serializer_class = GenreSerializer
    permission_classes = [permissions.AllowAny]


class LanguageView(generics.ListAPIView):
    """
    Language list API view which returns all language
    """

    queryset = Language.objects.all()
    serializer_class = LanguageSerializer
    permission_classes = [permissions.AllowAny]
