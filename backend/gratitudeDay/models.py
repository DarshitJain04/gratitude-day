from django.db import models


class PostImage(models.Model):
    image = models.ImageField(upload_to='postcard_images')


class Post(models.Model):
    post_id = models.CharField(max_length=15)
    receiver_email = models.EmailField()
    message = models.TextField(null=True, blank=True)
    images = models.ManyToManyField(PostImage, blank=True)

    def __str__(self):
        return self.receiver_email
