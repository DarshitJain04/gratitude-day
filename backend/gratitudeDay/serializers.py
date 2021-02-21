from rest_framework import serializers
from .models import Post, PostImage


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'


class PostImageSerializer(serializers.ModelSerializer):
    post = PostSerializer(read_only=True)
    image = serializers.FileField()

    class Meta:
        model = PostImage
        fields = '__all__'
