from django.db import models


class Status(models.TextChoices):
    AVAILABLE = "available", "Available"
    BOOKED = "booked", "Bokked"
    LOCKED = "locked", "Locked"
