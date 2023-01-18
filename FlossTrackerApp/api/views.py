from decimal import *

from django.http import HttpResponse
from django.db.models import Q
from django.core.exceptions import ValidationError

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import *
from .serializers import *

@api_view(['GET'])
def thread_colors(request):
    thread_colors = ThreadColor.objects.all()
    serializer = ThreadColorSerializer(thread_colors, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def thread_color_detail(request, pk):
    try:
        thread_color = ThreadColor.objects.get(id=pk)
    except:
        return HttpResponse(status=404)
    serializer = ThreadColorSerializer(thread_color, many=False)
    return Response(serializer.data)

@api_view(['GET'])
def users(request):
    users = User.objects.all();
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def user_detail(request, pk):
    try:
        user = User.objects.get(id=pk)
    except:
        return HttpResponse(status=404)
    
    seralizer = UserSerializer(user, many=False)
    return Response(seralizer.data)

@api_view(['GET'])
def user_collection(request, pk):
    # make sure the User exists
    try:
        User.objects.get(id=pk)
    except:
        return HttpResponse(status=404)

    query = request.GET.dict() # get query params as dict

    if 'owned' not in query or query['owned'] == 'true':
        threads = UserThread.objects.filter(owner__id=pk)
        serializer = UserThreadGetSerializer(threads, many=True)
    elif query['owned'] == 'false':
        # get all the threads this user doesn't own
        threads = ThreadColor.objects.filter(~Q(userthread__owner=pk))
        serializer = ThreadColorSerializer(threads, many=True)
    elif query['owned'] == 'all':
        # get all threads and note whether they are owned or not
        owned = UserThread.objects.filter(owner__id=pk)
        owned_ser = UserThreadColorSerializer(owned, many=True)

        unowned = ThreadColor.objects.filter(~Q(userthread__owner=pk))
        unowned_ser = ThreadColorSerializer(unowned, many=True)

        return Response({
            "owned": owned_ser.data,
            "unowned": unowned_ser.data
        })

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
        # check to see if the user already owns this color
        owned = UserThread.objects.filter(owner__id=int(request.data['owner']), 
                                          thread_data__id=int(request.data['thread_data'])).first()
        if owned != None:
            return HttpResponse('User already owns this thread color', status=400)

        serializer = UserThreadPostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return HttpResponse(status=201)
        else:
            return HttpResponse(status=400)

    else:
        return HttpResponse(status=405); # method not allowed
    

@api_view(['GET', 'PATCH', 'DELETE'])
def user_thread_detail(request, pk):

    # return the data for the user thread
    if request.method == 'GET':
        try:
            user_thread = UserThread.objects.get(id=pk)
        except:
            return HttpResponse(status=404)

        serializer = UserThreadGetSerializer(user_thread, many=False)
        return Response(serializer.data)

    # update existing user thread skeins owned
    elif request.method == 'PATCH':
        if 'skeins_owned' not in request.data or 'action' not in request.data:
            return HttpResponse(status=400)

        try:
            user_thread = UserThread.objects.get(id=pk)
        except:
            return HttpResponse(status=404)
        
        if request.data['action'] == 'replace':
            user_thread.skeins_owned = request.data['skeins_owned']
        elif request.data['action'] == 'add':
            user_thread.skeins_owned = user_thread.skeins_owned + Decimal(request.data['skeins_owned'])
        else:
            return HttpResponse('invalid action for skeins owned', status=400)

        try:
            user_thread.full_clean()
            user_thread.save()
            return HttpResponse(status=200)
        except ValidationError as e:
            return HttpResponse('invalid number for skeins_owned', status=400)

    # delete the specified user thread
    elif request.method == 'DELETE':
        try:
            user_thread = UserThread.objects.get(id=pk)
        except:
            return HttpResponse(status=404)
        user_thread.delete()
        return HttpResponse(status=200)

    else:
        return HttpResponse(status=405); # method not allowed