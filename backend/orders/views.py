from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.core.mail import send_mail
from django.conf import settings
from django.template.loader import render_to_string
from django.utils.html import strip_tags
import time
from .models import DiscountCode, Order
from .serializers import ValidateDiscountSerializer, CreateOrderSerializer, OrderSerializer
from .correos_automation import CorreosAutomationService

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
    
    def perform_create(self, serializer):
        order = serializer.save()
        
        # Intentar automatización completa de Correos España
        if getattr(settings, 'CORREOS_AUTOMATION_ENABLED', False):
            automation_success = self._try_correos_automation(order)
            if not automation_success:
                # Fallback: modo manual
                order.status = 'requires_manual_processing'
                order.tracking_number = f'MANUAL{order.id}-{int(time.time())}'
                order.save()
                self.send_manual_processing_alert(order)
        else:
            # Modo simulado para desarrollo
            order.tracking_number = f'CP{int(time.time() * 1000) % 100000000:08d}'
            order.status = 'confirmed'
            order.save()
        
        # Enviar emails siempre
        self.send_admin_email(order)
        self.send_customer_email(order)
        
        return order
    
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
        response = super().create(request, *args, **kwargs)
        if response.status_code == 201:
            # Agregar el número de pedido a la respuesta
            order_id = response.data.get('id')
            tracking_number = Order.objects.get(id=order_id).tracking_number
            response.data['order_number'] = tracking_number
        return response
    
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
        
        # El contrarembolso incluye precio total + gastos de envío
        total_contrarembolso = order.total_amount + 5.99
        
        message = f"""
¡Hola {order.customer_name}!

¡Gracias por tu pedido en PadelStats! 🎾

Tu pedido ha sido confirmado y procesado correctamente. Aquí tienes todos los detalles:

--- DETALLES DE TU PEDIDO ---
📦 Producto: {order.quantity} x PadelStats Sensor
💰 Precio productos: €{order.total_amount}
🚛 Gastos de envío: €5.99
💳 TOTAL A PAGAR: €{total_contrarembolso:.2f}
{'🎯 Descuento aplicado: ' + str(order.discount_code.discount_percentage) + '%' if order.discount_code else ''}
{'💸 Ahorro: €' + str(order.discount_amount) if order.discount_amount > 0 else ''}

--- INFORMACIÓN DE ENVÍO ---
📍 Dirección: {order.shipping_address}
🏙️ Ciudad: {order.shipping_city}, {order.shipping_postal_code}
🌍 País: {order.shipping_country}

--- INFORMACIÓN IMPORTANTE ---
🏷️ Número de pedido: #{order.id}
📋 Número de seguimiento: {order.tracking_number}
💰 Método de pago: Contrarembolso (pagas al recibir)
💶 Importe exacto a pagar: €{total_contrarembolso:.2f}
⏰ Tiempo de entrega: 2-4 días laborables
📅 Fecha del pedido: {order.created_at.strftime('%d/%m/%Y %H:%M')}

--- SEGUIMIENTO DEL ENVÍO ---
Tu pedido será enviado a través de Correos España.
Puedes hacer seguimiento en: https://www.correos.es/es/es/herramientas/localizador/envios

Usa tu número de seguimiento: {order.tracking_number}

--- ⚠️ ¡MUY IMPORTANTE! ⚠️ ---
🔹 GUARDA ESTE CORREO como comprobante de tu pedido
🔹 Es tu VALIDACIÓN oficial de compra
🔹 Lo necesitarás para garantía y soporte
🔹 Pagarás al repartidor cuando recibas el producto
🔹 Ten preparado el importe exacto: €{total_contrarembolso:.2f}

--- PRÓXIMOS PASOS ---
1. 📧 Hemos registrado tu pedido en nuestro sistema
2. 📦 Preparamos y enviamos tu PadelStats (2kg, 22x10x4cm)
3. 🚛 Correos España gestiona la entrega contrarembolso
4. 📱 Recibirás SMS con fecha aproximada de entrega
5. 🏠 El repartidor entregará en tu domicilio
6. 💰 Pagas €{total_contrarembolso:.2f} en ese momento

--- ESPECIFICACIONES DEL PRODUCTO ---
⚖️ Peso: 2kg
📏 Dimensiones: 22 x 10 x 4 cm
📱 App incluida: PadelStats (iOS/Android)
🔋 Batería: 4h 30min uso continuo
🛡️ Garantía: 2 años

¿Tienes alguna pregunta? Contáctanos:
📧 Email: padelstats0@gmail.com
📱 Responde a este correo
🌐 Visita: www.padelstats.com/ayuda

¡Gracias por elegir PadelStats! 
Pronto estarás midiendo y mejorando tu juego como nunca antes 🚀

---
El equipo de PadelStats
www.padelstats.com
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