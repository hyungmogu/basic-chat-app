from django.contrib.auth import get_user_model, login, authenticate, logout
from django.core.exceptions import ObjectDoesNotExist

from rest_framework import status, permissions
from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

from accounts.serializer import UserSerializer
from main.serializer import ChatSerializer

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
    def get(self, request, format=None):
        # NOTE: make sure user is logged in

        # 1. if user does not have chats. if not, return empty list []

        # 2. if user has chats, filter chats by id, and return matching objects

        # 3. serializer fetched object

        # 4. return fetched data



