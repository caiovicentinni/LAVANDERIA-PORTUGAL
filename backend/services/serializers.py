from rest_framework import serializers
from .models import Service


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['id', 'name_pt', 'name_br', 'name_en', 'image_url', 'is_active', 'requires_dimensions', 'sort_order']
