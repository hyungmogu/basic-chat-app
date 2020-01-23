from django.contrib.auth import get_user_model, login, authenticate, logout

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from accounts.serializer import UserSerializer


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
                'error': 'User does not exist / Password is incorrect'
            }

            return Response(error, status=status.HTTP_400_BAD_REQUEST)

        user_serializer = UserSerializer(user)

        return Response(user_serializer.data)


class Logout(APIView):
    def get(self, request, format=None):

        if not request.user.is_authenticated:
            error = {
                'error': 'User already logged out'
            }

            return Response(error, status=status.HTTP_400_BAD_REQUEST)

        logout(request)

        return Response()