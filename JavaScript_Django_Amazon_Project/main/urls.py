from django.urls import path
from . import views
urlpatterns = [
    path('', views.amazon, name='amazon'),
    path('checkout/', views.checkout, name='checkout'),
    path('order/', views.order, name='order'),
    path('tracking/orderId=<str:orderId>&productId=<str:productId>', views.tracking, name='tracking'),
]
