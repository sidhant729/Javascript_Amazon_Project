from django.shortcuts import render

# Create your views here.
def index(request):
    return render(request, 'amazon.html')

def checkout(request):
    return render(request, 'checkout.html')

def order(request):
    return render(request, 'orders.html')