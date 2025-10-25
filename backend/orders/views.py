# orders/views.py
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import Order, OrderItem
from products.models import Product
from django.contrib.auth.models import User
from django.http import HttpResponse



def order_list(request):
    orders = Order.objects.all().values()
    return JsonResponse(list(orders), safe=False)

def order_detail(request, pk):
    try:
        order = Order.objects.get(pk=pk)
        items = order.items.all().values()
        return JsonResponse({
            'id': order.id,
            'user': order.user.username,
            'is_paid': order.is_paid,
            'total_price': float(order.total_price),
            'items': list(items)
        })
    except Order.DoesNotExist:
        return JsonResponse({'error': 'Order not found'}, status=404)

def checkout(request):
    return HttpResponse("This is the checkout page.")


@csrf_exempt
def create_order(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        user = User.objects.get(pk=data['user_id'])
        order = Order.objects.create(
            user=user,
            total_price=0
        )

        order.full_name = data.get('customer_name', '')
        order.phone = data.get('customer_phone', '')
        order.address = data.get('customer_address', '')
        order.save()

        total = 0
        for item in data['items']:
            product = Product.objects.get(pk=item['product_id'])
            price = product.price * item['quantity']
            total += price
            OrderItem.objects.create(
                order=order,
                product=product,
                quantity=item['quantity'],
                price=price
            )

        order.total_price = total
        order.save()
        return JsonResponse({'message': 'Order created', 'order_id': order.id})
