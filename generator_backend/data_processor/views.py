from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import GeneratorData
from .serializers import GeneratorDataSerializer
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.db import connection

# Create your views here.

@api_view(['POST'])
def receive_generator_data(request):
    try:
        data = request.data
        
        # Extract and transform the data from the arrays
        transformed_data = {
            'voltage': data.get('array_[iii]', [[0]])[0][0] if data.get('array_[iii]') else 0,  # L1-N RMS Voltage
            'current': data.get('array_[v]', [[0]])[0][0] if data.get('array_[v]') else 0,      # L1 RMS Current
            'power': data.get('array_[vi]', [[0]])[0][0] if data.get('array_[vi]') else 0,      # L1 kW
            'frequency': data.get('array_[vii]', [[0]])[0][0] if data.get('array_[vii]') else 0,  # Frequency
            'fuel_level': data.get('array_[ix]', [[0]])[0][0] if data.get('array_[ix]') else 0,  # Battery Voltage as proxy
            'temperature': data.get('array_[viii]', [[0]])[0][0] if data.get('array_[viii]') else 0,  # Temperature
            'runtime': data.get('array_[x]', [[0]])[0][0] if data.get('array_[x]') else 0,      # Engine Speed as proxy
            'status': 'running' if data.get('array_[i]', [[0]])[0][0] == 1 else 'stopped'       # Control Switch Position
        }
        
        serializer = GeneratorDataSerializer(data=transformed_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
def test_db_connection(request):
    try:
        # Try to make a simple query
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1")
            result = cursor.fetchone()
        
        return JsonResponse({
            'status': 'success',
            'message': 'Database connection successful',
            'result': result[0]
        })
    except Exception as e:
        return JsonResponse({
            'status': 'error',
            'message': str(e)
        }, status=500)
