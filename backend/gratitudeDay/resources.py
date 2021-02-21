from import_export import resources
from .models import PostImage


class PostImageResource(resources.ModelResource):

    class Meta:
        model = PostImage
        fields = ('post__post_id', 'post__receiver_name', 'post__receiver_email', 'post__title', 'post__message', 'post__ps_line', 'image')
        export_order = ('post__post_id', 'post__receiver_name', 'post__receiver_email', 'post__title', 'post__message', 'post__ps_line', 'image')
