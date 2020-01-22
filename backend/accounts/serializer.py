from rest_framework import serializers
from django.contrib.auth import get_user_model

from . import models


class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        extra_kwargs = {
            'password': {'write_only': True}
        }

        fields=(
            'email',
            'password',
        )

        model = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:

        extra_kwargs = {
            'password': {'write_only': True}
        }

        model = get_user_model()