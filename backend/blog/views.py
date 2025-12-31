from rest_framework import generics
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import BlogPost, BlogCategory
from .serializers import BlogPostListSerializer, BlogPostDetailSerializer, BlogCategorySerializer

class BlogPostListView(generics.ListAPIView):
    queryset = BlogPost.objects.filter(published=True)
    serializer_class = BlogPostListSerializer

class BlogPostDetailView(generics.RetrieveAPIView):
    queryset = BlogPost.objects.filter(published=True)
    serializer_class = BlogPostDetailSerializer
    lookup_field = 'slug'

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.increment_views()  # Increment view count
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

class BlogCategoryListView(generics.ListAPIView):
    queryset = BlogCategory.objects.all()
    serializer_class = BlogCategorySerializer