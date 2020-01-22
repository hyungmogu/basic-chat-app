from django.contrib.auth import get_user_model, login, authenticate

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response


from accounts.serializer import LoginSerializer


class Login(APIView):
    def post(self, request, format=None):

        # 1. Parse data from request
        serializer = LoginSerializer(data=request.data)

        # 2. validate serialized data
        # return error if not valid
        serializer.is_valid(raise_exception=True)

        email = serializer.validated_data['email']
        password = serializer.validated_data['password']

        # 3. use django.contrib.auth to authenticate
        user = authenticate(email=email, password=password)

        # 4. if not successful, return response with error
        if not user:
            error = {
                'error': 'User does not exist / Password is incorrect'
            }

            return Response(error, status=status.HTTP_400_BAD_REQUEST)

        # 5. if successful, return response with user info

        response = {
            'temp': True
        }

        print(user)

        return Response(response)

class Logout(APIView):
    def post(self, request, format=None):

        pass