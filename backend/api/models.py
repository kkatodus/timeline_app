from django.db import models

# Create your models here.


class Photo(models.Model):
    image = models.ImageField()

    def __str__(self):
        return str(self.image.url)

class Diary(models.Model):
    photos = models.ManyToManyField(Photo, blank=True)
    content = models.CharField(max_length=100)
    created = models.DateTimeField(auto_created=True)

    class Meta:
        ordering = ["created"]

