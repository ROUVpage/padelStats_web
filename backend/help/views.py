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
        
        # Enviar emails
        try:
            self.send_admin_notification(contact_submission)
        except Exception as e:
            print(f"Error enviando email al admin: {e}")
        
        try:
            self.send_customer_confirmation(contact_submission)
        except Exception as e:
            print(f"Error enviando email al cliente: {e}")
        
        return Response(
            {
                "message": "Tu mensaje ha sido enviado correctamente. Te contactaremos pronto.",
                "id": contact_submission.id
            }, 
            status=status.HTTP_201_CREATED
        )
    
    def perform_create(self, serializer):
        return serializer.save()
    
    def send_admin_notification(self, contact):
        """Email de notificación al admin con la consulta"""
        subject = f'🔔 Nueva Consulta de Contacto - PadelStats'
        
        message = f"""
¡Nueva consulta recibida! 👋


👤  DATOS DEL CLIENTE

    Nombre: {contact.name}
    Email: {contact.email}
    

📩  CONSULTA

    "{contact.message}"
    

📋  INFORMACIÓN

    ID: #{contact.id}
    Fecha: {contact.created_at.strftime('%d/%m/%Y a las %H:%M')}
    

✅  ACCIÓN REQUERIDA

    Responder al cliente a: {contact.email}
    Tiempo de respuesta comprometido: 1-2 días laborables


Sistema Automático PadelStats
        """
        
        send_mail(
            subject=subject,
            message=message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=['padelstats0@gmail.com'],
            fail_silently=False,
        )
    
    def send_customer_confirmation(self, contact):
        """Email de confirmación al cliente"""
        subject = '✅ Hemos recibido tu mensaje - PadelStats'
        
        message = f"""
¡Hola {contact.name}! 👋

Gracias por contactar con PadelStats. Hemos recibido tu mensaje correctamente.


⏱️  ¿CUÁNDO RECIBIRÁS RESPUESTA?

    Nuestro equipo está revisando tu consulta y te responderemos pronto.
    
    📧 Responderemos a: {contact.email}
    ⏰ Tiempo de respuesta: 1-2 días laborables
    
    Recibirás nuestra respuesta directamente en tu email.
    
    Número de referencia: #{contact.id}


💬  ¿NECESITAS MÁS AYUDA?

    Mientras tanto, puedes consultar:
    
    🌐 Centro de ayuda: http://localhost:3000/ayuda
    📦 Seguimiento de pedidos: https://www.correos.es
    
    📧 Email: padelstats0@gmail.com
    📱 Teléfono: 691 43 29 07


¡Gracias por tu paciencia! Pronto tendrás noticias nuestras 🎾

El equipo de PadelStats
        """
        
        send_mail(
            subject=subject,
            message=message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[contact.email],
            fail_silently=False,
        )