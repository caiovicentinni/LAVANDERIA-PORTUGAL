import logging
from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string

logger = logging.getLogger(__name__)

SUBJECT_TRANSLATIONS = {
    'pt': 'Seu Orçamento #{quote_id} — €{price} — Edson Lavanderia',
    'br': 'Seu Orçamento #{quote_id} — €{price} — Edson Lavanderia',
    'en': 'Your Quote #{quote_id} — €{price} — Edson Lavanderia',
}

ADMIN_SUBJECT = 'Novo Orçamento #{quote_id} — €{price} — {name}'


def send_quote_email(quote, whatsapp_url=None):
    """Envia e-mail com orçamento e preço final para o cliente + admin."""
    lang = quote.language or 'pt'
    service_name = quote.service.get_name(lang)
    price = f'{quote.estimated_price:.2f}'

    context = {
        'quote': quote,
        'service_name': service_name,
        'estimated_price': price,
        'lang': lang,
        'whatsapp_url': whatsapp_url,
    }

    html_content = render_to_string('emails/quote_email.html', context)

    # 1) E-mail para o CLIENTE
    subject_tpl = SUBJECT_TRANSLATIONS.get(lang, SUBJECT_TRANSLATIONS['pt'])
    client_subject = subject_tpl.format(quote_id=quote.pk, price=price)
    client_email = EmailMultiAlternatives(
        subject=client_subject,
        body=f'Orçamento #{quote.pk} - {service_name} - €{price}',
        from_email=settings.DEFAULT_FROM_EMAIL,
        to=[quote.email],
    )
    client_email.attach_alternative(html_content, 'text/html')

    # 2) E-mail para o ADMIN
    admin_subject = ADMIN_SUBJECT.format(
        quote_id=quote.pk, price=price, name=quote.full_name
    )
    admin_email = EmailMultiAlternatives(
        subject=admin_subject,
        body=f'Novo orçamento de {quote.full_name} para {service_name} — €{price}',
        from_email=settings.DEFAULT_FROM_EMAIL,
        to=[settings.ADMIN_EMAIL],
    )
    admin_email.attach_alternative(html_content, 'text/html')

    try:
        client_email.send(fail_silently=False)
        admin_email.send(fail_silently=False)
        quote.status = 'sent'
        quote.save(update_fields=['status'])
        logger.info(f'E-mails enviados — orçamento #{quote.pk} — €{price}')
    except Exception as e:
        logger.error(f'Erro ao enviar e-mail #{quote.pk}: {e}')
        raise
