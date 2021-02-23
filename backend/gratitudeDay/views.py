from rest_framework.response import Response
from rest_framework.filters import SearchFilter
from rest_framework.generics import ListCreateAPIView
from .serializers import PostSerializer, PostImageSerializer
from .models import Post, PostImage
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser


class addPost(APIView):

    def post(self, request, format=None):
        data = {}
        for key in request.data.keys():
            data[key] = request.data.get(key)
        post = Post.objects.create(**data)
        post.save()
        return Response(PostSerializer(post).data, status=status.HTTP_201_CREATED)


class getPost(ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    search_fields = ['mail']
    filter_backends = (SearchFilter,)


class addImage(APIView):
    parser_classes = (MultiPartParser, FormParser,)

    def post(self, request, format=None):
        serializer = PostImageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data["image"], status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class getImages(ListCreateAPIView):
    queryset = PostImage.objects.all()
    serializer_class = PostImageSerializer
    search_fields = ['slug',]
    filter_backends = (SearchFilter,)
