from rest_framework import serializers
from .models import GeneratorData

class GeneratorDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = GeneratorData
        fields = '__all__'

    # Add custom validation/cleaning here if needed
    # def validate_FIELD(self, value):
    #     # Clean or adjust value
    #     return value 