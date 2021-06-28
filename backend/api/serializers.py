from rest_framework import serializers
from .models import MemoryEvent


class MemoryEventSerializer(serializers.ModelSerializer):
    # photos = serializers.StringRelatedField(many=True)
    class Meta:
        model = MemoryEvent
        fields = "__all__"