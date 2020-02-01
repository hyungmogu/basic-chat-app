import re
from django.db.models import Q
from django.test import TestCase
from django.test.client import RequestFactory
from django.contrib.auth import get_user_model
from django.urls import reverse
from django.core.exceptions import ObjectDoesNotExist

from rest_framework.test import APIClient
from rest_framework.authtoken.models import Token

from main.models import ChatBox as ChatBoxModel

# -----------
# MODEL TESTS
# -----------

# class UserModelTest(TestCase):
#     def setUp(self):
#         self.User = get_user_model()

#         self.user1 = self.User.objects.create_user(
#             email='user1@gmail.com',
#             name='User1',
#             password='A!jTes@12'
#         )

#         self.user2 = self.User.objects.create_user(
#             email='user2@gmail.com',
#             name='User2',
#             password='A!jTes@12'
#         )

#         self.user3 = self.User.objects.create_user(
#             email='user3@gmail.com',
#             name='User3',
#             password='A!jTes@12'
#         )

#         self.user1.chat_users.add(self.user2, self.user3)
#         self.user2.chat_users.add(self.user1, self.user3)

#     def test_return_objects_with_query_count_of_3_if_all_queried(self):
#         expected = 3

#         result = self.User.objects.all().count()

#         self.assertEqual(expected, result)

#     def test_return_error_if_user_not_found(self):

#         with self.assertRaises(ObjectDoesNotExist):
#             result = self.User.objects.get(email='user4@gmail.com')

#     def test_return_objects_with_query_count_of_2_if_chat_users_is_nonempty_and_all_chat_queried(self):
#         expected = 2

#         result = self.user1.chat_users.all().count()

#         self.assertEqual(expected, result)

# # -----------
# # API TESTS
# # -----------


# """
# /api/v1/signup (POST)
# """
# class SignUpTest(TestCase):
#     def setUp(self):
#         self.client = APIClient()
#         self.user = get_user_model()
#         self.resp_register = self.client.post(
#             reverse('api:signup'),
#             {
#                 'email': 'test@gmail.com',
#                 'name': 'Test Hello',
#                 'password': 'A!jTes@12',
#                 'password2': 'A!jTes@12'
#             },
#             format='json'
#         )


# class TestSignUpPOSTRequest(SignUpTest):
#     def test_return_status_code_201_if_successful(self):
#         expected = 201

#         result = self.resp_register.status_code

#         self.assertEqual(expected, result)

#     def test_return_user_with_length_1(self):
#         expected = 1

#         result = self.user.objects.all().count()

#         self.assertEqual(expected, result)

#     def test_return_user_with_matching_email(self):
#         expected = 'test@gmail.com'

#         user = self.user.objects.get(pk=1)

#         result = user.email

#         self.assertEqual(expected, result)

#     def test_return_user_with_matching_name(self):
#         expected = 'Test Hello'

#         user = self.user.objects.get(pk=1)

#         result = user.name

#         self.assertEqual(expected, result)

#     def test_return_user_with_matching_password(self):
#         expected = True

#         user = self.user.objects.get(pk=1)

#         result = user.check_password('A!jTes@12')

#         self.assertEqual(expected, result)


# """
# /api/v1/login (POST)
# """
# class LoginTest(TestCase):
#     def setUp(self):
#         self.client = APIClient()
#         self.factory = RequestFactory()
#         self.User = get_user_model()
#         self.user = self.User.objects.create_user(
#             email='test@gmail.com',
#             name='Test Hello',
#             password='A!jTes@12'
#         )

#         self.response = self.client.post(reverse('api:login'),
#             {
#                 'email': 'test@gmail.com',
#                 'password': 'A!jTes@12'
#             },
#             format='json'
#         )

# class TestLoginPOSTRequest(LoginTest):
#     def test_return_status_code_200_if_successful(self):
#         expected = 200

#         result = self.response.status_code

#         self.assertEqual(expected, result)

#     def test_return_user_containing_auth_token_if_successful(self):

#         result = self.User.objects.get(pk=1)

#         self.assertIsNotNone(result.auth_token)


