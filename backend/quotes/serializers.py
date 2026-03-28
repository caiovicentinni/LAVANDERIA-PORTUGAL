from rest_framework import serializers
from .models import Quote


class QuoteSerializer(serializers.ModelSerializer):
    service_name = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Quote
        fields = [
            'id', 'service', 'service_name',
            'first_name', 'last_name', 'email', 'whatsapp', 'postal_code',
            'length', 'width', 'details', 'photo',
            'estimated_price',
            'status', 'language', 'created_at',
        ]
        read_only_fields = ['id', 'status', 'estimated_price', 'created_at']

    def get_service_name(self, obj):
        lang = obj.language or 'pt'
        return obj.service.get_name(lang)

    def validate(self, attrs):
        service = attrs.get('service')
        if service and service.requires_dimensions:
            if not attrs.get('length') or not attrs.get('width'):
                raise serializers.ValidationError({
                    'length': 'Medidas são obrigatórias para este serviço.',
                    'width': 'Medidas são obrigatórias para este serviço.',
                })
        return attrs
