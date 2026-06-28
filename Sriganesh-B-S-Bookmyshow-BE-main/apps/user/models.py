"""
This module defines the custom User model used for authentication and
authorization in the application
"""

from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from phonenumber_field.modelfields import PhoneNumberField

from apps.core import constants as core_constants
from apps.core.models import TimeStampedModel
from apps.user.enums import Gender, Role


class UserManager(BaseUserManager):
    """
    Custom user manager that handles creation of normal and superuses
    """

    def create_user(self, email, name, gender, date_of_birth, password=None, role=Role.NORMAL):
        """
        Creates and returns a regular user with the given email and password

        Returns:
            User: saved user instance
        """

        user = self.model(
            email=self.normalize_email(email),
            role=role,
            name=name,
            gender=gender,
            date_of_birth=date_of_birth,
        )

        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, name, gender, date_of_birth, password=None):
        """
        Creates and returns a superuser(admin)

        Returns:
            User: saved admin instance
        """

        user = self.create_user(email, name, gender, date_of_birth, password, role=Role.ADMIN)
        user.is_staff = True
        user.is_superuser = True
        user.save()

        return user


class User(AbstractBaseUser, TimeStampedModel, PermissionsMixin):
    """
    Custom user model that replaces Django's default user model

    Features:
        -Email based authentication
        -Role based access control
    """

    email = models.EmailField(unique=True)
    role = models.CharField(choices=Role.choices, default=Role.NORMAL)
    phone_number = PhoneNumberField(null=True)
    name = models.CharField(max_length=core_constants.NAME_MAX_LENGTH)
    gender = models.CharField(choices=Gender.choices)
    date_of_birth = models.DateField()
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["name", "gender", "date_of_birth"]

    objects = UserManager()

    def __str__(self):
        return self.email
