from rest_framework import serializers

from . import models

class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Chat
        fields = '__all__'

class ChatBoxSerializer(serializers.ModelSerializer):
    user_pk = serializers.RelatedField(source='user', read_only=True)
    chat_pk = serializers.RelatedField(source='chat', read_only=True)

    class Meta:

        extra_kwargs = {
            'pk': {'read_only': True},
            'timestamp': {'read_only': True},
        }

        model = models.Chat
        fields = (
            'pk',
            'timestamp',
            'text',
            'user_pk',
            'chat_pk',
        )
