from .models import *
from django.contrib.auth import models as auth_models

from django.shortcuts import render

def home(request):
    return render(request, 'tracker/index.html')

def collection(request):
    user_threads = UserThread.objects.filter(owner=auth_models.User.objects.get(username='admin'))
    return render(request, 'tracker/collection.html', {'user_threads':user_threads})