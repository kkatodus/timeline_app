import uuid

from django.db import models
from django.utils import timezone
# Create your models here.


class Photo(models.Model):
    image = models.ImageField()
    @classmethod
    def create(cls, image):
        photo = cls(image=image)
        return photo
    
    def __str__(self):
        return str(self.image.url)

class Diary(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    photos = models.ManyToManyField(Photo, blank=True)
    content = models.CharField(max_length=100)
    created = models.DateTimeField(auto_created=True, default=timezone.now)

    @classmethod
    def create(cls, content):
        diary = cls(content=content)
        return diary

    class Meta:
        ordering = ["created"]

