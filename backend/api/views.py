"""
@TODO
- List of API endpoints to define

[]: Login (POST)
[]: Logout (GET)
[]: Signup (POST)
[]: Get all chatrooms (GET)
[]: Get all chats in a given chatroom (GET)
[]: Modify name of user (POST)
[]: Modify profile of user (POST)

"""


from django.contrib.auth import get_user_model, login, authenticate

from rest_framework.views import APIView
from rest_framework.response import Response


class Login(APIView):
    def post(self, request, format=None):

        # 1. Parse data from request
        serializer = serializers.LocationSerializer(data=request.data)

        # 2. validate serialized data
        serializer.is_valid(raise_exception=True)

        # 3. use django.contrib.auth to authenticate

        # 4. if not successful, return response with error

        # 5. if successful, return response with success message

        pass

class Logout(APIView):
    def post(self, request, format=None):

        pass