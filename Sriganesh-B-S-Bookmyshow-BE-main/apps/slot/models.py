from django.db import models

from apps.core import constants as core_constants
from apps.core.models import TimeStampedModel
from apps.movie.models import Movie
from apps.theater.models import Theater


class Slot(TimeStampedModel):
    theater = models.ForeignKey(Theater, on_delete=models.CASCADE, related_name="slots")
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE, related_name="slots")
    price = models.DecimalField(max_digits=core_constants.SLOT_PRICE_MAX_DIGIT, decimal_places=2)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField(editable=False)

    def save(self, *args, **kwargs):
        duration = self.movie.duration
        self.end_time = self.start_time + duration
        return super().save(*args, **kwargs)
