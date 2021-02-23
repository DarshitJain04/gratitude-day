from rest_framework import serializers
from .models import Post, PostImage


class PostImageSerializer(serializers.ModelSerializer):
    image = serializers.FileField()

    class Meta:
        model = PostImage
        fields = '__all__'


class PostSerializer(serializers.ModelSerializer):

    images = PostImageSerializer(read_only=True, many=True)
    class Meta:
        model = Post
        fields = '__all__'
        depth = 1
