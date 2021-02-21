from django.urls import path
from . import views


urlpatterns = [
    path('add_post/', views.addPost.as_view(), name="add-post"),
    path('posts/', views.getPost.as_view(), name="get-posts"),
    path('images/', views.getImages.as_view(), name="post-images"),
    path('add_image/', views.addImage.as_view(), name="add-post-image")
]
