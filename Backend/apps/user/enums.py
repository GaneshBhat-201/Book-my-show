from django.db import models


class Role(models.TextChoices):
    ADMIN = "admin", "Admin"
    NORMAL = "normal", "Normal"


class Gender(models.TextChoices):
    MALE = "male", "Male"
    FEMALE = "female", "Female"
    OTHERS = "others", "Others"
