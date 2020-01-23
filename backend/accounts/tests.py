from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework.test import APIClient

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