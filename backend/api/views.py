from rest_framework.views import APIView
from rest_framework.response import Response

from accounts.models import AccountsModel


class Login(APIView):
    def post(self, request, format=None):

        # 1. Parse data from request

        # 2. use django.contrib.auth to authenticate

        # 3. if not successful, return response with error

        # 4. if successful, return response with success message

        return Response (serializer.data)