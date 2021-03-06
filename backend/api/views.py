import boto3
import base64
import logging
from django.db.models import Q
from django.contrib.auth import get_user_model, login, authenticate, logout
from django.core.exceptions import ObjectDoesNotExist
from django.db.models import Prefetch

from rest_framework import status, permissions
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import ListAPIView, GenericAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

from accounts.serializers import UserSerializer, UserPOSTSerializer, ChatUsersSerializer
from main.serializers import ChatBoxSerializer
from main.models import ChatBox as ChatBoxModel



class User(GenericAPIView):
    permission_classes=(IsAuthenticated,)
    def put(self, request, format=None):

        serializer = UserSerializer(data=request.data, partial=True)

        if not serializer.is_valid():

            res_data = {
                'detail': 'User data is incorrect. Please check again'
            }

            return Response(res_data, status=status.HTTP_400_BAD_REQUEST)

        validated_data = serializer.validated_data

        user = request.user
        user.name = validated_data.get('name', user.name)
        user.avatar = validated_data.get('avatar', user.avatar)
        user.save()

        return Response()


class SignUp(APIView):
    def post(self, request, format=None):

        serializer = UserPOSTSerializer(data=request.data)

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
        user_serializer = UserPOSTSerializer(user)

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
        return Response()


class Chats(APIView):
    permission_classes=(IsAuthenticated,)
    def get(self, request, format=None):
        chat_users = request.user.chat_users.all()

        for chat_user in chat_users:
            latest_chatbox = (ChatBoxModel.objects
                .filter((Q(msg_from=request.user)&Q(msg_to=chat_user))|
                        (Q(msg_from=chat_user)&Q(msg_to=request.user)))
                .order_by('-pk').first())

            if latest_chatbox is None:
                chat_user.latest_text = None
            else:
                text = latest_chatbox.text.replace('\n', ' ')
                text = text.strip()

                chat_user.latest_text = latest_chatbox.text[:20] if len(text) > 20 else latest_chatbox.text

        res_data = ChatUsersSerializer(chat_users, many=True).data

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

        res_data = UserPOSTSerializer(user_recipient).data

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
    def get(self, request, *args, **kwargs):

        user_recipient_pk = kwargs.get('pk')

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

        chatboxes = ChatBoxModel.objects.filter((Q(msg_from=request.user)&Q(msg_to=user_recipient))|(Q(msg_from=user_recipient)&Q(msg_to=request.user)))

        res_data = ChatBoxSerializer(chatboxes, many=True).data

        return Response(res_data)

    def post(self, request, *args, **kwargs):
        user_recipient_pk = kwargs.get('pk')
        text = request.data['text']

        if request.user.pk == user_recipient_pk:
            res_data = {
                'detail': 'Message cannot be sent to self'
            }

            return Response(res_data, status=status.HTTP_400_BAD_REQUEST)

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


class Photo(APIView):
    permission_classes=(IsAuthenticated,)
    def post(self, request, format=None):
        user = request.user
        bucket_name = 'hyungmogu-chat-application'
        image_file = request.FILES.get('photo')

        if (not image_file):
            res_data = {
                'detail': 'Image returned empty'
            }

            return Response(res_data, status=status.HTTP_400_BAD_REQUEST)

        file_path = 'usr/{}/{}.jpeg'.format(request.user.pk, image_file.name)

        s3 = boto3.resource('s3')
        self.create_bucket(s3, bucket_name)

        object_s3 = s3.Object(bucket_name, file_path).put(Body=image_file)
        object_acl = s3.ObjectAcl(bucket_name, s3.Object(bucket_name, file_path).key).put(ACL='public-read')

        location = boto3.client('s3').get_bucket_location(Bucket=bucket_name)['LocationConstraint']

        image_url = "https://{}.s3-{}.amazonaws.com/{}".format(bucket_name,location, file_path)

        user.avatar = image_url
        user.save()

        res_data = {
            'image': "https://{}.s3-{}.amazonaws.com/{}".format(bucket_name,location, file_path)
        }

        return Response(res_data, status=status.HTTP_201_CREATED)

    def create_bucket(self, s3, bucket_name):
        region = 'us-west-2'

        print(s3.Bucket(bucket_name).creation_date)

        if s3.Bucket(bucket_name).creation_date is not None:
            return

        s3.create_bucket(Bucket=bucket_name, CreateBucketConfiguration={
            'LocationConstraint': region})

        print('Bucket created')

