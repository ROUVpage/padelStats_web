from rest_framework import generics, status
from rest_framework.response import Response
from django.core.mail import send_mail
from django.conf import settings
from .models import FAQ, ContactSubmission
from .serializers import FAQSerializer, ContactSubmissionSerializer

class FAQListView(generics.ListAPIView):
    queryset = FAQ.objects.filter(is_active=True)
    serializer_class = FAQSerializer

class ContactSubmissionCreateView(generics.CreateAPIView):
    queryset = ContactSubmission.objects.all()
    serializer_class = ContactSubmissionSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        contact_submission = self.perform_create(serializer)
        
        # Enviar email
        self.send_contact_email(contact_submission)
        
        return Response(
            {"message": "Tu mensaje ha sido enviado correctamente. Te contactaremos pronto."}, 
            status=status.HTTP_201_CREATED
        )
    
    def perform_create(self, serializer):
        return serializer.save()
    
    def send_contact_email(self, contact_submission):
        subject = f'Nueva Consulta PadelStats - {contact_submission.name}'
        
        message = f"""
NUEVA CONSULTA DE AYUDA - PADELSTATS

--- INFORMACIÓN DEL CLIENTE ---
Nombre: {contact_submission.name}
Email: {contact_submission.email}

--- MENSAJE ---
{contact_submission.message}

--- INFORMACIÓN ADICIONAL ---
Fecha: {contact_submission.created_at.strftime('%d/%m/%Y %H:%M')}
ID Consulta: #{contact_submission.id}

¡Responder lo antes posible!
        """
        
        try:
            send_mail(
                subject=subject,
                message=message,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=['padelstats0@gmail.com'],
                fail_silently=False,
            )
        except Exception as e:
            print(f"Error enviando email de consulta: {e}")