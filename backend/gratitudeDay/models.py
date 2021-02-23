from django.db import models
import random
import string

def slug_generator():
    return ''.join(random.choice(string.ascii_letters + string.digits) for _ in range(15))


class PostImage(models.Model):
    image = models.ImageField(upload_to='postcard_images')
    slug = models.SlugField(max_length=15, blank=True, null=True, default='')

    def save(self, *args, **kwargs):
        self.slug = slug_generator()
        super(PostImage,self).save(*args, **kwargs)

    def __str__(self):
        return self.slug


class Post(models.Model):
    post_id = models.CharField(max_length=15)
    receiver_email = models.EmailField()
    message = models.TextField(null=True, blank=True)
    images = models.CharField(max_length=75, blank=True, null=True)

    def __str__(self):
        return self.receiver_email
