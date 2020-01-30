from rest_framework import serializers

from . import models
from accounts.serializers import UserSerializer

class ChatBoxSerializer(serializers.ModelSerializer):
    msg_to = serializers.ReadOnlyField(source='msg_to.pk')
    msg_from = serializers.ReadOnlyField(source='msg_from.pk')

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
            'msg_to',
            'msg_from',
        )
