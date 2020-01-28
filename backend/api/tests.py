from django.db.models import Q
from django.test import TestCase
from django.test.client import RequestFactory
from django.contrib.auth import get_user_model
from django.urls import reverse
from django.core.exceptions import ObjectDoesNotExist

from rest_framework.test import APIClient
from rest_framework.authtoken.models import Token

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
        self.user3 = User.objects.create_user(
            email='user3@gmail.com',
            name='User3',
            password='A!jTes@12'
        )

        self.chat1 = Chat()
        self.chat2 = Chat()

        self.chat1.save()
        self.chat2.save()

        self.chat1.users.add(self.user1, self.user2)
        self.chat2.users.add(self.user1, self.user3)

    def test_return_all_objects_with_query_count_of_2(self):
        expected = 2

        result = Chat.objects.all().count()

        self.assertEqual(expected, result)

    def test_return_object_with_query_count_of_1_when_filtered_by_2_users(self):

        expected = 1

        result = Chat.objects.filter(users__email=self.user1.email).filter(users__email=self.user2.email).count()

        self.assertEqual(expected, result)


class UserModelTest(TestCase):
    def setUp(self):
        self.User = get_user_model()

        self.user1 = self.User.objects.create_user(
            email='user1@gmail.com',
            name='User1',
            password='A!jTes@12'
        )

        self.user2 = self.User.objects.create_user(
            email='user2@gmail.com',
            name='User2',
            password='A!jTes@12'
        )

        self.user3 = self.User.objects.create_user(
            email='user3@gmail.com',
            name='User3',
            password='A!jTes@12'
        )

        chat1 = Chat()
        chat1.save()
        chat1.users.add(self.user1, self.user2)

        chat2 = Chat()
        chat2.save()
        chat2.users.add(self.user1, self.user3)

        self.user1.chats.add(chat1, chat2)

    def test_return_objects_with_query_count_of_3_if_all_queried(self):
        expected = 3

        result = self.User.objects.all().count()

        self.assertEqual(expected, result)

    def test_return_error_if_user_not_found(self):

        with self.assertRaises(ObjectDoesNotExist):
            result = self.User.objects.get(email='user4@gmail.com')

    def test_return_objects_with_query_count_of_2_if_chat_is_nonempty_and_all_chat_queried(self):
        expected = 2

        result = self.user1.chats.all().count()

        self.assertEqual(expected, result)

    def test_return_objects_with_query_count_of_0_if_chat_is_empty_and_all_chat_queried(self):
        expected = 0

        result = self.user2.chats.all().count()

        self.assertEqual(expected, result)

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

        self.user2 = self.User.objects.create_user(
            email='user2@gmail.com',
            name='User2',
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

    def test_return_user_with_auth_token_removed_if_successful(self):

        res = self.client.get(reverse('api:logout'))

        with self.assertRaises(ObjectDoesNotExist):
            self.User.objects.get(pk=1).auth_token

    def test_return_is_authenticated_as_false_if_successful(self):

        expected = False

        res = self.client.get(reverse('api:logout'))

        print(self.user.is_authenticated)

        # self.assertEqual(expected, result)



"""
/api/v1/chats (POST)
"""

class ChatsTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.factory = RequestFactory()
        self.User = get_user_model()
        self.user1 = self.User.objects.create_user(
            email='user1@gmail.com',
            name='User1',
            password='A!jTes@12'
        )

        self.user2 = self.User.objects.create_user(
            email='user2@gmail.com',
            name='User2',
            password='A!jTes@12'
        )

        self.user3 = self.User.objects.create_user(
            email='user3@gmail.com',
            name='User3',
            password='A!jTes@12'
        )

        res = self.client.post(reverse('api:login'),
            {
                'email': 'user1@gmail.com',
                'password': 'A!jTes@12'
            },
            format='json'
        )

        self.client.credentials(HTTP_AUTHORIZATION='Token ' + res.data['auth_token'])


class TestChatsPOSTRequest(ChatsTest):
    def test_return_status_code_201_if_successful(self):
        expected = 201

        res = self.client.post(reverse('api:chats'), {
            'email': 'user2@gmail.com'
        })

        result = res.status_code

        self.assertEqual(expected, result)


    def test_return_objects_with_query_count_of_1_if_successful(self):
        expected = 1

        self.client.post(reverse('api:chats'), {
            'email': 'user2@gmail.com'
        })
        result = Chat.objects.all().count()

        self.assertEqual(expected, result)

    def test_return_user1_chats_containing_user1_and_user2_if_successful(self):
        expected = 1

        self.client.post(reverse('api:chats'), {
            'email': 'user2@gmail.com'
        })

        result1 = Chat.objects.filter(users__email=self.user1.email).count()
        result2 = Chat.objects.filter(users__email=self.user2.email).count()

        self.assertEqual(expected, result1)
        self.assertEqual(expected, result2)

    def test_return_user1_with_chats_count_of_1_if_successful(self):
        expected = 1


        self.client.post(reverse('api:chats'), {
            'email': 'user2@gmail.com'
        })

        res = self.client.post(reverse('api:login'),
            {
                'email': 'user2@gmail.com',
                'password': 'A!jTes@12'
            },
            format='json'
        )
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + res.data['auth_token'])

        self.client.post(reverse('api:chats'), {
            'email': 'user3@gmail.com'
        })

        result = self.user1.chats.all().count()

        self.assertEqual(expected, result)

    def test_return_error_if_email_of_oneself_is_used(self):
        expected = 'Please select different user'

        res = self.client.post(reverse('api:chats'), {
            'email': 'user1@gmail.com'
        })

        result = res.data['detail']

        self.assertEqual(expected, result)

    def test_return_error_if_user_email_doesnt_exist(self):
        expected = 'User not found'

        res = self.client.post(reverse('api:chats'), {
            'email': 'thisuserdoesntexist@gmail.com'
        })

        result = res.data['detail']

        self.assertEqual(expected, result)

    def test_return_chat_pk_if_chat_exists_but_not_in_user(self):
        expected = 1

        self.client.post(reverse('api:chats'), {
            'email': 'user2@gmail.com'
        })

        res_login = self.client.post(reverse('api:login'),
            {
                'email': 'user2@gmail.com',
                'password': 'A!jTes@12'
            },
            format='json'
        )

        self.client.credentials(HTTP_AUTHORIZATION='Token ' + res_login.data['auth_token'])

        res_chats = self.client.post(reverse('api:chats'), {
            'email': 'user1@gmail.com'
        })

        result = res_chats.data

        self.assertEqual(expected, result)

    def test_return_error_if_chat_exists_and_is_in_user(self):
        expected = 'Chat already exists'

        self.client.post(reverse('api:chats'), {
            'email': 'user2@gmail.com'
        })

        res_chats = self.client.post(reverse('api:chats'), {
            'email': 'user2@gmail.com'
        })

        result = res_chats.data['detail']

        self.assertEqual(expected, result)


