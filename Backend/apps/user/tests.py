from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from apps.user.models import User

class UserAPITest(APITestCase):

    def setUp(self):
        self.register_url=reverse('signup')
        self.login_url=reverse('login')
        self.profile_url=reverse('profile')

        self.user_data={
            "email":"test@gmail.com",
            "password":"Test@1234",
            "name": "Test",
            "gender":"male",
            "date_of_birth": "2004-06-06"
        }

        self.user = User.objects.create_user(
            email="existing@gmail.com",
            password = "Test@1234",
            name = "Test",
            gender = "male",
            date_of_birth = "2004-06-06"
        )

    def authenticate(self):
        response = self.client.post(self.login_url,
                                        {
                                            "email":"existing@gmail.com",
                                            "password":"Test@1234"
                                        },
                                        format='json'
                                    )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        token = response.data["access"]
        self.client.credentials(HTTP_AUTHORIZATION = "Bearer "+token)

    def test_user_registration_success(self):
        response = self.client.post(self.register_url, self.user_data,formar='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['email'],self.user_data['email'])

    def test_user_registration_duplicate_email(self):
        response = self.client.post(self.register_url, 
                                        {
                                            "email":"existing@gmail.com",
                                            "password":"Test@1234",
                                            "name": "Test",
                                            "gender":"male",
                                            "date_of_birth": "2004-06-06"
                                        },
                                        format='json'
                                    )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_login_success(self):
        response = self.client.post(self.login_url,
                                        {
                                            "email":"existing@gmail.com",
                                            "password":"Test@1234"
                                        },
                                        format='json'
                                    )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access",response.data)

    def test_login_invalid(self):
        response = self.client.post(self.login_url,
                                        {
                                            "email":"Nonexisting@gmail.com",
                                            "password":"Test@1234"
                                        },
                                        format='json'
                                    )
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_profile_success(self):
        self.authenticate()
        response = self.client.get(self.profile_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['email'],"existing@gmail.com")

    def test_get_profile_without_authentication(self):
        response = self.client.get(self.profile_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_patch_profile_success(self):
        self.authenticate()
        response = self.client.patch(self.profile_url,{"name":"Ganesh"})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["name"],"Ganesh")

    def test_patch_profile_without_authentication(self):
        response = self.client.patch(self.profile_url,{"name":"Ganesh"})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
