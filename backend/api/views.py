from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Diary
from .serializers import DiarySerializer

# Create your views here.

class DiaryListView(APIView):
    queryset = Diary
    serializer_class = DiarySerializer

    def get(self, request):
        diaries = self.queryset.objects.all()
        serializer = self.serializer_class(diaries, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = self.serializer_class(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)