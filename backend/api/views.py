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
from main.serializers import ChatSerializer, ChatBoxSerializer

from main.models import ChatRoom, Chat



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



class ChatRoom(APIView):
    permission_classes=(IsAuthenticated,)
    def get(self, request, format=None):

        res_data = request.user.chatrooms.all().values_list('pk', flat=True)
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

        chatroom_exists, chatroom = self.get_chatroom(email_user, email_recipient)
        if chatroom_exists:

            if request.user.chatrooms.filter(pk=chatroom.pk).count() > 0:
                res_data = {
                    'detail': 'Chat Room already exists'
                }

                return Response(res_data, status=status.HTTP_400_BAD_REQUEST)

            request.user.chatrooms.add(chatroom)

            res_data = chatroom.pk

            return Response(res_data)

        chatroom_new = self.create_chatroom(request.user, user_recipient)
        res_data = chatroom_new.pk

        return Response(res_data, status=status.HTTP_201_CREATED)

    def get_chatroom(self, email_user, email_recipient):
        chatroom_exists = True

        chatroom = (ChatRoom.objects
                .filter(users__email=email_user)
                .filter(users__email=email_recipient))

        if chatroom.count() == 0:
            chatroom_exists = False
            chatroom = None

            return chatroom_exists, chatroom

        return chatroom_exists, chatroom[0]

    def create_chatroom(self, user, user_recipient):
        chatroom_new = ChatRoom()
        chatroom_new.save()
        chatroom_new.users.add(user, user_recipient)

        user.chats.add(chatroom_new)

        return chatroom_new

    def get_user(self, email):
        User = get_user_model()

        user_exists = True
        user = None

        try:
            user = User.objects.get(email=email)
        except (ObjectDoesNotExist):
            user_exists = False

        return user_exists, user

class Chat(GenericAPIView):
    permission_classes=(IsAuthenticated,)
    def get(self, request, pk, format=None):

        chatroom_exists, chatroom = self.get_chatroom(pk)
        if not chatroom_exists:
            res_data = {
                'detail': 'Chat Room not found'
            }

            return Response(res_data, status=status.HTTP_404_NOT_FOUND)

        if not self.chatroom_valid(request.user, chatroom):
            res_data = {
                'detail': 'Requested chat room is invalid'
            }

            return Response(res_data, status=status.HTTP_400_BAD_REQUEST)

        chats = Chat.objects.filter(chatroom__pk=pk)

        res_data = ChatBoxSerializer(chats, many=True).data

        return Response(res_data)

    def post(self, request, *args, **kwargs):
        pk = kwargs['pk']
        text = request.data['text']

        chatroom_exists, chatroom = self.get_chatroom(pk)
        if not chatroom_exists:
            res_data = {
                'detail': 'Chat Room not found'
            }

            return Response(res_data, status=status.HTTP_404_NOT_FOUND)

        if not self.chat_valid(request.user, chat):
            res_data = {
                'detail': 'Requested chat room is invalid'
            }

            return Response(res_data, status=status.HTTP_400_BAD_REQUEST)

        serializer = ChatSerializer(data=request.data)

        if not serializer.is_valid():
            res_data = {
                'detail': 'Invalid text input'
            }

            return Response(res_data, status=status.HTTP_400_BAD_REQUEST)

        chat = self.create_chat(request.user, chat, text)
        res_data = ChatSerializer(chat).data

        return Response(res_data, status=status.HTTP_201_CREATED)

    def get_chatroom(self, chat_pk):
        chatroom = None
        chatroom_exists = True

        try:
            chat = ChatRoom.objects.get(pk=chat_pk)
        except (ObjectDoesNotExist):
            chatroom_exists = False

        return chatroom_exists, chatroom

    def chatroom_valid(self, user, chatroom):

        if chatroom.users.filter(pk=user.pk).count() == 0:
            return False

        return True

    def create_chat(self, user, chatroom, text):

        chat = Chat.objects.create(
            text=text,
            user=user,
            chatroom=chatroom
        )

        return chat

