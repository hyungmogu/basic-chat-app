from rest_framework import serializers
from django.contrib.auth import get_user_model

from . import models

class UserSerializer(serializers.ModelSerializer):
    class Meta:

        extra_kwargs = {
            'password': {'write_only': True}
        }

        model = get_user_model()
        fields = '__all__'