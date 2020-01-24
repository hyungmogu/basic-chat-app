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

from main.models import Chat



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
        # NOTE: make sure user is logged in

        try:
            # 1. if user has chats, filter chats by id, and return matching objects
            chats = request.user.chats.all()
        except(FieldDoesNotExist, EmptyResultSet):
            # 2. if user does not have chats. if not, return empty list []
            res_data = []
            return Response(res_data)

        # 3. serializer fetched object
        chats_serializer = ChatSerializer(chats, many=True)
        res_data = chats_serializer.data

        # 4. return fetched data
        return Response(res_data)

    def post(self, request, format=None):
        email_user = request.user.email
        email_recipient = request.data['email']

        User = get_user_model()

        # 1. if target user is himself/herself return status code 400 with error
        if email == request.user.email:
            res_data = {
                'detail': 'Please select different user'
            }
            return Response(res_data, status=status.HTTP_400_BAD_REQUEST)

        try:
            # 2. find user by the matching email
            user_recipient = User.objects.get(email=email_recipient)
        except (ObjectDoesNotExist):
            # 3. if target recipient doesnt exist, return 404 item not found
            res_data = {
                'detail': 'User not found'
            }

            return Response(res_data, status=status.HTTP_404_NOT_FOUND)

        chat = Chat.objects.filter(Q(users__email=email_user)&Q(users__email=email_recipient))

        #4. if chat already exists, return status code 400 with error
        if chat:
            res_data = {
                'detail': 'Chat already exists'
            }

            return Response(res_data, status=status.HTTP_400_BAD_REQUEST)


        #5. if chat doesn't exist, create a chatroom, save
        chat_new = Chat()
        chat_new.save()
        chat_new.users.add(request.user, user_recipient)
        res_data = chat_new.pk

        #6. return created chat pk to user with status code 201
        return Response(res_data, status=status.HTTP_201_CREATED)