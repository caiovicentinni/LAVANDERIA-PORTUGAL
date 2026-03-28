from django.db import models


class Service(models.Model):
    class PriceUnit(models.TextChoices):
        PER_PIECE = 'per_piece', 'Por Peça'
        PER_SQM = 'per_sqm', 'Por m²'

    name_pt = models.CharField('Nome (PT)', max_length=100)
    name_br = models.CharField('Nome (BR)', max_length=100)
    name_en = models.CharField('Nome (EN)', max_length=100)
    image_url = models.URLField('URL da Imagem')
    is_active = models.BooleanField('Ativo', default=True)
    requires_dimensions = models.BooleanField('Requer Medidas', default=False)
    sort_order = models.PositiveIntegerField('Ordem', default=0)

    # Pricing
    base_price = models.DecimalField(
        'Preço Base (€)', max_digits=8, decimal_places=2, default=0
    )
    price_unit = models.CharField(
        'Unidade de Preço', max_length=10,
        choices=PriceUnit.choices, default=PriceUnit.PER_PIECE
    )
    min_price = models.DecimalField(
        'Preço Mínimo (€)', max_digits=8, decimal_places=2, default=0
    )

    class Meta:
        ordering = ['sort_order']
        verbose_name = 'Serviço'
        verbose_name_plural = 'Serviços'

    def __str__(self):
        return self.name_pt

    def get_name(self, lang='pt'):
        return getattr(self, f'name_{lang}', self.name_pt)

    def calculate_price(self, length=None, width=None, quantity=1):
        """Calcula o preço final com base no tipo de cobrança."""
        if self.price_unit == self.PriceUnit.PER_SQM and length and width:
            price = self.base_price * length * width
        else:
            price = self.base_price * quantity

        return max(price, self.min_price)