# """
# /api/v1/logout (GET)
# """
# class LogoutTest(TestCase):
#     def setUp(self):
#         self.client = APIClient()
#         self.factory = RequestFactory()
#         self.User = get_user_model()
#         self.user = self.User.objects.create_user(
#             email='test@gmail.com',
#             name='Test Hello',
#             password='A!jTes@12'
#         )

#         self.user2 = self.User.objects.create_user(
#             email='user2@gmail.com',
#             name='User2',
#             password='A!jTes@12'
#         )

#         res = self.client.post(reverse('api:login'),
#             {
#                 'email': 'test@gmail.com',
#                 'password': 'A!jTes@12'
#             },
#             format='json'
#         )

#         self.client.credentials(HTTP_AUTHORIZATION='Token ' + res.data['auth_token'])


# class TestLogOutGETRequest(LogoutTest):
#     def test_return_status_code_200_if_successful(self):
#         expected = 200

#         res = self.client.get(reverse('api:logout'))

#         result = res.status_code

#         self.assertEqual(expected, result)

#     def test_return_user_with_auth_token_removed_if_successful(self):

#         res = self.client.get(reverse('api:logout'))

#         with self.assertRaises(ObjectDoesNotExist):
#             self.User.objects.get(pk=1).auth_token

#     def test_return_error_if_auth_token_not_attached(self):

#         expected = 'Authentication credentials were not provided.'

#         self.client.credentials()
#         res = self.client.get(reverse('api:logout'))

#         print(res.data)

#         result = res.data['detail']

#         self.assertEqual(expected, result)


#     def test_return_error_if_auth_token_invalid(self):

#         expected = 'Invalid token.'

#         self.client.get(reverse('api:logout'))
#         res = self.client.get(reverse('api:logout'))

#         print(res.data)

#         result = res.data['detail']

#         self.assertEqual(expected, result)


# """
# /api/v1/chats (POST)
# """

# class ChatsTest(TestCase):
#     def setUp(self):
#         self.client = APIClient()
#         self.factory = RequestFactory()
#         self.User = get_user_model()
#         self.user1 = self.User.objects.create_user(
#             email='user1@gmail.com',
#             name='User1',
#             password='A!jTes@12'
#         )

#         self.user2 = self.User.objects.create_user(
#             email='user2@gmail.com',
#             name='User2',
#             password='A!jTes@12'
#         )

#         self.user3 = self.User.objects.create_user(
#             email='user3@gmail.com',
#             name='User3',
#             password='A!jTes@12'
#         )

#         res = self.client.post(reverse('api:login'),
#             {
#                 'email': 'user1@gmail.com',
#                 'password': 'A!jTes@12'
#             },
#             format='json'
#         )

#         self.client.credentials(HTTP_AUTHORIZATION='Token ' + res.data['auth_token'])


# class TestChatsPOSTRequest(ChatsTest):
#     def test_return_status_code_201_if_successful(self):
#         expected = 201

#         res = self.client.post(reverse('api:chats'), {
#             'email': 'user2@gmail.com'
#         })

#         result = res.status_code

#         self.assertEqual(expected, result)

#     def test_return_objects_with_query_count_of_1_if_successful(self):
#         expected = 1

#         self.client.post(reverse('api:chats'), {
#             'email': 'user2@gmail.com'
#         })
#         result = self.user1.chat_users.all().count()

#         self.assertEqual(expected, result)

#     def test_return_user1_chat_users_containing_user2_if_successful(self):
#         expected = 1

#         self.client.post(reverse('api:chats'), {
#             'email': 'user2@gmail.com'
#         })

#         result = self.user1.chat_users.filter(email=self.user2.email).count()

#         self.assertEqual(expected, result)

#     def test_return_user1_with_chats_count_of_1_if_successful(self):
#         expected = 1

#         self.client.post(reverse('api:chats'), {
#             'email': 'user2@gmail.com'
#         })

#         res = self.client.post(reverse('api:login'),
#             {
#                 'email': 'user2@gmail.com',
#                 'password': 'A!jTes@12'
#             },
#             format='json'
#         )
#         self.client.credentials(HTTP_AUTHORIZATION='Token ' + res.data['auth_token'])

#         self.client.post(reverse('api:chats'), {
#             'email': 'user3@gmail.com'
#         })

