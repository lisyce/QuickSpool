from rest_framework import serializers
from django.contrib.auth.models import User

from .models import *

class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = '__all__'

class ThreadColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = ThreadColor
        fields = '__all__'
        depth = 2

# requires single field depth
class UserThreadPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserThread
        fields = '__all__'

class UserThreadGetSerializer(serializers.ModelSerializer):
    # avoids having a depth of 2
    owner_id = serializers.SerializerMethodField('get_owner_id')

    class Meta:
        model = UserThread
        fields = ['id', 'owner_id', 'skeins_owned', 'thread_color']
        depth = 2

    def get_owner_id(self, obj):
        return obj.owner.id

# used to just get the ThreadColor data
class UserThreadColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserThread
        fields = ['thread_color', 'skeins_owned']
        depth = 2
    
    def to_representation(self, instance):
        nested = super().to_representation(instance)
        data = {
            "userthread_id": instance.id,
            "skeins_owned": f'{instance.skeins_owned:.2f}'
            }
        for k, v in nested['thread_color'].items():
            data[k] = v
        return data

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'is_superuser']