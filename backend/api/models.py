import uuid

from django.db import models
from django.utils import timezone
# Create your models here.

class MemoryEvent(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=70)
    descript = models.TextField()
    created = models.DateTimeField(default=timezone.now)

    @classmethod
    def create(cls, title, descript, created):
        diary = cls(title=title, descript=descript, created=created)
        return diary

    class Meta:
        ordering = ["created"]

#no pep8

from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)