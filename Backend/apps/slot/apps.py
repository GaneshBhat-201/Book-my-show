from django.apps import AppConfig


class SlotConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "apps.slot"

    def ready(self):
        import apps.slot.signals
