from django.http import HttpResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import *
from .serializers import *

@api_view(['GET'])
def api_overview(request):
    api_urls = {
        'All Thread Colors' : '/thread-colors',
        'User Collection' : '/user/<str:username>/collection',
        'User Thread Detail' : '/user-thread-detail/<int:pk>',
        'Thread Color Detail' : '/thread-color-detail/<int:pk>',
        'User Detail' : '/user/<str:username>',

        'Create User Thread' : '/user-thread-create',
        'Update User Thread' : '/user-thread-update/<int:pk>',
        'Delete User Thread' : '/user-thread-delete/<int:pk>',
    }

    return Response(api_urls)

@api_view(['GET'])
def thread_colors(request):
    thread_colors = ThreadColor.objects.all()
    serializer = ThreadColorSerializer(thread_colors, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def collection(request, username):
    user_threads = UserThread.objects.filter(owner__username=username)
    serializer = UserThreadGetSerializer(user_threads, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def user_thread_detail(request, pk):
    user_thread = UserThread.objects.get(id=pk)
    serializer = UserThreadGetSerializer(user_thread, many=False)
    return Response(serializer.data)

@api_view(['GET'])
def thread_color_detail(request, pk):
    thread_color = ThreadColor.objects.get(id=pk)
    serializer = ThreadColorSerializer(thread_color, many=False)
    return Response(serializer.data)

@api_view(['GET'])
def user_detail(request, username):
    user = User.objects.get(username=username)
    seralizer = UserSerializer(user, many=False)
    return Response(seralizer.data)

@api_view(['POST'])
def user_thread_create(request):
    serializer = UserThreadPostSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
    else:
        return HttpResponse(status=400)
    
    return Response(serializer.data)

@api_view(['POST'])
def user_thread_update(request, pk):
    user_thread = UserThread.objects.get(id=pk)
    serializer = UserThreadPostSerializer(instance=user_thread, data=request.data)

    if serializer.is_valid():
        serializer.save()
    else:
        return HttpResponse(status=400)
    
    return Response(serializer.data)

@api_view(['DELETE'])
def user_thread_delete(request, pk):
    user_thread = UserThread.objects.get(id=pk)
    user_thread.delete()

    return HttpResponse(status=200)