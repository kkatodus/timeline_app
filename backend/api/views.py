from django.shortcuts import render
from rest_framework.fields import ImageField
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework import status

from .models import Diary, Photo
from .serializers import DiarySerializer, PhotoSerializer
# Create your views here.

class APIListView(APIView):
    def get(self, request):
        url_paths = {
            "List":"/diary_list/",
            "Detail":"/diary_detail/<uuid:uuid>"
        }
        return Response(url_paths)

class DiaryListView(APIView):
    queryset = Diary
    serializer_class = DiarySerializer
    parser_classes = [MultiPartParser,FormParser]

    def get(self, request):
        diaries = self.queryset.objects.all()
        serializer = self.serializer_class(diaries, many=True)
        return Response(serializer.data)
    
    def post(self, request, format=None):
        images = request.FILES.getlist("image")
        diary_content = request.data.get("content")
        diary_instance = Diary.create(content=diary_content)
        diary_instance.save()
        try:
            for idx, image in enumerate(images):
                photo_instance = Photo.create(image=image)
                photo_instance.save()
                diary_instance.photos.add(photo_instance)
            return Response(status=status.HTTP_201_CREATED)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class DiaryDetailView(DiaryListView):

    def get(self, request, uuid):
        try:
            diary = self.queryset.objects.get(id=uuid)
            if not diary:
                return Response(status=status.HTTP_404_NOT_FOUND)
            serialized = self.serializer_class(diary)
            return Response(serialized.data)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def post(self, request, uuid, format=None):
        diary = self.queryset.objects.get(id=uuid)

        if not diary:
            return Response(status=status.HTTP_404_NOT_FOUND)

        photos = diary.photos.all()
        new_content =request.data.get("content")
        deleted_photo_ids = request.data.getlist("deleted_photo_ids")
        new_photos = request.FILES.getlist("new_photos")
        for id in deleted_photo_ids:
            try:
                deleted = photos.get(uuid=id)
                deleted.delete()
            except:
                pass
        for photo in new_photos:
            try:
                photo_instance = Photo.create(image=photo)
                photo_instance.save()
                diary.photos.add(photo_instance)
            except:
                pass
        diary.content = new_content
        diary.save()
        return Response(status = status.HTTP_200_OK)
    
    def delete(self, request, uuid):
        try:
            diary = self.queryset.objects.get(id=uuid)
            photos = diary.photos.all()
            photos.delete()
            diary.delete()
            return Response(status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)