from django.urls import path
from . import views
from django.views.generic import TemplateView

urlpatterns = [
    path('', views.api_overview, name='api-overview'),
    path('thread-colors/', views.thread_colors, name='thread-colors'),
]