from django.urls import path
from .views import BlogPostListView, BlogPostDetailView, BlogCategoryListView

urlpatterns = [
    path('', BlogPostListView.as_view(), name='blog-list'),
    path('categories/', BlogCategoryListView.as_view(), name='blog-categories'),
    path('<slug:slug>/', BlogPostDetailView.as_view(), name='blog-detail'),
]