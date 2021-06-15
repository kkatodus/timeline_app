from django.shortcuts import render
from rest_framework.fields import ImageField
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework import status

from .models import Diary, Photo
from .serializers import DiarySerializer, PhotoSerializer
# Create your views here.

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
            for idx,image in enumerate(images):
                # photo_instance = PhotoSerializer(data={"image":image})
                photo_instance = Photo.create(image=image)
                # if photo_instance.is_valid():
                photo_instance.save()
                diary_instance.photos.add(photo_instance)
            return Response(status=status.HTTP_201_CREATED)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)