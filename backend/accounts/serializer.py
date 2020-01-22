from django.contrib.auth import get_user_model

from . import models


class UserSerializer(serializers.ModelSerializer):
    class Meta:

        extra_kwargs = {
            'email': {'write_only': True}
        }

        model = get_user_model()