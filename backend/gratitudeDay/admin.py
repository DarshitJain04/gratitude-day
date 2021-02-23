from django.contrib import admin
from .models import Post, PostImage
from import_export.admin import ImportExportActionModelAdmin
from .resources import PostResource


@admin.register(Post)
class Post(ImportExportActionModelAdmin):
    resource_class = PostResource
    list_display = ['mail']
    list_filter = ['mail']
    ordering = ['mail']
    search_fields = ['mail']

    class Meta:
        model = Post
        fields = '__all__'


@admin.register(PostImage)
class PostImageAdmin(ImportExportActionModelAdmin):

    class Meta:
        model = PostImage
        fields = '__all__'
