from django.db.models.signals import post_save
from django.dispatch import receiver

from apps.theater.models import Seat, Theater


@receiver(post_save, sender=Theater)
def create_seats(sender, instance, created, **kwargs):
    """
    Creates seats when new theater model is saved to DB based on
    row numbers and seats per row of that theater
    """
    if created:
        seats = [
            Seat(theater=instance, row_number=row, seat_number=seat)
            for row in range(1, instance.rows + 1)
            for seat in range(1, instance.seats_per_row + 1)
        ]

        Seat.objects.bulk_create(seats)
