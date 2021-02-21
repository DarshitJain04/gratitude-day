from django.contrib import admin
from .models import Post, PostImage
from import_export.admin import ImportExportActionModelAdmin
from .resources import PostImageResource


class PostImageInline(admin.StackedInline):
    model = PostImage


@admin.register(Post)
class Post(admin.ModelAdmin):
    inlines = (PostImageInline,)
    list_display = ['post_id', 'receiver_name', 'receiver_email']
    list_filter = ['post_id', 'receiver_name', 'receiver_email']
    ordering = ['receiver_name']
    search_fields = ['receiver_name', 'receiver_email']

    class Meta:
        model = Post
        fields = '__all__'


@admin.register(PostImage)
class PostImageAdmin(ImportExportActionModelAdmin):
    resource_class = PostImageResource
    list_display = ['get_id', 'get_name', 'get_email']
    list_filter = ['post__post_id', 'post__receiver_name', 'post__receiver_email']
    ordering = ['post']
    search_fields = ['post__receiver_name', 'post__receiver_email']

    def get_id(self, instance):
        return instance.post.post_id
    
    def get_name(self, instance):
        return instance.post.receiver_name

    def get_email(self, instance):
        return instance.post.receiver_email

    class Meta:
        model = PostImage
        fields = '__all__'
