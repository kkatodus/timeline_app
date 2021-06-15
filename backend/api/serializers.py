from rest_framework import serializers
from .models import Diary, Photo

class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = "__all__"

class DiarySerializer(serializers.ModelSerializer):
    photos = serializers.StringRelatedField(many=True)

    class Meta:
        model = Diary
        fields = "__all__"