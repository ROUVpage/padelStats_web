from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.core.mail import send_mail
from django.conf import settings
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from decimal import Decimal
import time
from .models import DiscountCode, Order
from .serializers import ValidateDiscountSerializer, CreateOrderSerializer, OrderSerializer

class ValidateDiscountView(APIView):
    def post(self, request):
        serializer = ValidateDiscountSerializer(data=request.data)
        if serializer.is_valid():
            code = serializer.validated_data['code'].upper()
            try:
                discount = DiscountCode.objects.get(code=code, is_active=True)
                if discount.is_valid:
                    return Response({
                        'valid': True,
                        'code': discount.code,
                        'discount_percentage': discount.discount_percentage
                    })
                else:
                    return Response({
                        'valid': False,
                        'message': 'Código expirado o agotado'
                    })
            except DiscountCode.DoesNotExist:
                return Response({
                    'valid': False,
                    'message': 'Código de descuento no válido'
                })
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CreateOrderView(generics.CreateAPIView):
    queryset = Order.objects.all()
    serializer_class = CreateOrderSerializer
    
    def _try_correos_automation(self, order):
        """Intentar automatización completa de Correos España"""
        try:
            automation = CorreosAutomationService()
            tracking_result = automation.automatizar_envio_completo(order)
            
            if tracking_result:
                order.tracking_number = tracking_result
                
                # Si es PENDING significa que necesita intervención manual
                if tracking_result.startswith('PENDING'):
                    order.status = 'processing'  # Pendiente de completar
                    order.save()
                    
                    # Enviar alerta especial para completar proceso
                    self._enviar_alerta_proceso_pendiente(order, tracking_result)
                    return True
                else:
                    # Tracking completo obtenido
                    order.status = 'shipped_and_paid'
                    order.save()
                    return True
            else:
                return False
                
        except Exception as e:
            print(f"Error en automatización Correos: {str(e)}")
            return False
    
    def _enviar_alerta_proceso_pendiente(self, order, tracking_result):
        """Enviar alerta de proceso pendiente que requiere completar"""
        subject = f'🟡 PROCESO PENDIENTE - Pedido #{order.id} - PadelStats'
        
        total_contrarembolso = order.total_amount + Decimal('5.99')
        
        message = f"""
🟡 PROCESO DE AUTOMATIZACIÓN INICIADO - REQUIERE COMPLETAR

El pedido #{order.id} ha iniciado correctamente el proceso de automatización
en ePostal, pero requiere completar manualmente el pago con PayPal.

--- ESTADO ACTUAL ---
Tracking: {tracking_result}
Estado: Proceso iniciado en ePostal

--- DATOS DEL PEDIDO ---
Cliente: {order.customer_name}
Email: {order.customer_email}
Teléfono: {order.customer_phone}

Dirección: {order.street_address}
CP: {order.postal_code}
Ciudad: {order.city}

--- IMPORTES ---
Productos: €{order.total_amount:.2f}
Envío: €5.99
CONTRAREMBOLSO TOTAL: €{total_contrarembolso:.2f}

--- PRODUCTOS ---"""
        
        for item in order.order_items.all():
            message += f"\n- {item.product_name} x{item.quantity}: €{item.total_price:.2f}"
        
        message += f"""

--- ACCIÓN REQUERIDA ---
1. Acceder a ePostal: https://www.epostal.correos.es/
2. Completar el pago con PayPal (€6.50 aprox.)
3. Obtener número de tracking final
4. Actualizar el campo tracking_number en el admin

Una vez completado, el cliente recibirá automáticamente
el número de seguimiento por email.

---
Sistema Automatizado PadelStats
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
            print(f"Error enviando email proceso pendiente: {e}")
    
    def send_manual_processing_alert(self, order):
        """Alertar que el pedido requiere procesamiento manual"""
        subject = f'🚨 Pedido #{order.id} requiere procesamiento manual - PadelStats'
        
        total_contrarembolso = order.total_amount + 5.99
        
        message = f"""
ALERTA: PROCESAMIENTO MANUAL REQUERIDO

El pedido #{order.id} no pudo ser procesado automáticamente.
Debes crear el envío manualmente en ePostal.

--- DATOS DEL PEDIDO ---
Cliente: {order.customer_name}
Email: {order.customer_email}
Teléfono: {order.customer_phone}

--- DIRECCIÓN DE ENVÍO ---
{order.shipping_address}
{order.shipping_city}, {order.shipping_postal_code}
{order.shipping_country}

--- DETALLES DEL ENVÍO ---
Producto: {order.quantity} x PadelStats Sensor
Especificaciones: 2kg, 22x10x4cm
CONTRAREMBOLSO: €{total_contrarembolso:.2f}
(Incluye €5.99 de gastos de envío)

--- ACCIONES REQUERIDAS ---
1. Ir a: https://epostal.correos.es/OV2PREENVWEB/jsp/preenv/edicionEnvio.faces
2. Crear envío con los datos indicados
3. Activar contrarembolso por €{total_contrarembolso:.2f}
4. Actualizar número de seguimiento en pedido #{order.id}
5. Reenviar email de confirmación al cliente

