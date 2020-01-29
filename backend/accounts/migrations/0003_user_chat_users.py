# Generated by Django 2.1.1 on 2020-01-29 22:45

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_remove_user_chat_users'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='chat_users',
            field=models.ManyToManyField(blank=True, related_name='_user_chat_users_+', to=settings.AUTH_USER_MODEL),
        ),
    ]
