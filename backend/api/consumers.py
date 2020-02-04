import json
from channels.generic.websocket import AsyncWebsocketConsumer
from django.contrib.auth import get_user_model

from main.serializers import ChatBoxSerializer

class ChatBoxConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.chatter = self.scope['user']

        self.chatter_pk = self.chatter.pk
        self.chattee_pk = self.scope['url_route']['kwargs']['user_pk']
        self.chat_group_name = 'chat_{}_{}'.format(self.chatter_pk, self.chattee_pk)

        await self.channel_layer.group_add(
            self.chat_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.chat_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        data_json = json.loads(text_data)

        await self.channel_layer.group_send(
            self.chat_group_name,
            {
                'type': 'send',
                'data': data_json
            }
        )

    async def send(self, event):
        data = event['data']

        user_recipient = self.get_user(user_recipient_pk)

        serializer = ChatBoxSerializer(data=data)

        chatbox = self.create_chatbox(request.user, user_recipient, text)

        await self.send(text_data=json.dumps(serializer.data))

    async def create_chatbox(self, user, user_recipient, text):

        chatbox = ChatBoxModel.objects.create(
            text=text,
            msg_from=user,
            msg_to=user_recipient
        )

        return chatbox

    async def get_user(self, user_pk):
        User = get_user_model()

        user = None

        try:
            user = User.objects.get(pk=user_pk)
        except (ObjectDoesNotExist):
            pass

        return user

