from django.urls import re_path

from . import consumers

websocket_urlpatterns = [
    re_path(r'api/v1/ws/chats/(?P<user_pk>\d+)/$', consumers.ChatBoxConsumer),
]