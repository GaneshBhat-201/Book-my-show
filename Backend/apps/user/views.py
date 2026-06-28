"""
This module contains API view for :
    -user registration (signup)

It uses Django REST Framework generic views
"""

from django.contrib.auth import authenticate
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from apps.core import constants as core_constants
from apps.user.serializers import LoginSerializer, ProfileSerializer, RegisterSerializer


class RegisterView(generics.CreateAPIView):
    """
    API endpoint for user registration

    Allows any user to create an account
    Automatically:
        -validates input
        -creates user
        -returns response
    """

    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]


class LoginView(generics.GenericAPIView):
    """
    API endpoint for user login

    Validates credentials and returns JWT access and refresh tokens
    """

    serializer_class = LoginSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        """
        Authenticates user and generates JWT tokens.

        Args:
            request: HTTP request containing login credentials.

        Returns:
            Response: JWT access and refresh tokens
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = authenticate(
            email=serializer.validated_data["email"], password=serializer.validated_data["password"]
        )

        if user is None:
            return Response(
                {"error": core_constants.ERROR_MESSAGE["LOGIN_ERROR"]},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        refresh = RefreshToken.for_user(user)

        response = Response(
            {
                "access": str(refresh.access_token),
            },
            status=status.HTTP_200_OK
        )

        response.set_cookie(
            key="refresh_token",
            value=str(refresh),
            httponly=True,
            secure=True,
            samesite="Lax",
            max_age=24*60*60
        )

        return response


class ProfileView(generics.RetrieveUpdateAPIView):
    """
    API end point for profile

    Validates user profile and allows GET, PATCH and PUT  request for updating user profile
    """

    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        """
        This function returns instance on which updation should happen which is internally
        used by generics.
        """

        return self.request.user

class LogoutView(generics.GenericAPIView):
    permission_classes=[permissions.IsAuthenticated]

    def post(self,request):
        refresh_token = request.COOKIES.get("refresh_token")

        if refresh_token is None:
            return Response(
                {"error":"Refresh token not found"},
                status=status.HTTP_400_BAD_REQUEST
            )
    
        try:
            token = RefreshToken(refresh_token)
            print(token)
            token.blacklist

        except Exception:
            return Response(
                {"error":"Invalid Token"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        response = Response(
            {"message":"Logout Successful"},
            status=status.HTTP_205_RESET_CONTENT
        )

        response.delete_cookie("refresh_token")

        return response
