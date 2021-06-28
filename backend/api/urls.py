from django.urls import path
from rest_framework.authtoken import views as auth_views

from . import views

urlpatterns = [
    path("", views.APIListView.as_view()),
    path("auth/",auth_views.obtain_auth_token),
    path("memories/", views.MemoryEventListView.as_view()),
    path("memory_detail/<uuid:uuid>", views.MemoryEventDetailView.as_view()),
]