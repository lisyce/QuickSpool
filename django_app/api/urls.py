from django.urls import path
from . import views
from django.views.generic import TemplateView

urlpatterns = [
    path('', views.api_overview, name='api-overview'),

    path('thread-colors/', views.thread_colors, name='thread-colors'),
    path('user/<str:username>/collection', views.collection, name='collection'),
    path('user-thread-detail/<int:pk>', views.user_thread_detail, name='user-thread-detail'),
    path('thread-color-detail/<int:pk>', views.thread_color_detail, name='thread-color-detail'),
    path('user/<str:username>/', views.user_detail, name='user-detail'),

    path('user-thread-create/', views.user_thread_create, name='user-thread-create'),
    path('user-thread-update/<int:pk>', views.user_thread_update, name='user-thread-update')
]