from rest_framework import serializers
from .models import DiscountCode, Order

class DiscountCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = DiscountCode
        fields = ['code', 'discount_percentage', 'is_valid']

class ValidateDiscountSerializer(serializers.Serializer):
    code = serializers.CharField(max_length=50)

class OrderSerializer(serializers.ModelSerializer):
    discount_code_text = serializers.CharField(source='discount_code.code', read_only=True)
    
    class Meta:
        model = Order
        fields = [
            'id', 'customer_name', 'customer_email', 'customer_phone',
            'shipping_address', 'shipping_city', 'shipping_postal_code', 'shipping_country',
            'quantity', 'unit_price', 'subtotal', 'shipping_cost',
            'discount_code_text', 'discount_amount', 'total_amount',
            'status', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']

class CreateOrderSerializer(serializers.ModelSerializer):
    discount_code_input = serializers.CharField(required=False, allow_blank=True)
    
    class Meta:
        model = Order
        fields = [
            'customer_name', 'customer_email', 'customer_phone',
            'shipping_address', 'shipping_city', 'shipping_postal_code', 'shipping_country',
            'quantity', 'unit_price', 'discount_code_input'
        ]
    
    def create(self, validated_data):
        discount_code_input = validated_data.pop('discount_code_input', '')
        quantity = validated_data['quantity']
        unit_price = validated_data['unit_price']
        
        # Calcular subtotal
        subtotal = quantity * unit_price
        shipping_cost = 5.99
        
        # Procesar código de descuento
        discount_code = None
        discount_amount = 0
        
        if discount_code_input:
            try:
                discount_code = DiscountCode.objects.get(
                    code=discount_code_input.upper(),
                    is_active=True
                )
                if discount_code.is_valid:
                    discount_amount = subtotal * (discount_code.discount_percentage / 100)
                    discount_code.used_count += 1
                    discount_code.save()
            except DiscountCode.DoesNotExist:
                pass
        
        # Calcular total
        total_amount = subtotal + shipping_cost - discount_amount
        
        # Crear pedido
        order = Order.objects.create(
            **validated_data,
            subtotal=subtotal,
            shipping_cost=shipping_cost,
            discount_code=discount_code,
            discount_amount=discount_amount,
            total_amount=total_amount
        )
        
        return order