#         result = self.user1.chat_users.all().count()

#         self.assertEqual(expected, result)

#     def test_return_error_if_email_of_oneself_is_used(self):
#         expected = 'Please select different user'

#         res = self.client.post(reverse('api:chats'), {
#             'email': 'user1@gmail.com'
#         })

#         result = res.data['detail']

#         self.assertEqual(expected, result)

#     def test_return_error_if_user_email_doesnt_exist(self):
#         expected = 'User not found'

#         res = self.client.post(reverse('api:chats'), {
#             'email': 'thisuserdoesntexist@gmail.com'
#         })

#         result = res.data['detail']

#         self.assertEqual(expected, result)

#     def test_return_error_if_chat_exists_and_is_in_user(self):
#         expected = 'Chat already exists'

#         self.client.post(reverse('api:chats'), {
#             'email': 'user2@gmail.com'
#         })

#         res_chats = self.client.post(reverse('api:chats'), {
#             'email': 'user2@gmail.com'
#         })

#         result = res_chats.data['detail']

#         self.assertEqual(expected, result)


# """
# /api/v1/chats (GET)
# """

# class TestChatsGETRequest(ChatsTest):
#     def test_return_status_code_200_if_successful(self):
#         expected = 200

#         res = self.client.get(reverse('api:chats'))

#         result = res.status_code

#         self.assertEqual(expected, result)

#     def test_return_objects_with_query_count_of_2_if_successful(self):
#         expected = 2

#         self.client.post(reverse('api:chats'), {
#             'email': 'user2@gmail.com'
#         })
#         self.client.post(reverse('api:chats'), {
#             'email': 'user3@gmail.com'
#         })

#         res = self.client.get(reverse('api:chats'))

#         result = len(res.data)

#         self.assertEqual(expected, result)

#     def test_return_list_of_users_if_successful(self):
#         expected1 = 'user2@gmail.com'
#         expected2 = 'user3@gmail.com'

#         self.client.post(reverse('api:chats'), {
#             'email': 'user2@gmail.com'
#         })
#         self.client.post(reverse('api:chats'), {
#             'email': 'user3@gmail.com'
#         })

#         res = self.client.get(reverse('api:chats'))

#         result1 = res.data[0]['email']
#         result2 = res.data[1]['email']

#         self.assertEqual(expected1, result1)
#         self.assertEqual(expected2, result2)

#     def test_return_list_of_length_0_if_none_found(self):
#         expected = 0

#         res = self.client.get(reverse('api:chats'))

#         result = len(res.data)

#         self.assertEqual(expected, result)


# """
# /api/v1/chats/{pk} (POST)
# """

# class ChatBoxTest(TestCase):
#     def setUp(self):
#         self.client = APIClient()
#         self.factory = RequestFactory()
#         self.User = get_user_model()
#         self.user1 = self.User.objects.create_user(
#             email='user1@gmail.com',
#             name='User1',
#             password='A!jTes@12'
#         )

#         self.user2 = self.User.objects.create_user(
#             email='user2@gmail.com',
#             name='User2',
#             password='A!jTes@12'
#         )

#         self.user3 = self.User.objects.create_user(
#             email='user3@gmail.com',
#             name='User3',
#             password='A!jTes@12'
#         )

#         self.user4 = self.User.objects.create_user(
#             email='user4@gmail.com',
#             name='User4',
#             password='A!jTes@12'
#         )


#         res = self.client.post(reverse('api:login'),
#             {
#                 'email': 'user1@gmail.com',
#                 'password': 'A!jTes@12'
#             },
#             format='json'
#         )

#         self.client.credentials(HTTP_AUTHORIZATION='Token ' + res.data['auth_token'])

#         self.client.post(reverse('api:chats'), {
#             'email': 'user2@gmail.com'
#         })

#         self.client.post(reverse('api:chats'), {
#             'email': 'user3@gmail.com'
#         })


# class TestChatBoxPOSTRequest(ChatBoxTest):

#     def test_return_status_code_201_if_successful(self):
#         expected = 201

#         res = self.client.post(reverse('api:chat', kwargs={'pk': 2}), {
#             'text': 'hello'
#         })

