from django.urls import path

from apps.slot.views import SlotRetrieve

urlpatterns = [
    path("<int:pk>/", SlotRetrieve.as_view(), name="slot"),
]
