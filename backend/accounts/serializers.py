from rest_framework import serializers
from django.contrib.auth import get_user_model

from . import models

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=get_user_model()
        fields=(
            'pk',
            'email',
            'name',
            'profile_picture',
            'password',
            'password2',
        )


class UserPOSTSerializer(UserSerializer):

    extra_kwargs = {
        'password': {'write_only': True},
        'password2': {'write_only': True}
    }

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError('Two passwords must match')

        return data

    def create(self, validated_data):
        User = get_user_model()

        user = User.objects.create_user(
            validated_data['email'],
            validated_data['name'],
            validated_data['password']
        )

        return user