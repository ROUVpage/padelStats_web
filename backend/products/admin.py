from django.contrib import admin
from .models import Product, ProductFeature, ProductSpecification

class ProductFeatureInline(admin.TabularInline):
    model = ProductFeature
    extra = 1

class ProductSpecificationInline(admin.TabularInline):
    model = ProductSpecification
    extra = 1

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'price', 'discounted_price', 'is_active', 'created_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['name', 'description']
    inlines = [ProductFeatureInline, ProductSpecificationInline]

@admin.register(ProductFeature)
class ProductFeatureAdmin(admin.ModelAdmin):
    list_display = ['product', 'name', 'order']
    list_filter = ['product']
    ordering = ['product', 'order']

@admin.register(ProductSpecification)
class ProductSpecificationAdmin(admin.ModelAdmin):
    list_display = ['product', 'name', 'value', 'unit', 'order']
    list_filter = ['product']
    ordering = ['product', 'order']