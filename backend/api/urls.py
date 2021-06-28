from django.urls import path

from . import views

urlpatterns = [
    path("", views.APIListView.as_view()),
    path("memories/", views.MemoryEventListView.as_view()),
    path("memory_detail/<uuid:uuid>", views.MemoryEventDetailView.as_view()),
]