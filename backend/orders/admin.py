from django.contrib import admin
from .models import DiscountCode, Order

@admin.register(DiscountCode)
class DiscountCodeAdmin(admin.ModelAdmin):
    list_display = ['code', 'discount_percentage', 'is_active', 'used_count', 'usage_limit', 'expires_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['code']
    readonly_fields = ['used_count', 'created_at']
    
    fieldsets = (
        (None, {
            'fields': ('code', 'discount_percentage', 'is_active')
        }),
        ('Límites', {
            'fields': ('expires_at', 'usage_limit', 'used_count')
        }),
        ('Información', {
            'fields': ('created_at',)
        })
    )

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'customer_name', 'customer_email', 'quantity', 'total_amount', 'status', 'created_at']
    list_filter = ['status', 'created_at', 'discount_code']
    search_fields = ['customer_name', 'customer_email', 'id']
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('Cliente', {
            'fields': ('customer_name', 'customer_email', 'customer_phone')
        }),
        ('Envío', {
            'fields': ('shipping_address', 'shipping_city', 'shipping_postal_code', 'shipping_country')
        }),
        ('Pedido', {
            'fields': ('quantity', 'unit_price', 'subtotal')
        }),
        ('Descuento y Costos', {
            'fields': ('discount_code', 'discount_amount', 'shipping_cost', 'total_amount')
        }),
        ('Estado', {
            'fields': ('status',)
        }),
        ('Fechas', {
            'fields': ('created_at', 'updated_at')
        })
    )