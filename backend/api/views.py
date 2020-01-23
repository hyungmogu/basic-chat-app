from django.contrib.auth import get_user_model, login, authenticate

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response


from accounts.serializer import UserSerializer


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
    def post(self, request, format=None):

        pass