from django.urls import path

from apps.core.views import GenreView, LanguageView

urlpatterns = [
    path("language/", LanguageView.as_view(), name="language-list"),
    path("genre/", GenreView.as_view(), name="genre-list"),
]