Pedido creado: {order.created_at.strftime('%d/%m/%Y %H:%M')}
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
            print(f"Error enviando alerta manual: {e}")
        self.send_admin_email(order)
        self.send_customer_email(order)
        
        return order
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # Crear la orden
        order = serializer.save()
        
        # Generar tracking y guardar
        order.tracking_number = f'CP{int(time.time() * 1000) % 100000000:08d}'
        order.status = 'confirmed'
        order.save()
        
        # Enviar emails
        try:
            self.send_admin_email(order)
        except Exception as e:
            print(f"Error enviando email admin: {e}")
        
        try:
            self.send_customer_email(order)
        except Exception as e:
            print(f"Error enviando email cliente: {e}")
        
        # Retornar respuesta con todos los datos
        headers = self.get_success_headers(serializer.data)
        return Response({
            'id': order.id,
            'order_number': order.tracking_number,
            'tracking_number': order.tracking_number,
            'customer_name': order.customer_name,
            'customer_email': order.customer_email,
            'total_amount': str(order.total_amount),
            'status': order.status,
            'created_at': order.created_at.isoformat(),
            'message': '¡Pedido creado exitosamente! Recibirás un email de confirmación.'
        }, status=status.HTTP_201_CREATED, headers=headers)
    
    def send_admin_email(self, order):
        subject = f'Nuevo Pedido PadelStats #{order.id}'
        
        message = f"""
NUEVO PEDIDO PADELSTATS

--- INFORMACIÓN DEL CLIENTE ---
Nombre: {order.customer_name}
Email: {order.customer_email}
Teléfono: {order.customer_phone}

--- DIRECCIÓN DE ENVÍO ---
{order.shipping_address}
{order.shipping_city}, {order.shipping_postal_code}
{order.shipping_country}

--- DETALLES DEL PEDIDO ---
Cantidad: {order.quantity} x PadelStats Sensor
Precio unitario: €{order.unit_price}

--- DESCUENTO ---
{f"Código aplicado: {order.discount_code.code}" if order.discount_code else "Sin descuento aplicado"}
{f"Descuento: -{order.discount_code.discount_percentage}%" if order.discount_code else ""}
{f"Ahorro: €{order.discount_amount}" if order.discount_amount > 0 else ""}

--- COSTOS FINALES ---
Subtotal: €{order.subtotal}
Gastos de envío: €{order.shipping_cost}
TOTAL: €{order.total_amount}

--- INFORMACIÓN ADICIONAL ---
Pedido ID: #{order.id}
Tracking: {order.tracking_number}
Método de pago: {order.payment_method}
Fecha: {order.created_at.strftime('%d/%m/%Y %H:%M')}
Estado: {order.get_status_display()}

¡Procesar este pedido lo antes posible!
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
            print(f"Error enviando email admin: {e}")

    def send_customer_email(self, order):
        subject = '✅ Confirmación de Pedido - PadelStats'
        
        message = f"""
¡Hola {order.customer_name}! 👋

Tu pedido ha sido confirmado correctamente. ¡Gracias por confiar en PadelStats!


📦  TU PEDIDO

    Producto: {order.quantity} x PadelStats Sensor
    Precio unitario: €{order.unit_price}
    {'Descuento aplicado: -' + str(order.discount_code.discount_percentage) + '% (ahorras €' + str(order.discount_amount) + ')' if order.discount_code else ''}
    Gastos de envío: €{order.shipping_cost}
    
    💰 TOTAL A PAGAR: €{order.total_amount}
    💳 Método de pago: Contrarembolso (pagas al recibir)


🚚  INFORMACIÓN DE ENVÍO

    Dirección de entrega:
    {order.shipping_address}
    {order.shipping_city}, {order.shipping_postal_code}
    {order.shipping_country}
    
    📅 Tiempo estimado: 2-4 días laborables
    📦 Transportista: Correos España
    
    ⚠️  Importante: El repartidor te pedirá €{order.total_amount} en efectivo
         al momento de la entrega. Ten preparado el importe exacto.


📱  SEGUIMIENTO DE TU ENVÍO

    Número de seguimiento: {order.tracking_number}
    
    Puedes rastrear tu paquete en cualquier momento:
    🔗 https://www.correos.es/es/es/herramientas/localizador/envios
    
    Introduce tu número de seguimiento y verás dónde está tu pedido.
    También recibirás un SMS de Correos cuando esté cerca de tu domicilio.


💬  ¿TIENES ALGUNA DUDA?

    Estamos aquí para ayudarte:
    
    📧 Email: padelstats0@gmail.com
    📱 Teléfono: 691 43 29 07
    🌐 Centro de ayuda: http://localhost:3000/ayuda
    
    ⏱️ Tiempo de respuesta: 1-2 días laborables


¡Gracias por tu compra! Pronto estarás mejorando tu juego con PadelStats 🎾🚀

El equipo de PadelStats
        """
        
        try:
            send_mail(
                subject=subject,
                message=message,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[order.customer_email],
                fail_silently=False,
            )
        except Exception as e:
            print(f"Error enviando email cliente: {e}")

class OrderListView(generics.ListAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer