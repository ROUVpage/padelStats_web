from rest_framework import serializers
from .models import BlogPost, BlogCategory

class BlogCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogCategory
        fields = ['id', 'name', 'slug', 'description']

class BlogPostListSerializer(serializers.ModelSerializer):
    """Serializer for blog post list view (with excerpts only)"""
    class Meta:
        model = BlogPost
        fields = [
            'id', 'title', 'slug', 'excerpt', 'featured_image', 
            'author', 'created_at', 'views'
        ]

class BlogPostDetailSerializer(serializers.ModelSerializer):
    """Serializer for blog post detail view (with full content)"""
    class Meta:
        model = BlogPost
        fields = [
            'id', 'title', 'slug', 'content', 'excerpt', 'featured_image',
            'author', 'created_at', 'updated_at', 'views'
        ]