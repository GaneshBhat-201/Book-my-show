from django.db import models

from apps.booking.enums import Status
from apps.core import constants as core_constants
from apps.core.models import TimeStampedModel
from apps.slot.models import Slot, SlotSeat
from apps.user.models import User


class Booking(TimeStampedModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="bookings")
    slot = models.ForeignKey(Slot, on_delete=models.CASCADE, related_name="bookings")
    status = models.CharField(max_length=core_constants.NAME_MAX_LENGTH, choices=Status.choices)
    amount = models.DecimalField(
        max_digits=core_constants.PRICE_MAX_DIGIT, decimal_places=core_constants.PRICE_DECIMAL_PLACE
    )


class Ticket(TimeStampedModel):
    booking = models.ForeignKey(Booking, on_delete=models.CASCADE, related_name="tickets")
    seat = models.ForeignKey(SlotSeat, on_delete=models.CASCADE, related_name="tickets")
