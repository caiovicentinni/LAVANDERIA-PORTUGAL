from django.db import models
from services.models import Service


class Quote(models.Model):
    class Status(models.TextChoices):
        PENDING = 'pending', 'Pendente'
        SENT = 'sent', 'Enviado'
        APPROVED = 'approved', 'Aprovado'
        REJECTED = 'rejected', 'Rejeitado'

    service = models.ForeignKey(
        Service,
        on_delete=models.PROTECT,
        related_name='quotes',
        verbose_name='Serviço'
    )
    first_name = models.CharField('Nome', max_length=100)
    last_name = models.CharField('Sobrenome', max_length=100)
    email = models.EmailField('E-mail')
    whatsapp = models.CharField('WhatsApp', max_length=20)
    postal_code = models.CharField('Código Postal', max_length=20)

    # Detalhes específicos por serviço
    length = models.DecimalField(
        'Comprimento (m)', max_digits=5, decimal_places=2, null=True, blank=True
    )
    width = models.DecimalField(
        'Largura (m)', max_digits=5, decimal_places=2, null=True, blank=True
    )
    details = models.TextField('Detalhes', blank=True, default='')
    photo = models.ImageField('Foto', upload_to='quotes/photos/', null=True, blank=True)

    # Preço calculado automaticamente
    estimated_price = models.DecimalField(
        'Preço Final (€)', max_digits=10, decimal_places=2, default=0
    )

    status = models.CharField(
        'Status', max_length=10, choices=Status.choices, default=Status.PENDING
    )
    language = models.CharField('Idioma', max_length=5, default='pt')
    created_at = models.DateTimeField('Criado em', auto_now_add=True)
    updated_at = models.DateTimeField('Atualizado em', auto_now=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Orçamento'
        verbose_name_plural = 'Orçamentos'

    def __str__(self):
        return f'#{self.pk} - {self.first_name} {self.last_name} ({self.service.name_pt}) — €{self.estimated_price}'

    @property
    def full_name(self):
        return f'{self.first_name} {self.last_name}'

    def calculate_and_set_price(self):
        """Calcula o preço usando a tabela do serviço e salva."""
        self.estimated_price = self.service.calculate_price(
            length=self.length,
            width=self.width,
        )
        return self.estimated_price
