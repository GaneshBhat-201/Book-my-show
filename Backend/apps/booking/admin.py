from django.contrib import admin

from apps.booking.models import Booking, Ticket

admin.site.register(Booking)
admin.site.register(Ticket)