#         result = res.status_code

#         self.assertEqual(expected, result)

#     def test_return_objects_with_query_count_of_1_if_successful(self):
#         expected = 1

#         res = self.client.post(reverse('api:chat', kwargs={'pk': 2}), {
#             'text': 'hello'
#         })

#         result = ChatBoxModel.objects.all().count()

#         self.assertEqual(expected, result)


#     def test_return_object_with_timestamp_in_unix_format_if_successful(self):
#         res = self.client.post(reverse('api:chat', kwargs={'pk': 2}), {
#             'text': 'hello'
#         })

#         result1 = re.search('[^0-9]', str(res.data['timestamp']))
#         result2 = ChatBoxModel.objects.get(pk=1).timestamp

#         self.assertIsNone(result1)
#         self.assertIsNotNone(result2)


#     def test_return_object_with_text_of_hello_if_successful(self):
#         expected = 'hello'

#         res = self.client.post(reverse('api:chat', kwargs={'pk': 2}), {
#             'text': 'hello'
#         })

#         result1 = ChatBoxModel.objects.get(pk=1).text
#         result2 = res.data['text']

#         self.assertEqual(expected, result1)
#         self.assertEqual(expected, result2)

#     def test_return_object_with_msg_to_pk_of_2_if_successful(self):
#         expected = 2

#         res = self.client.post(reverse('api:chat', kwargs={'pk': 2}), {
#             'text': 'hello'
#         })

#         result1 = ChatBoxModel.objects.get(pk=1).msg_to.pk
#         result2 = res.data['msg_to']

#         self.assertEqual(expected, result1)
#         self.assertEqual(expected, result2)

#     def test_return_object_with_msg_from_pk_of_1_if_successful(self):
#         expected =  1

#         res = self.client.post(reverse('api:chat', kwargs={'pk': 2}), {
#             'text': 'hello'
#         })

#         result1 = ChatBoxModel.objects.get(pk=1).msg_from.pk
#         result2 = res.data['msg_from']

#         self.assertEqual(expected, result1)
#         self.assertEqual(expected, result2)

#     def test_return_error_if_chat_doesnt_exist(self):
#         expected = 'Chat not found'

#         res = self.client.post(reverse('api:chat', kwargs={'pk': 10}), {
#             'text': 'hello'
#         })

#         result = res.data['detail']

#         self.assertEqual(expected, result)

#     def test_return_error_if_chat_doesnt_exist(self):
#         expected = 'Requested chat is invalid'

#         self.client.post(reverse('api:chat', kwargs={'pk': 2}), {
#             'text': 'hello from user 1'
#         })

#         res_login = self.client.post(reverse('api:login'),
#             {
#                 'email': 'user3@gmail.com',
#                 'password': 'A!jTes@12'
#             },
#             format='json'
#         )
#         self.client.credentials(HTTP_AUTHORIZATION='Token ' + res_login.data['auth_token'])

#         res = self.client.post(reverse('api:chat', kwargs={'pk': 1}), {
#             'text': 'hello from user 3'
#         })

#         result = res.data['detail']

#         self.assertEqual(expected, result)

#     def test_return_error_if_chat_doesnt_exist(self):
#         expected = 'Requested chat is invalid'

#         self.client.post(reverse('api:chat', kwargs={'pk': 2}), {
#             'text': 'hello from user 1'
#         })

#         res_login = self.client.post(reverse('api:login'),
#             {
#                 'email': 'user4@gmail.com',
#                 'password': 'A!jTes@12'
#             },
#             format='json'
#         )
#         self.client.credentials(HTTP_AUTHORIZATION='Token ' + res_login.data['auth_token'])

#         res = self.client.post(reverse('api:chat', kwargs={'pk': 1}), {
#             'text': 'hello from user 4'
#         })

#         result = res.data['detail']

#         self.assertEqual(expected, result)


# """
# /api/v1/chats/{pk} (GET)
# """

# class TestChatBoxGETRequest(ChatBoxTest):

#     def test_return_status_code_200_if_successful(self):
#         expected = 200

#         self.client.post(reverse('api:chat', kwargs={'pk': 2}), {
#             'text': 'hello'
#         })

