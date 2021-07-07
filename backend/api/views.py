from django.shortcuts import render
from rest_framework.fields import ImageField
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework import status
from rest_framework.permissions import IsAdminUser
from rest_framework.authentication import TokenAuthentication
from datetime import datetime

from .models import MemoryEvent
from .serializers import MemoryEventSerializer
# Create your views here.

class APIListView(APIView):
    authentication_classes = [
        TokenAuthentication
    ]
    permission_classes = [
        IsAdminUser
    ]
    def get(self, request):
        url_paths = {
            "List":"/memories/ method=get",
            "Create":"/memories/ method=post",
            "Detail":"/memory_detail/<uuid:uuid> method=get",
            "Delete":"/memory_detail/<uuid:uuid> method=delete",
            "Update":"/memory_detail/<uuid:uuid> method=post",
        }
        return Response(url_paths)

class MemoryEventListView(APIView):
    queryset = MemoryEvent
    serializer_class = MemoryEventSerializer
    parser_classes = [MultiPartParser,FormParser]
    authentication_classes = [
       TokenAuthentication
    ]
    permission_classes = [
        IsAdminUser
    ]

    def get(self, request):
        memories = self.queryset.objects.all()
        serializer = self.serializer_class(memories, many=True)
        return Response(serializer.data)
    
    def post(self, request, format=None):
        try:
            memory_title = request.data.get("title")
            memory_description = request.data.get("descript")
            try:
                memory_time = request.data.get("time")
                datetime_obj = datetime.strptime(memory_time,"%Y-%m-%d")
                diary_instance = MemoryEvent.create(title=memory_title,descript=memory_description, created=datetime_obj, done=True)
            except:
                diary_instance = MemoryEvent.create(title=memory_title,descript=memory_description)
            diary_instance.save()

            return Response(status=status.HTTP_201_CREATED)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class MemoryEventDetailView(MemoryEventListView):

    def get(self, request, uuid):
        try:
            memory_event = self.queryset.objects.get(id=uuid)
            if not memory_event:
                return Response(status=status.HTTP_404_NOT_FOUND)
            serialized = self.serializer_class(memory_event)
            return Response(serialized.data)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def post(self, request, uuid, format=None):
        memory_event = self.queryset.objects.get(id=uuid)

        if not memory_event:
            return Response(status=status.HTTP_404_NOT_FOUND)

        new_title =request.data.get("title")
        new_descript = request.data.get("descript")
        new_created = request.data.get("created")
        memory_event.title = new_title
        memory_event.descript = new_descript
        try:
            datetime_obj = datetime.strptime(new_created,"%Y-%m-%d")
            memory_event.created = datetime_obj
            memory_event.done = True
        except:
            pass
        memory_event.save()

        return Response(status = status.HTTP_200_OK)
    
    def delete(self, request, uuid):
        try:
            memory_event = self.queryset.objects.get(id=uuid)
            memory_event.delete()
            return Response(status=status.HTTP_301_MOVED_PERMANENTLY)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)