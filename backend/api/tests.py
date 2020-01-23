from django.test import TestCase
from django.test.client import RequestFactory
from django.contrib.auth import get_user_model
from django.urls import reverse

from rest_framework.test import APIClient
from rest_framework.authtoken.models import Token


from .views import Login

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
class LogoutTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.factory = RequestFactory()
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




"""
/api/v1/logout (GET)
"""
class LogoutTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.factory = RequestFactory()
        self.User = get_user_model()
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

        request = self.factory.post(reverse('api:login'),
            {
                'email': 'test@gmail.com',
                'password': 'A!jTes@12'
            },
            format='json'
        )

        self.client.login(email='test@gmail.com', password='A!jTes@12')

        user = self.User.objects.get(pk=1)
        token, created = Token.objects.get_or_create(user=user)

        self.auth_token = token.key

    def test_return_request_with_user_test(self):
        expected = 'test@gmail.com'

        request = self.factory.get(reverse('api:logout'))

        request.user = self.user.objects.get(pk=1)

        result = request.user.email

        self.assertEqual(expected, result)


    def test_return_user_with_false_for_is_authenticated(self):

        expected = False

        request = self.factory.get(reverse('api:logout'), auth_token=self.auth_token)

        result = self.user.objects.get(pk=1).is_authenticated

        self.assertEqual(expected, result)