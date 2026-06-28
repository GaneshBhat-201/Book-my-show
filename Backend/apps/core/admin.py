from django.contrib import admin

from apps.core.models import City, Genre, Language

admin.site.register(Genre)
admin.site.register(Language)
admin.site.register(City)
