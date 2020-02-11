from django.urls import re_path

from . import consumers

websocket_urlpatterns = [
    re_path(r'/ws/api/v1/chats/(?P<user_pk>\d+)/$', consumers.ChatBoxConsumer),
]