from django.shortcuts import render
from django.http import JsonResponse
from .models import UserProfile
from .serializers import UserSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

@api_view(['GET','POST'])

def user_list(request):
    if request.method == 'GET':
        drinks =   UserProfile.objects.all()
        serializer= UserSerializer(drinks, many = True)
        return JsonResponse({'users':serializer.data}, safe=False)