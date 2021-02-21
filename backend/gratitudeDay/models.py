from django.db import models


class Post(models.Model):
    post_id = models.CharField(max_length=15)
    receiver_name = models.CharField(max_length=60)
    receiver_email = models.EmailField()
    title = models.CharField(max_length=200)
    message = models.TextField(null=True, blank=True)
    ps_line = models.CharField(max_length=200, null=True, blank=True)

    def __str__(self):
        return self.receiver_email


class PostImage(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='postcard_images')

    def __str__(self):
        return self.post.receiver_email