"""
/api/v1/chats (GET)
"""

class TestChatsGETRequest(ChatsTest):
    def test_return_status_code_200_if_successful(self):
        expected = 200

        res = self.client.get(reverse('api:chats'))

        result = res.status_code

        self.assertEqual(expected, result)

    def test_return_objects_with_query_count_of_2_if_successful(self):
        expected = 2

        self.client.post(reverse('api:chats'), {
            'email': 'user2@gmail.com'
        })
        self.client.post(reverse('api:chats'), {
            'email': 'user3@gmail.com'
        })

        res = self.client.get(reverse('api:chats'))

        result = len(res.data)

        self.assertEqual(expected, result)

    def test_return_list_with_ids_if_successful(self):
        expected1 = 1
        expected2 = 2

        self.client.post(reverse('api:chats'), {
            'email': 'user2@gmail.com'
        })
        self.client.post(reverse('api:chats'), {
            'email': 'user3@gmail.com'
        })

        res = self.client.get(reverse('api:chats'))

        result1 = res.data[0]
        result2 = res.data[1]

        self.assertEqual(expected1, result1)
        self.assertEqual(expected2, result2)

    def test_return_list_of_length_0_if_none_found(self):
        expected = 0

        res = self.client.get(reverse('api:chats'))

        result = len(res.data)

        self.assertEqual(expected, result)

"""
/api/v1/chats/{pk} (POST)
"""

class ChatBoxTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.factory = RequestFactory()
        self.User = get_user_model()
        self.user1 = self.User.objects.create_user(
            email='user1@gmail.com',
            name='User1',
            password='A!jTes@12'
        )

        self.user2 = self.User.objects.create_user(
            email='user2@gmail.com',
            name='User2',
            password='A!jTes@12'
        )

        res = self.client.post(reverse('api:login'),
            {
                'email': 'user1@gmail.com',
                'password': 'A!jTes@12'
            },
            format='json'
        )

        self.client.credentials(HTTP_AUTHORIZATION='Token ' + res.data['auth_token'])

        self.client.post(reverse('api:chats'), {
            'email': 'user2@gmail.com'
        })

