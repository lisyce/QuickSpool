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
        'Thread Color Detail' : '/thread-colors/<int:pk>',
        'All User Threads' : '/user-threads',
        'User Collection' : '/user-threads?user=<int:user_pk>',
        'User Thread Detail' : '/user-threads/<int:pk>',
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
def user_collection(request, pk):
    query = request.GET.dict() # get query params

    if 'owned' not in query or query['owned'] == 'true':
        threads = UserThread.objects.filter(owner__id=pk)
        serializer = UserThreadGetSerializer(threads, many=True)
    elif query['owned'] == 'false':
        # get all the threads this user doesn't own
        threads = ThreadColor.objects.filter(userthread=None)
        serializer = ThreadColorSerializer(threads, many=True)
    else:
        return HttpResponse(status=400)
    return Response(serializer.data)

@api_view(['GET', 'POST'])
def user_threads(request):
    if request.method == 'GET':
        user_threads = UserThread.objects.all();
        serializer = UserThreadGetSerializer(user_threads, many=True)
        return Response(serializer.data)

    # create a new user thread
    elif request.method == 'POST':
        response_code = 201

        serializer = UserThreadPostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        else:
            response_code = 400
        
        return HttpResponse(status=response_code)

    else:
        return HttpResponse(status=405); # method not allowed
    

@api_view(['GET', 'PATCH', 'DELETE'])
def user_thread_detail(request, pk):

    # return the data for the user thread
    if request.method == 'GET':
        user_thread = UserThread.objects.get(id=pk)
        if user_thread == None:
            return HttpResponse(status=404)

        serializer = UserThreadGetSerializer(user_thread, many=False)
        return Response(serializer.data)

    # update existing user thread skeins owned
    elif request.method == 'PATCH':
        if request.data['skeins_owned'] == None:
            return HttpResponse(status=400)

        user_thread = UserThread.objects.get(id=pk)
        user_thread.skeins_owned = request.data['skeins_owned']
        user_thread.save()
        return HttpResponse(status=200)

    # delete the specified user thread
    elif request.method == 'DELETE':
        user_thread = UserThread.objects.get(id=pk)
        user_thread.delete()
        return HttpResponse(status=200)

    else:
        return HttpResponse(status=405); # method not allowed