from django.test import TestCase
from django.test.client import RequestFactory
from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework.test import APIClient


from .views import Logout

# -----------
# API TESTS
# -----------


"""
/api/v1/login (POST)
"""
class LoginTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = get_user_model()
        self.resp_register = self.client.post(
            reverse('api:signup'),
            {
                "email": "test@gmail.com",
                "name": "Test Hello",
                "password": "A!jTes@12",
                "password2": "A!jTes@12"
            },
            format='json'
        )


class TestLoginPOSTRequest(LoginTest):
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
/api/v1/logout (POST)
"""
class LogoutTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.factory = RequestFactory()
        self.user = get_user_model()
        self.resp_register = self.client.post(
            reverse('api:signup'),
            {
                "email": "test@gmail.com",
                "name": "Test Hello",
                "password": "A!jTes@12",
                "password2": "A!jTes@12"
            },
            format='json'
        )
        self.client.login(email="test@gmail.com", password="A!jTes@12")

    def test_return_request_with_user_test(self):
        expected = "test@gmail.com"


        request = self.factory.get(reverse('api:logout'))

        request.user = self.user.objects.get(pk=1)

        result = request.user.email

        self.assertEqual(expected, result)


    def test_return_user_with_false_for_is_authenticated(self):

        expected = False

        request = self.factory.get(reverse('api:logout'))
        self.client.login(email='test@gmail.com', password='A!jTes@12')

        response = Logout.as_view()(request)

        result = self.user.objects.get(pk=1).is_authenticated

        self.assertEqual(expected, result)