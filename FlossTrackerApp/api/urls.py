from django.urls import path
from django.views.generic import TemplateView
from . import views

urlpatterns = [
    path('thread-colors/', views.thread_colors, name='thread-colors'),
    path('thread-colors/<int:pk>', views.thread_color_detail, name='thread-color'),

    path('user-threads/', views.user_threads, name='user-threads'),
    path('user-threads/<int:pk>', views.user_thread_detail, name='user-thread'),

    path('users/', views.users, name='users'),
    path('users/<int:pk>', views.user_detail, name='user'),
    path('users/<int:pk>/collection', views.user_collection, name='user-collection'),
]