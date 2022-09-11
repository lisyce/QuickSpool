from django.shortcuts import render
from django.http import JsonResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import *
from .serializers import *

@api_view(['GET'])
def api_overview(request):
    api_urls = {
        'All Thread Colors' : '/thread-colors',
        'User Collection' : '/collection/<str:pk>', # primary key of the User
        'User Thread Detail' : '/user-thread-detail/<str:pk>', # primary key of the UserThread
        'Thread Color Detail' : '/thread-color-detail/<str:pk>', # primary key of the ThreadColor
        'User Detail' : '/user/<str:pk>', # primary key of the User

        'Create User Thread' : '/user-thread-create',
        'Update User Thread' : '/user-thread-update/<str:pk>',
        'Delete User Thread' : '/user-thread-delete/<str:pk>',
    }

    return Response(api_urls)

@api_view(['GET'])
def thread_colors(request):
    threadColors = ThreadColor.objects.all()
    serializer = ThreadColorSerializer(threadColors, many=True)
    return Response(serializer.data)
