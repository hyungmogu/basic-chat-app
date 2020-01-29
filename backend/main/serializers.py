from rest_framework import serializers

from . import models
from accounts.serializers import UserSerializer

class ChatSerializer(serializers.ModelSerializer):
    users = UserSerializer(read_only=True, many=True)
    class Meta:
        extra_kwargs = {
            'pk': {'read_only': True},
        }

        model = models.Chat
        fields = (
            'pk',
            'users'
        )

class ChatBoxSerializer(serializers.ModelSerializer):
    user_pk = serializers.ReadOnlyField(source='user.pk')
    chat_pk = serializers.ReadOnlyField(source='chat.pk')

    class Meta:

        extra_kwargs = {
            'pk': {'read_only': True},
            'timestamp': {'read_only': True},
        }

        model = models.ChatBox
        fields = (
            'pk',
            'timestamp',
            'text',
            'user_pk',
            'chat_pk',
        )
