from django.db import models
import uuid
# Create your models here.
class Products(models.Model):
    id = models.CharField(max_length=100, primary_key=True)
    image = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    rating = models.JSONField()
    priceCents = models.IntegerField()
    keywords = models.JSONField()

class Cart(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    productId = models.CharField(max_length=100)
    quantity = models.IntegerField()
    deliveryOptionId = models.CharField(max_length=100)

class Order(models.Model):
    id = models.CharField(max_length=36, primary_key=True, default=uuid.uuid4, editable=False)
    orderTime = models.DateTimeField(auto_now_add=True)
    totalCostCents = models.IntegerField()
    products = models.JSONField()


