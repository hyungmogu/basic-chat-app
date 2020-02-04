from django.urls import path

from . import consumers

websocket_urlpatterns = [
    path('api/v1/ws/chats/<int:pk>/$', consumers.ChatBoxConsumer),
]