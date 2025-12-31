from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=200, default="PadelStats")
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2, default=84.99)
    discounted_price = models.DecimalField(max_digits=10, decimal_places=2, default=59.99)
    bulk_price = models.DecimalField(max_digits=10, decimal_places=2, default=49.99)
    bulk_quantity = models.IntegerField(default=4)
    battery_life = models.CharField(max_length=100, default="4h 30min")
    image = models.ImageField(upload_to='products/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name

class ProductFeature(models.Model):
    product = models.ForeignKey(Product, related_name='features', on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    description = models.TextField()
    icon = models.CharField(max_length=100, blank=True)  # For icon class names
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.product.name} - {self.name}"

class ProductSpecification(models.Model):
    product = models.ForeignKey(Product, related_name='specifications', on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    value = models.CharField(max_length=200)
    unit = models.CharField(max_length=50, blank=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.product.name} - {self.name}: {self.value}"