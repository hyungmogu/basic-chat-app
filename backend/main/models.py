from django.db import models
from django.conf import settings

class Chat(models.Model):
    users = models.ManyToManyField(settings.AUTH_USER_MODEL)
    last_chatbox = models.ForeignKey('ChatBox', null=True, on_delete=models.SET_NULL)

class ChatBox(models.Model):
    timestamp = models.DateTimeField(auto_now_add=True, blank=True)
    text = models.TextField()
    user = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, on_delete=models.SET_NULL)
    chat = models.ForeignKey('Chat', on_delete=models.CASCADE)

    def __str__(self):
        datetime = self.timestamp.strftime('%Y-%m-%d %H:%M')
        return "{} {}: {}".format(self.timestamp, self.user.name, text)




