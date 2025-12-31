from django.contrib import admin
from .models import FAQ, ContactSubmission

@admin.register(FAQ)
class FAQAdmin(admin.ModelAdmin):
    list_display = ['question', 'order', 'is_active', 'created_at']
    list_filter = ['is_active', 'created_at']
    list_editable = ['order', 'is_active']
    search_fields = ['question', 'answer']

@admin.register(ContactSubmission)
class ContactSubmissionAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'created_at', 'responded']
    list_filter = ['responded', 'created_at']
    list_editable = ['responded']
    readonly_fields = ['created_at']
    search_fields = ['name', 'email', 'message']