#         res = self.client.get(reverse('api:chat', kwargs={'pk': 2}))

#         result = res.status_code

#         self.assertEqual(expected, result)


#     def test_return_status_code_200_if_successful(self):
#         expected = 200

#         self.client.post(reverse('api:chat', kwargs={'pk': 2}), {
#             'text': 'hello'
#         })

#         res = self.client.get(reverse('api:chat', kwargs={'pk': 2}))

#         result = res.status_code

#         self.assertEqual(expected, result)

#     def test_return_list_with_length_2_given_2_objects_if_successful(self):
#         expected = 2

#         self.client.post(reverse('api:chat', kwargs={'pk': 2}), {
#             'text': 'hello'
#         })

#         self.client.post(reverse('api:chat', kwargs={'pk': 2}), {
#             'text': 'hi'
#         })

#         res = self.client.get(reverse('api:chat', kwargs={'pk': 2}))

#         result = len(res.data)

#         self.assertEqual(expected, result)

#     def test_return_list_with_earliest_being_first_if_successful(self):
#         expected = 1

#         self.client.post(reverse('api:chat', kwargs={'pk': 2}), {
#             'text': 'hello'
#         })

#         self.client.post(reverse('api:chat', kwargs={'pk': 2}), {
#             'text': 'hi'
#         })

#         res = self.client.get(reverse('api:chat', kwargs={'pk': 2}))

#         result = res.data[0]['pk']

#         self.assertEqual(expected, result)
#         self.assertLessEqual(int(res.data[0]['timestamp']), int(res.data[-1]['timestamp']))

#     def test_return_list_with_first_object_containing_text_hello_if_successful(self):
#         expected = 'hello'

#         self.client.post(reverse('api:chat', kwargs={'pk': 2}), {
#             'text': 'hello'
#         })

#         self.client.post(reverse('api:chat', kwargs={'pk': 2}), {
#             'text': 'hi'
#         })

#         res = self.client.get(reverse('api:chat', kwargs={'pk': 2}))

#         result = res.data[0]['text']

#         self.assertEqual(expected, result)


#     def test_return_list_with_latest_being_last_if_successful(self):
#         expected = 2

#         self.client.post(reverse('api:chat', kwargs={'pk': 2}), {
#             'text': 'hello'
#         })

#         self.client.post(reverse('api:chat', kwargs={'pk': 2}), {
#             'text': 'hi'
#         })

#         res = self.client.get(reverse('api:chat', kwargs={'pk': 2}))

#         result = res.data[-1]['pk']

#         self.assertEqual(expected, result)
#         self.assertLessEqual(int(res.data[0]['timestamp']), int(res.data[-1]['timestamp']))

#     def test_return_list_with_second_object_having_msg_to_of_1_if_successful(self):
#         expected = 2

#         self.client.post(reverse('api:chat', kwargs={'pk': 2}), {
#             'text': 'hello'
#         })

#         res_login = self.client.post(reverse('api:login'),
#             {
#                 'email': 'user2@gmail.com',
#                 'password': 'A!jTes@12'
#             },
#             format='json'
#         )
#         self.client.credentials(HTTP_AUTHORIZATION='Token ' + res_login.data['auth_token'])

#         self.client.post(reverse('api:chat', kwargs={'pk': 1}), {
#             'text': 'hi'
#         })

#         res = self.client.get(reverse('api:chat', kwargs={'pk': 1}))

#         result = res.data[-1]['msg_to']

#         self.assertEqual(expected, result)
#         self.assertLessEqual(int(res.data[0]['timestamp']), int(res.data[-1]['timestamp']))


"""
/api/v1/user/ (PUT)
"""

class UserTest(TestCase):
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

        self.client.post(reverse('api:chats'), {
            'email': 'user2@gmail.com'
        })

        self.client.post(reverse('api:chats'), {
            'email': 'user3@gmail.com'
        })


class TestUserPUTRequest(UserTest):
    def test_return_status_code_200_if_successful(self):
        expected = 200

        res = self.client.put(reverse('api:user'), {
            'name': 'New User Name 1',
            'profile_picture': 'http://via.placeholder.com/350x150'
        })

        result = res.status_code

        self.assertEqual(expected, result)