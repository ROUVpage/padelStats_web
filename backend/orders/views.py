from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.core.mail import send_mail
from django.conf import settings
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
        
        # Enviar email de confirmación
        self.send_order_email(order)
        
        return order
    
    def send_order_email(self, order):
        subject = f'Nuevo Pedido PadelStats #{order.id}'
        
        # Calcular precio unitario efectivo si hay descuento
        effective_unit_price = order.unit_price
        if order.discount_code:
            effective_unit_price = order.unit_price * (1 - order.discount_code.discount_percentage / 100)
        
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
Subtotal: €{order.subtotal}

--- DESCUENTO ---
{f"Código aplicado: {order.discount_code.code}" if order.discount_code else "Sin descuento aplicado"}
{f"Descuento: -{order.discount_code.discount_percentage}%" if order.discount_code else ""}
{f"Ahorro: €{order.discount_amount}" if order.discount_amount > 0 else ""}

--- COSTOS FINALES ---
Subtotal con descuento: €{order.subtotal - order.discount_amount}
Gastos de envío: €{order.shipping_cost}
TOTAL A PAGAR: €{order.total_amount}

--- INFORMACIÓN ADICIONAL ---
Pedido ID: #{order.id}
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
            print(f"Error enviando email: {e}")

class OrderListView(generics.ListAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer