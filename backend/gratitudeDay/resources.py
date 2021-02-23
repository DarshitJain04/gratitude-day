from import_export import resources
from .models import Post


class PostResource(resources.ModelResource):

    class Meta:
        model = Post
        fields = ('post_id', 'receiver_email', 'message', 'images')
        export_order = ('post_id', 'receiver_email', 'message', 'images')
