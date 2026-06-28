from django.db import models

from apps.core.models import City, TimeStampedModel
from apps.theater import constants as theater_constants


class Theater(TimeStampedModel):
    name = models.CharField(max_length=theater_constants.THEATER_NAME_MAX_LENGTH)
    city = models.ForeignKey(City, on_delete=models.CASCADE, related_name="theaters")
    state = models.CharField(null=True)
    rows = models.PositiveIntegerField()
    seats_per_row = models.PositiveIntegerField()

    def __str__(self):
        return self.name


class Seat(TimeStampedModel):
    theater = models.ForeignKey(Theater, on_delete=models.CASCADE, related_name="seats")
    row_number = models.PositiveIntegerField()
    seat_number = models.PositiveIntegerField()
    is_available = models.BooleanField(default=True)

    class Meta:
        unique_together = ["theater", "row_number", "seat_number"]

    def __str__(self):
        return f"${self.theater.name} - ${self.row_number}row ${self.seat_number}seat"
