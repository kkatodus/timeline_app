from django.contrib import admin

# Register your models here.
from .models import Diary, Photo

admin.site.register(Diary)
admin.site.register(Photo)