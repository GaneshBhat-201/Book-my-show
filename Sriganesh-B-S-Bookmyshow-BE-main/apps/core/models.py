from django.db import models

from apps.core import constants as core_constants


class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Genre(TimeStampedModel):
    name = models.CharField(max_length=core_constants.NAME_MAX_LENGTH, unique=True)

    def __str__(self):
        return self.name


class Language(TimeStampedModel):
    name = models.CharField(max_length=core_constants.NAME_MAX_LENGTH, unique=True)

    def __str__(self):
        return self.name


class City(TimeStampedModel):
    name = models.CharField(max_length=core_constants.NAME_MAX_LENGTH)

    def __str__(self):
        return self.name
