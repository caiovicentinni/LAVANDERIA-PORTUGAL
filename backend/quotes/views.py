import logging
import urllib.parse
from rest_framework import viewsets, status
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.response import Response
from .models import Quote
from .serializers import QuoteSerializer
from .email_service import send_quote_email

logger = logging.getLogger(__name__)

WHATSAPP_NUMBER = '5521999994940'


def build_whatsapp_url(quote, service_name):
    """Gera a URL do WhatsApp com mensagem formatada contendo o preço final."""
    line = '─────────────────────'
    parts = [
        f'🧺 *EDSON LAVANDERIA*',
        f'_Orçamento Automático #{quote.pk}_',
        line,
        '',
        f'📋 *SERVIÇO*',
        f'▸ {service_name}',
        '',
    ]

    if quote.length and quote.width:
        parts += [
            f'📐 *MEDIDAS*',
            f'▸ {quote.length}m × {quote.width}m',
            '',
        ]

    if quote.details:
        parts += [
            f'📝 *DETALHES*',
            f'▸ {quote.details}',
            '',
        ]

    parts += [
        f'📍 *CÓDIGO POSTAL*',
        f'▸ {quote.postal_code}',
        '',
        line,
        f'💰 *PREÇO FINAL: €{quote.estimated_price:.2f}*',
        line,
        '',
        f'👤 *CLIENTE*',
        f'▸ {quote.full_name}',
        f'▸ {quote.email}',
        f'▸ {quote.whatsapp}',
        '',
        line,
        f'_edsonlavanderia.pt — Orçamento automático_',
    ]

    message = '\n'.join(parts)
    encoded = urllib.parse.quote(message, safe='')
    return f'https://wa.me/{WHATSAPP_NUMBER}?text={encoded}'


from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

@method_decorator(csrf_exempt, name='dispatch')
class QuoteViewSet(viewsets.ModelViewSet):
    """
    API endpoint para orçamentos.
    - POST /api/quotes/ — Cria orçamento, calcula preço, envia e-mail (público)
    - GET /api/quotes/ — Lista orçamentos (somente admin)
    """
    queryset = Quote.objects.select_related('service').all()
    serializer_class = QuoteSerializer
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def get_permissions(self):
        if self.action == 'create':
            return [AllowAny()]
        return [IsAdminUser()]

    def create(self, request, *args, **kwargs):
        from services.models import Service
        if Service.objects.count() == 0:
            from django.core.management import call_command
            call_command('seed_services')
            
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        quote = serializer.save()

        # 1) Calcular preço
        quote.calculate_and_set_price()
        quote.save(update_fields=['estimated_price'])

        # 2) Gerar link do WhatsApp
        lang = quote.language or 'pt'
        service_name = quote.service.get_name(lang)
        whatsapp_url = build_whatsapp_url(quote, service_name)

        # 3) Enviar e-mail ao cliente + admin
        email_sent = False
        try:
            # Passando 'request' também para gerar URLs absolutas para a foto
            send_quote_email(quote, whatsapp_url, request)
            email_sent = True
        except Exception as e:
            logger.error(f'Falha no envio de e-mail para orçamento #{quote.pk}: {e}')

        # 4) Resposta com preço e link WhatsApp
        response_data = serializer.data
        response_data['estimated_price'] = str(quote.estimated_price)
        response_data['whatsapp_url'] = whatsapp_url
        response_data['email_sent'] = email_sent

        return Response(response_data, status=status.HTTP_201_CREATED)
