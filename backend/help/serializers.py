from rest_framework import serializers
from .models import FAQ, ContactSubmission

class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = ['id', 'question', 'answer', 'order']

class ContactSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactSubmission
        fields = ['name', 'email', 'message']
        
    def create(self, validated_data):
        return ContactSubmission.objects.create(**validated_data)