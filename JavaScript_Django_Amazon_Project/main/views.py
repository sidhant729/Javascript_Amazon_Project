from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json
import uuid
from .models import Products, Cart, Order
# Create your views here.
def amazon(request):
    if request.method == 'GET':
        if request.headers.get('X-Action') == 'get_product':
            products = Products.objects.all()
            if request.headers.get('Content-Type') == 'application/json':
                return JsonResponse(list(products.values()), safe=False)
        if request.headers.get('X-Action') == 'get_cart':
            cart_items = Cart.objects.all()
            if request.headers.get('Content-Type') == 'application/json':
                return JsonResponse(list(cart_items.values()), safe=False)
    return render(request, 'amazon.html')

@csrf_exempt
def checkout(request):
    if request.method == 'POST':
        if request.headers.get('X-Action') == 'update_cart':
            try:
                data = json.loads(request.body)
                Cart.objects.all().delete()
                cart_items = []
                for item in data:
                    cart_item = Cart.objects.create(
                        productId=item['productId'],
                        quantity=item['quantity'],
                        deliveryOptionId=item['deliveryOptionId'],
                    )
                    cart_items.append({
                        'id': str(cart_item.id),
                        'productId': item['productId'],
                        'quantity': item['quantity'],
                        'deliveryOptionId': item['deliveryOptionId']
                    })
                return JsonResponse(cart_items, safe=False)
            except Exception as e:
                return JsonResponse({'success': False, 'error': str(e)}, status=400)

        try:
            data = json.loads(request.body)
            cart_items = []
            for item in data:
                cart_item = Cart.objects.create(
                    productId=item['productId'],
                    quantity=item['quantity'],
                    deliveryOptionId=item['deliveryOptionId'],
                )
                cart_items.append({
                    'id': str(cart_item.id),
                    'productId': item['productId'],
                    'quantity': item['quantity'],
                    'deliveryOptionId': item['deliveryOptionId']
                })
                print('cart item is ', item['productId'])
            return JsonResponse(cart_items, safe=False)
        except Exception as e:
            return JsonResponse({'success': False, 'error': str(e)}, status=400)
    return render(request, 'checkout.html')

@csrf_exempt
def order(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            cart_data = data.get('cart', []);
            total_cents = data.get('totalCents', 0);
            order = Order.objects.create(
                totalCostCents=total_cents,
                products=cart_data
            )
            return JsonResponse({
                'success': True, 
                'orderId': str(order.id),
                'orderTime': order.orderTime
            })
        except json.JSONDecodeError:
            return JsonResponse({'success': False, 'error': 'Invalid JSON format'}, status=400)
        except KeyError as e:
            return JsonResponse({'success': False, 'error': f'Missing required field: {str(e)}'}, status=400)
        except Exception as e:
            print(f"Error creating order: {str(e)}")
            return JsonResponse({'success': False, 'error': str(e)}, status=500)
    if request.method == 'GET':
        print('inside')
        orders = Order.objects.all()
        if request.headers.get('Content-Type') == 'application/json':
            return JsonResponse(list(orders.values()), safe=False)
    return render(request, 'orders.html')