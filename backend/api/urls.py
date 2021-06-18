from django.urls import path

from . import views

urlpatterns = [
    path("", views.APIListView.as_view()),
    path("diary_list/", views.DiaryListView.as_view()),
    path("diary_detail/<uuid:uuid>", views.DiaryDetailView.as_view()),
]