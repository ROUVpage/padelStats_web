from django.urls import path
from .views import FAQListView, ContactSubmissionCreateView

urlpatterns = [
    path('faq/', FAQListView.as_view(), name='faq-list'),
    path('contact/', ContactSubmissionCreateView.as_view(), name='contact-submit'),
]