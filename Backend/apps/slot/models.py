from django.core.exceptions import ValidationError
from django.db import models
from django.utils import timezone

from apps.core import constants as core_constants
from apps.core.models import Language, TimeStampedModel
from apps.movie.models import Movie
from apps.slot.enums import Status
from apps.theater.models import Seat, Theater


class Slot(TimeStampedModel):
    theater = models.ForeignKey(Theater, on_delete=models.CASCADE, related_name="slots")
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE, related_name="slots")
    price = models.DecimalField(
        max_digits=core_constants.PRICE_MAX_DIGIT, decimal_places=core_constants.PRICE_DECIMAL_PLACE
    )
    language = models.ForeignKey(Language, on_delete=models.CASCADE, related_name="slots")
    start_time = models.DateTimeField()
    end_time = models.DateTimeField(editable=False)

    def save(self, *args, **kwargs):
        duration = self.movie.duration
        self.end_time = self.start_time + duration
        return super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.movie} at {self.theater} on {self.start_time.date()}"

    def clean(self):
        """
        Validates data before saving to DB
            - Slot start time should be before end time
            - Slot start time should be after movies release date
            - No overlapping slots are allowed
        """

        duration = self.movie.duration
        self.end_time = self.start_time + duration

        if self.movie and self.start_time.date() < self.movie.release_date:
            raise ValidationError(core_constants.ERROR_MESSAGE["SLOT_BEFORE_MOVIE_ERROR"])

        if (self.start_time.date() < timezone.now().date()) or (
            self.start_time.date() == timezone.now().date()
            and self.start_time.time() < timezone.now().time()
        ):
            raise ValidationError(core_constants.ERROR_MESSAGE["PAST_SLOT_ERROR"])

        overlapping_slots = Slot.objects.filter(
            theater=self.theater,
            start_time__lt=self.end_time,
            end_time__gt=self.start_time,
        ).exclude(pk=self.pk)

        if overlapping_slots.exists():
            raise ValidationError(core_constants.ERROR_MESSAGE["OVERLAPPING_ERROR"])

        super().clean()


class SlotSeat(TimeStampedModel):
    slot = models.ForeignKey(Slot, on_delete=models.CASCADE, related_name="slot_seats")
    seat = models.ForeignKey(Seat, on_delete=models.CASCADE, related_name="slot_seats")
    status = models.CharField(
        max_length=core_constants.NAME_MAX_LENGTH, choices=Status.choices, default=Status.AVAILABLE
    )
    price = models.DecimalField(
        max_digits=core_constants.PRICE_MAX_DIGIT, decimal_places=core_constants.PRICE_DECIMAL_PLACE
    )

    class Meta:
        unique_together = ["slot", "seat"]
