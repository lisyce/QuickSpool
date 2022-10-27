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
    owner = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = UserThread
        fields = '__all__'
        depth = 2

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'