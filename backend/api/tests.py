from django.test import TestCase
from django.test.client import RequestFactory
from django.contrib.auth import get_user_model
from django.urls import reverse
from django.core.exceptions import ObjectDoesNotExist

from rest_framework.test import APIClient
from rest_framework.authtoken.models import Token


from .views import Login, LogOut
from main.models import Chat

# -----------
# MODEL TESTS
# -----------

class ChatModelTest(TestCase):

    def setUp(self):
        User = get_user_model()

        self.user1 = User.objects.create_user(
            email='user1@gmail.com',
            name='User1',
            password='A!jTes@12'
        )
        self.user2 = User.objects.create_user(
            email='user2@gmail.com',
            name='User2',
            password='A!jTes@12'
        )

        self.chat = Chat()
        self.chat.save()

        self.chat.add(self.user1, self.user2)


# -----------
# API TESTS
# -----------


"""
/api/v1/signup (POST)
"""
class SignUpTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = get_user_model()
        self.resp_register = self.client.post(
            reverse('api:signup'),
            {
                'email': 'test@gmail.com',
                'name': 'Test Hello',
                'password': 'A!jTes@12',
                'password2': 'A!jTes@12'
            },
            format='json'
        )


class TestSignUpPOSTRequest(SignUpTest):
    def test_return_status_code_201_if_successful(self):
        expected = 201

        result = self.resp_register.status_code

        self.assertEqual(expected, result)

    def test_return_user_with_length_1(self):
        expected = 1

        result = self.user.objects.all().count()

        self.assertEqual(expected, result)

    def test_return_user_with_matching_email(self):
        expected = 'test@gmail.com'

        user = self.user.objects.get(pk=1)

        result = user.email

        self.assertEqual(expected, result)

    def test_return_user_with_matching_name(self):
        expected = 'Test Hello'

        user = self.user.objects.get(pk=1)

        result = user.name

        self.assertEqual(expected, result)

    def test_return_user_with_matching_password(self):
        expected = 'A!jTes@12'

        user = self.user.objects.get(pk=1)

        result = user.password

        self.assertEqual(expected, result)


"""
/api/v1/login (POST)
"""
class LoginTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.factory = RequestFactory()
        self.User = get_user_model()
        self.user = self.User.objects.create_user(
            email='test@gmail.com',
            name='Test Hello',
            password='A!jTes@12'
        )

        self.response = self.client.post(reverse('api:login'),
            {
                'email': 'test@gmail.com',
                'password': 'A!jTes@12'
            },
            format='json'
        )

class TestLoginPOSTRequest(LoginTest):
    def test_return_status_code_200_if_successful(self):
        expected = 200

        result = self.response.status_code

        self.assertEqual(expected, result)

    def test_return_user_containing_auth_token_if_successful(self):

        result = self.User.objects.get(pk=1)

        self.assertIsNotNone(result.auth_token)


"""
/api/v1/logout (GET)
"""
class LogoutTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.factory = RequestFactory()
        self.User = get_user_model()
        self.user = self.User.objects.create_user(
            email='test@gmail.com',
            name='Test Hello',
            password='A!jTes@12'
        )

        res = self.client.post(reverse('api:login'),
            {
                'email': 'test@gmail.com',
                'password': 'A!jTes@12'
            },
            format='json'
        )

        self.client.credentials(HTTP_AUTHORIZATION='Token ' + res.data['auth_token'])


class TestLogOutGETRequest(LogoutTest):
    def test_return_status_code_200_if_successful(self):
        expected = 200

        res = self.client.get(reverse('api:logout'))

        result = res.status_code

        self.assertEqual(expected, result)

    def test_return_user_with_auth_token_removed(self):

        res = self.client.get(reverse('api:logout'))

        with self.assertRaises(ObjectDoesNotExist):
            self.User.objects.get(pk=1).auth_token
