from django.contrib import admin
from .models import Quote


@admin.register(Quote)
class QuoteAdmin(admin.ModelAdmin):
    list_display = [
        'id', 'full_name', 'service', 'estimated_price',
        'email', 'status', 'language', 'created_at'
    ]
    list_filter = ['status', 'language', 'service', 'created_at']
    search_fields = ['first_name', 'last_name', 'email', 'whatsapp']
    readonly_fields = ['estimated_price', 'created_at', 'updated_at']
    ordering = ['-created_at']

    def full_name(self, obj):
        return obj.full_name
    full_name.short_description = 'Nome Completo'
