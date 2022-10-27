from django.urls import path
from . import views

urlpatterns = [
    path('', views.api_overview, name='api-overview'),

    path('thread-colors/', views.thread_colors, name='thread-colors'),
    path('user/<str:username>/collection', views.collection, name='collection'),
    path('user-thread-detail/<int:pk>', views.user_thread_detail, name='user-thread-detail'),
    path('thread-color-detail/<int:pk>', views.thread_color_detail, name='thread-color-detail'),
    path('user/<str:username>/', views.user_detail, name='user-detail'),

    path('user-thread-create-or-update/', views.user_thread_create_or_update, name='user-thread-create-or-update'),
    path('user-thread-delete/<int:pk>', views.user_thread_delete, name='user-thread-delete')
]