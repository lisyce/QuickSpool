from django.urls import path
from . import views

# TODO add a route to get all users

urlpatterns = [
    path('', views.api_overview, name='api-overview'),

    path('thread-colors/', views.thread_colors, name='thread-colors'),
    path('thread-colors/<int:pk>', views.thread_color_detail, name='thread-color'),

    path('user-threads?user=<int:user_pk>', views.user_threads, name='user-collection'),
    path('user-threads/', views.user_threads, name='user-threads'),
    path('user-threads/<int:pk>', views.user_thread, name='user-thread'),

    path('users/', views.users, name='users'),
    path('users/<int:pk>', views.user_detail, name='user'),
]