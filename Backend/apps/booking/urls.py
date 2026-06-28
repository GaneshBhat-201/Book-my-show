from django.urls import path

from apps.booking.views import BookingCancelView, BookingView

urlpatterns = [
    path("", BookingView.as_view({"get": "list", "post": "create"}), name="bookings"),
    path("<int:pk>/", BookingCancelView.as_view(), name="booking-cancel"),
]
