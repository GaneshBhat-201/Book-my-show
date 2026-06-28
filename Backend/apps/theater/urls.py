from django.urls import path

from apps.theater.views import TheaterDetailView, TheaterListView

urlpatterns = [
    path("", TheaterListView.as_view(), name="theater-list"),
    path("<int:pk>/", TheaterDetailView.as_view(), name="theater-details"),
]
