from django.urls import path
from . import views

urlpatterns = [
    path('api/generator-data/', views.receive_generator_data, name='receive_generator_data'),
    path('test-db/', views.test_db_connection, name='test_db_connection'),
] 