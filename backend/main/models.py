from django.db import models
from django.conf import settings

class ChatRoom(models.Model):
    lastest_chat=models.ForeignKey('Chat', related_name='latest_chat')

class Chat(models.Model):
    timestamp = models.DateTimeField(auto_now_add=True, blank=True)
    text = models.TextField()
    user = models.ForeignKey(settings.AUTH_USER_MODEL)

    def __str__(self):
        return self. "{} {}: {}".format(timestamp, user, text)

