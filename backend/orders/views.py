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
        
        # Generar número de seguimiento si no se proporcionó
        if not order.tracking_number:
            order.tracking_number = f"CP{int(time.time() * 1000) % 100000000:08d}"
            order.save()
        
        # Enviar emails
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
        
        message = f"""
¡Hola {order.customer_name}!

¡Gracias por tu pedido en PadelStats! 🎾

Tu pedido ha sido confirmado y procesado correctamente. Aquí tienes todos los detalles:

--- DETALLES DE TU PEDIDO ---
📦 Producto: {order.quantity} x PadelStats Sensor
💰 Precio unitario: €{order.unit_price}
{'🎯 Descuento aplicado: ' + str(order.discount_code.discount_percentage) + '%' if order.discount_code else ''}
{'💸 Ahorro: €' + str(order.discount_amount) if order.discount_amount > 0 else ''}
🚛 Gastos de envío: €{order.shipping_cost}
💳 TOTAL A PAGAR: €{order.total_amount}

--- INFORMACIÓN DE ENVÍO ---
📍 Dirección: {order.shipping_address}
🏙️ Ciudad: {order.shipping_city}, {order.shipping_postal_code}
🌍 País: {order.shipping_country}

--- INFORMACIÓN IMPORTANTE ---
🏷️ Número de pedido: #{order.id}
📋 Número de seguimiento: {order.tracking_number}
💰 Método de pago: Contrarembolso (pagas al recibir)
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
🔹 Ten preparado el importe exacto: €{order.total_amount}

--- PRÓXIMOS PASOS ---
1. 📧 Hemos registrado tu pedido en nuestro sistema
2. 📦 Preparamos tu PadelStats para envío
3. 🚛 Correos España recoge el paquete
4. 📱 Recibirás SMS con fecha de entrega
5. 🏠 El repartidor entregará en tu domicilio
6. 💰 Pagas en ese momento (contrarembolso)

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