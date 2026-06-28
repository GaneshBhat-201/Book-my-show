"""
This module contains serializer classes responsible for:
    -Validating incoming request data
    -Converting JSON to Python objects
    -Creating and authenticating users
"""

from django.contrib.auth.password_validation import validate_password
from django.utils import timezone
from phonenumber_field.serializerfields import PhoneNumberField
from rest_framework import serializers

from apps.user.enums import Gender
from apps.user.models import User


class RegisterSerializer(serializers.ModelSerializer):
    """
    Serializer for user registration.

    Handles:
        - Input validation
        - Password validation using Django's default validators
        - Secure user creation
    """

    password = serializers.CharField(write_only=True)
    name = serializers.CharField(required=True)
    gender = serializers.ChoiceField(choices=Gender.choices, required=True)
    date_of_birth = serializers.DateField(required=True)

    class Meta:
        model = User
        fields = ["email", "password", "name", "gender", "date_of_birth"]

    def validate_password(self, password):
        """
        Applies Django's built-in password validators.

        Args:
            password (str): Plain text password.

        Returns:
            str: Validated password.

        Raises:
            ValidationError: If password does not meet security requirements.
        """
        validate_password(password)
        return password

    def validate_date_of_birth(self, dob):
        """
        Validates if date of birth is in past or not
        """
        if dob >= timezone.now().date():
            raise serializers.ValidationError("Date of birth must be in past")
        return dob

    def create(self, validated_data):
        """
        Creates and returns a new user using the custom user manager.

        Args:
            validated_data (dict): Validated input data.

        Returns:
            User: Newly created user instance.
        """

        return User.objects.create_user(**validated_data)


class LoginSerializer(serializers.Serializer):
    """
    Serializer for user Login.
    Used for:
        - Validating login credentials
        - Authenticating user
    """

    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)


class ProfileSerializer(serializers.ModelSerializer):
    """
    Serializer for user profile
    Used for:
        -Validating user profile
        -Updating the profile
    """

    phone_number = PhoneNumberField(required=True)

    class Meta:
        model = User
        fields = ["email", "name", "gender", "date_of_birth", "phone_number"]
        read_only_fields = ["email"]
