from django.db import models
from django.conf import settings

class ChatBox(models.Model):
    timestamp = models.DateTimeField(auto_now_add=True)
    text = models.TextField()
    msg_from = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='msg_from', on_delete=models.CASCADE)
    msg_to = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='msg_to', on_delete=models.CASCADE)

    def __str__(self):
        datetime = self.timestamp.strftime('%Y-%m-%d %H:%M')
        return "{} {}: {}".format(self.timestamp, self.user.name, text)




