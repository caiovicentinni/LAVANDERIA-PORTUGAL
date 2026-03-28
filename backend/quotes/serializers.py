from rest_framework import serializers
from .models import Quote


class QuoteSerializer(serializers.ModelSerializer):
    service = serializers.CharField()
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
        
    def validate_service(self, value):
        from services.models import Service
        # Try to find service by string name (matches any language name or pk)
        if str(value).isdigit():
            service = Service.objects.filter(pk=value).first()
        else:
            service = Service.objects.filter(name_pt__iexact=value).first() or \
                      Service.objects.filter(name_en__iexact=value).first() or \
                      Service.objects.filter(name_br__iexact=value).first()
                      
        if not service:
            # Fallback for undefined names, get the first or create a dummy
            service = Service.objects.first()
            if not service:
                raise serializers.ValidationError("Nenhum serviço disponível no sistema.")
                
        return service

    def validate(self, attrs):
        service = attrs.get('service')
        if service and service.requires_dimensions:
            if not attrs.get('length') or not attrs.get('width'):
                raise serializers.ValidationError({
                    'length': 'Medidas são obrigatórias para este serviço.',
                    'width': 'Medidas são obrigatórias para este serviço.',
                })
        return attrs
