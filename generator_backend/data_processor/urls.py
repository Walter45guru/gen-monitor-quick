from django.urls import path
from . import views

urlpatterns = [
    path('api/generator-data-csv/', views.generator_data_csv, name='generator_data_csv'),
] 