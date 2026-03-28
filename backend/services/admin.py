from django.contrib import admin
from .models import Service


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = [
        'sort_order', 'name_pt', 'base_price', 'price_unit',
        'min_price', 'requires_dimensions', 'is_active'
    ]
    list_editable = ['base_price', 'price_unit', 'min_price', 'is_active']
    list_filter = ['is_active', 'price_unit']
    ordering = ['sort_order']
