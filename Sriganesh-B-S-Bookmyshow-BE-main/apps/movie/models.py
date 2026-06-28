from django.db import models

from apps.core.models import Genre, Language, TimeStampedModel


class Movie(TimeStampedModel):
    title = models.CharField(max_length=50, unique=True)
    description = models.TextField()
    duration = models.DurationField()
    release_date = models.DateField()
    genre = models.ManyToManyField(Genre)
    language = models.ManyToManyField(Language)
    poster = models.ImageField(upload_to="./movies")
