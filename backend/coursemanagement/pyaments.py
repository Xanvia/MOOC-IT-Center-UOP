from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Payments
import hashlib


@csrf_exempt
@api_view(["POST"])
def payment_notification(request):
    merchant_id = request.data.get("merchant_id")
    order_id = request.data.get("order_id")
    payment_id = request.data.get("payment_id")
    status_code = request.data.get("status_code")
    payhere_amount = request.data.get("payhere_amount")
    payhere_currency = request.data.get("payhere_currency")
    md5sig = request.data.get("md5sig")

    # Verify the MD5 signature
    generated_md5sig = hashlib.md5(
        f"{merchant_id}{order_id}{payment_id}{payhere_amount}{payhere_currency}<YOUR_SECRET_KEY>".encode()
    ).hexdigest()

    if md5sig != generated_md5sig:
        return Response({"error": "Invalid signature"}, status=400)

    try:
        payment = Payments.objects.get(id=order_id)
    except Payments.DoesNotExist:
        return Response({"error": "Payment not found"}, status=404)

    if status_code == "2":  # Success
        payment.status = "SUCCESS"
        payment.save()
        return Response({"status": "Payment successful"})

    payment.status = "FAILED"
    payment.save()
    return Response({"status": "Payment failed"})
