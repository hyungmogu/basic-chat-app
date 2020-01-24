from rest_framework import serializers
from django.contrib.auth import get_user_model

from . import models

class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Chat
        fields = '__all__'