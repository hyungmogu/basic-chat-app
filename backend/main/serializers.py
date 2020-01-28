from rest_framework import serializers

from . import models

class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Chat
        fields = '__all__'

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
