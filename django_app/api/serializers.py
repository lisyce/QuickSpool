from threading import Thread
from rest_framework import serializers
from .models import *

class ThreadColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = ThreadColor
        fields = '__all__'

class UserThreadSerializer(serializers.ModelSerializer):
    pass

class UserSerializer(serializers.ModelSerializer):
    pass