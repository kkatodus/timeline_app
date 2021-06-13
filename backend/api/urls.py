from django.urls import path

from . import views

urlpatterns = [
    path("", views.DiaryListView.as_view()),
]