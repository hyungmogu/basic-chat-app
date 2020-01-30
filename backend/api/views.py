from django.db.models import Q
from django.contrib.auth import get_user_model, login, authenticate, logout
from django.core.exceptions import ObjectDoesNotExist

from rest_framework import status, permissions
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import ListAPIView, GenericAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

from accounts.serializers import UserSerializer
from main.serializers import ChatBoxSerializer

from main.models import ChatBox as ChatBoxModel



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
    permission_classes=(IsAuthenticated,)
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
        chat_users = request.user.chat_users.all()
        res_data = UserSerializer(chat_users, many=True).data

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

        if self.chat_exists(request.user, user_recipient):

            res_data = {
                'detail': 'Chat already exists'
            }

            return Response(res_data, status=status.HTTP_400_BAD_REQUEST)

        request.user.chat_users.add(user_recipient)

        res_data = user_recipient.pk

        return Response(res_data, status=status.HTTP_201_CREATED)

    def chat_exists(self, user, user_recipient):

        chat_user = (user.chat_users
                .filter(pk=user_recipient.pk))

        if chat_user.count() == 0:
            return False

        return True

    def get_user(self, email):
        User = get_user_model()

        user_exists = True
        user = None

        try:
            user = User.objects.get(email=email)
        except (ObjectDoesNotExist):
            user_exists = False

        return user_exists, user

class ChatBox(GenericAPIView):
    permission_classes=(IsAuthenticated,)
    def get(self, request, pk, format=None):

        user_exists, user_recipient = self.get_user(email_recipient)
        if not user_exists:
            res_data = {
                'detail': 'User not found'
            }

            return Response(res_data, status=status.HTTP_404_NOT_FOUND)

        if not self.chat_valid(request.user, chat):
            res_data = {
                'detail': 'Requested chat is invalid'
            }

            return Response(res_data, status=status.HTTP_400_BAD_REQUEST)

        chatboxes = ChatBoxModel.objects.filter(chat__pk=pk)

        res_data = ChatBoxSerializer(chatboxes, many=True).data

        return Response(res_data)

    def post(self, request, *args, **kwargs):
        user_recipient_pk = kwargs.get('pk')
        text = request.data['text']

        user_exists, user_recipient = self.get_user(user_recipient_pk)
        if not user_exists:
            res_data = {
                'detail': 'User not found'
            }

            return Response(res_data, status=status.HTTP_404_NOT_FOUND)

        if not self.chat_valid(request.user, user_recipient):
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

        chatbox = self.create_chatbox(request.user, user_recipient, text)
        res_data = ChatBoxSerializer(chatbox).data

        return Response(res_data, status=status.HTTP_201_CREATED)

    def get_user(self, user_pk):
        User = get_user_model()

        user_exists = True
        user = None

        try:
            user = User.objects.get(pk=user_pk)
        except (ObjectDoesNotExist):
            user_exists = False

        return user_exists, user

    def chat_valid(self, user, user_recipient):

        if user.chat_users.filter(pk=user_recipient.pk).count() == 0:
            return False

        return True

    def create_chatbox(self, user, user_recipient, text):

        chatbox = ChatBoxModel.objects.create(
            text=text,
            msg_from=user,
            msg_to=user_recipient
        )

        return chatbox

