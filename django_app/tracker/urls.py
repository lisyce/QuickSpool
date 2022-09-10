from django.urls import path
from . import views
from django.views.generic import TemplateView

urlpatterns = [
    path('', views.home),
    path('collection/', views.collection)
    # rendering react stuff
    # path('', TemplateView.as_view(template_name='index.html'))
]