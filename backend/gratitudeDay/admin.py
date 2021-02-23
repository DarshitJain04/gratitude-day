from django.contrib import admin
from .models import Post, PostImage
from import_export.admin import ImportExportActionModelAdmin
from .resources import PostResource


@admin.register(Post)
class Post(ImportExportActionModelAdmin):
    resource_class = PostResource
    list_display = ['post_id', 'receiver_email']
    list_filter = ['post_id', 'receiver_email']
    ordering = ['receiver_email']
    search_fields = ['receiver_email']

    class Meta:
        model = Post
        fields = '__all__'


@admin.register(PostImage)
class PostImageAdmin(ImportExportActionModelAdmin):

    class Meta:
        model = PostImage
        fields = '__all__'
