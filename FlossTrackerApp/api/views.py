from urllib import response
from django.http import HttpResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import *
from .serializers import *

@api_view(['GET'])
def api_overview(request):
    api_urls = {
        'All Thread Colors' : '/thread-colors',
        'All User Threads' : '/user-threads',
        'User Collection' : '/user-threads?user=<int:user_pk>',
        'User Thread Detail' : '/user-threads/<int:pk>',
        'Thread Color Detail' : '/thread-colors/<int:pk>',
        'User Detail' : '/users/<int:pk>',
    }

    return Response(api_urls)

@api_view(['GET'])
def thread_colors(request):
    thread_colors = ThreadColor.objects.all()
    serializer = ThreadColorSerializer(thread_colors, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def thread_color_detail(request, pk):
    thread_color = ThreadColor.objects.get(id=pk)
    serializer = ThreadColorSerializer(thread_color, many=False)
    return Response(serializer.data)

@api_view(['GET'])
def users(request):
    users = User.objects.all();
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def user_detail(request, pk):
    user = User.objects.get(id=pk)
    seralizer = UserSerializer(user, many=False)
    return Response(seralizer.data)

@api_view(['GET'])
def user_threads(request, user_pk=None):
    if user_pk != None:
        user_threads = UserThread.objects.filter(owner__id=user_pk)
    else:
        user_threads = UserThread.objects.all();
    serializer = UserThreadGetSerializer(user_threads, many=True)
    return Response(serializer.data)

@api_view(['GET', 'POST','DELETE'])
def user_thread(request, pk):

    # return the data for the user thread
    if request.method == 'GET':
        user_thread = UserThread.objects.get(id=pk)
        serializer = UserThreadGetSerializer(user_thread, many=False)
        return Response(serializer.data)

    # update existing user thread, or create it if it doesn't exist
    elif request.method == 'POST':
        response_code = 201

        try:
            user_thread = UserThread.objects.get(owner=request.data['owner'], thread_data=request.data['thread_data'])
            serializer = UserThreadPostSerializer(instance=user_thread, data=request.data)
            response_code = 200
        except:
            serializer = UserThreadPostSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
        else:
            return HttpResponse(status=400)
        
        return HttpResponse(status=response_code)

    # delete the specified user thread
    elif request.method == 'DELETE':
        user_thread = UserThread.objects.get(id=pk)
        user_thread.delete()

        return HttpResponse(status=200)

    else:
        return HttpResponse(status=405);