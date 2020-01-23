from rest_framework import serializers
from django.contrib.auth import get_user_model

from . import models

class UserSerializer(serializers.ModelSerializer):
    class Meta:

        extra_kwargs = {
            'password': {'write_only': True},
            'password2': {'write_only': True}
        }

        model=get_user_model()
        fields=(
            'last_login',
            'email',
            'name',
            'profile_picture',
            'password',
            'password2',
        )

    def validate(self, data):

        if data['password'] != data['password2']:
            raise serializers.ValidationError('Two passwords must match')

        return data