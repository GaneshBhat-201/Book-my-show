from django.db.models.signals import post_save
from django.dispatch import receiver

from apps.slot.enums import Status
from apps.slot.models import Slot, SlotSeat
from apps.theater.models import Seat


@receiver(post_save, sender=Slot)
def create_slot_seats(sender, instance, created, **kwargs):
    """
    Creates slot seats when new slot model is saved to DB
    """
    if created:
        seats = Seat.objects.filter(theater=instance.theater)
        slot_seats = [
            SlotSeat(slot=instance, seat=seat, status=Status.AVAILABLE, price=instance.price)
            for seat in seats
        ]

        SlotSeat.objects.bulk_create(slot_seats)
