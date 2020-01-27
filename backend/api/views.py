from django.db.models import Q
from django.contrib.auth import get_user_model, login, authenticate, logout
from django.core.exceptions import ObjectDoesNotExist

from rest_framework import status, permissions
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

from accounts.serializers import UserSerializer
from main.serializers import ChatSerializer

from main.models import Chat, ChatBox



class SignUp(APIView):
    def post(self, request, format=None):

        serializer = UserSerializer(data=request.data)

        serializer.is_valid(raise_exception=True)

        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class Login(APIView):
    def post(self, request, format=None):

        email = request.data['email']
        password = request.data['password']

        user = authenticate(email=email, password=password)

        if not user:
            error = {
                'detail': 'User does not exist / Password is incorrect'
            }

            return Response(error, status=status.HTTP_400_BAD_REQUEST)


        login(request, user)
        token, created = Token.objects.get_or_create(user=user)
        user_serializer = UserSerializer(user)

        res_data = user_serializer.data
        res_data['auth_token'] = token.key

        return Response(res_data)


class Logout(APIView):
    def get(self, request, format=None):

        try:
            request.user.auth_token.delete()
        except (AttributeError, ObjectDoesNotExist):
            error = {
                'detail': 'User already logged out'
            }

            return Response(error, status=status.HTTP_400_BAD_REQUEST)

        logout(request)
        return Response(status=status.HTTP_200_OK)


class Chats(APIView):
    permission_classes=(IsAuthenticated,)
    def get(self, request, format=None):

        res_data = request.user.chats.all().values_list('pk', flat=True)
        return Response(res_data)

    def post(self, request, format=None):

        email_user = request.user.email
        email_recipient = request.data['email']

        if email_recipient == request.user.email:
            res_data = {
                'detail': 'Please select different user'
            }
            return Response(res_data, status=status.HTTP_400_BAD_REQUEST)

        user_exists, user_recipient = self.get_user(email_recipient)
        if not user_exists:
            res_data = {
                'detail': 'User not found'
            }

            return Response(res_data, status=status.HTTP_404_NOT_FOUND)

        chat_exists, chat = self.get_chat(email_user, email_recipient)
        if chat_exists:

            if request.user.chats.filter(pk=chat.pk).count() > 0:
                res_data = {
                    'detail': 'Chat already exists'
                }

                return Response(res_data, status=status.HTTP_400_BAD_REQUEST)

            request.user.chats.add(chat)

            res_data = chat.pk

            return Response(res_data)

        chat_new = self.create_chat(request.user, user_recipient)
        res_data = chat_new.pk

        return Response(res_data, status=status.HTTP_201_CREATED)

    def get_chat(self, email_user, email_recipient):
        chat_exists = True

        chat = (Chat.objects
                .filter(users__email=email_user)
                .filter(users__email=email_recipient))

        if chat.count() == 0:
            chat_exists = False
            chat = None

            return chat_exists, chat

        return chat_exists, chat[0]

    def create_chat(self, user, user_recipient):
        chat_new = Chat()
        chat_new.save()
        chat_new.users.add(user, user_recipient)

        user.chats.add(chat_new)

        return chat_new

    def get_user(self, email):
        User = get_user_model()

        user_exists = True
        user = None

        try:
            user = User.objects.get(email=email)
        except (ObjectDoesNotExist):
            user_exists = False

        return user_exists, user

class ChatBox(APIView):
    permission_classes=(IsAuthenticated,)
    def get(self, request, pk, format=None):

        chat_exists, chat = self.get_chat(pk)
        if not chat_exists:
            res_data = {
                'detail': 'Chat not found'
            }

            return Response(res_data, status=status.HTTP_404_NOT_FOUND)

        if not self.chat_valid(request.user, chat):
            res_data = {
                'detail': 'Requested chat is invalid'
            }

            return Response(res_data, status=status.HTTP_400_BAD_REQUEST)

        chatboxes = ChatBox.objects.filter(chat__pk=pk)

        res_data = ChatBoxSerializer(chatboxes, many=True).data

        return Response(res_data)

    def post(self, request, pk, format=None):
        text = request.data['text']

        chat_exists, chat = self.get_chat(pk)
        if not chat_exists:
            res_data = {
                'detail': 'Chat not found'
            }

            return Response(res_data, status=status.HTTP_404_NOT_FOUND)

        if not self.chat_valid(request.user, chat):
            res_data = {
                'detail': 'Requested chat is invalid'
            }

            return Response(res_data, status=status.HTTP_400_BAD_REQUEST)

        serializer = ChatBoxSerializer(data=request.data)

        if not serializer.is_valid():
            res_data = {
                'detail': 'Invalid text input'
            }

            return Response(res_data, status=status.HTTP_400_BAD_REQUEST)

        chatbox = self.create_chatbox(request.user, chat, text)
        res_data = ChatBoxSerializer(chatbox).data

        return Response(res_data)

    def get_chat(self, chat_pk):
        chat = None
        chat_exists = True

        try:
            chat = Chat.objects.get(pk=chat_pk)
        except (ObjectDoesNotExist):
            chat_exists = False

        return chat_exists, chat

    def chat_valid(self, user, chat):

        if chat.users.filter(pk=user.pk).count() == 0:
            return False

        return True

    def create_chatbox(self, user, chat, text):

        chatbox = ChatBox.objects.create(
            text=text,
            user=user,
            chat=chat
        )

        return chatbox

