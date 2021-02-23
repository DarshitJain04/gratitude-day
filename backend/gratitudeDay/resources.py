from import_export import resources
from .models import Post


class PostResource(resources.ModelResource):

    class Meta:
        model = Post
        fields = ('mail', 'message', 'images')
        export_order = ('mail', 'message', 'images')
