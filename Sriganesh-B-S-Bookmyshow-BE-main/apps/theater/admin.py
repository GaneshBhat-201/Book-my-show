from django.contrib import admin

from apps.theater.models import Seat, Theater

admin.site.register(Theater)
admin.site.register(Seat)
