from django.urls import path
from .views import ValidateDiscountView, CreateOrderView, OrderListView

urlpatterns = [
    path('validate-discount/', ValidateDiscountView.as_view(), name='validate-discount'),
    path('create/', CreateOrderView.as_view(), name='create-order'),
    path('', OrderListView.as_view(), name='order-list'),
]