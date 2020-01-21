from django.db import models
from django.conf import settings


class ChatRoom(models.Model):
    user1 = models.ForeignKey(settings.AUTH_USER_MODEL)
    user2 = models.ForeignKey(settings.AUTH_USER_MODEL)
    last_chat = models.ForeignKey('Chat')


class Chat(models.Model):
    timestamp = models.DateTimeField(auto_now_add=True, blank=True)
    text = models.TextField()
    user = models.ForeignKey(settings.AUTH_USER_MODEL)
    chat_room = models.ForeignKey('ChatRoom')

    def __str__(self):
        return self. "{} {}: {}".format(timestamp, user, text)




