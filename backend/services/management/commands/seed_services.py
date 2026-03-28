from django.core.management.base import BaseCommand
from services.models import Service


SEED_DATA = [
    {
        'name_pt': 'Limpeza a Seco',
        'name_br': 'Limpeza a Seco',
        'name_en': 'Dry Cleaning',
        'image_url': 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=503,h=360,fit=crop/YZ9Vj5wQjGFEQQ7J/shop-1746862-YKb6l9oDZZhkaBZq.jpg',
        'requires_dimensions': False,
        'sort_order': 1,
        'base_price': 15.00,
        'price_unit': 'per_piece',
        'min_price': 15.00,
    },
    {
        'name_pt': 'Limpeza Tapetes',
        'name_br': 'Limpeza Tapetes',
        'name_en': 'Carpet Cleaning',
        'image_url': 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=503,h=360,fit=crop/YZ9Vj5wQjGFEQQ7J/generated/generated-mjEvGEGLEBFLDpMR.png',
        'requires_dimensions': True,
        'sort_order': 2,
        'base_price': 12.00,
        'price_unit': 'per_sqm',
        'min_price': 20.00,
    },
    {
        'name_pt': 'Limpeza Cortinados',
        'name_br': 'Limpeza Cortinados',
        'name_en': 'Curtain Cleaning',
        'image_url': 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=503,h=360,fit=crop/YZ9Vj5wQjGFEQQ7J/generated/generated-AVLpaLQD7vsx8l6k.png',
        'requires_dimensions': False,
        'sort_order': 3,
        'base_price': 10.00,
        'price_unit': 'per_piece',
        'min_price': 10.00,
    },
    {
        'name_pt': 'Impermeabilização',
        'name_br': 'Impermeabilização',
        'name_en': 'Waterproofing',
        'image_url': 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=503,h=360,fit=crop/YZ9Vj5wQjGFEQQ7J/generated/generated-dJo6bowZXDtpVX64.png',
        'requires_dimensions': False,
        'sort_order': 4,
        'base_price': 20.00,
        'price_unit': 'per_piece',
        'min_price': 20.00,
    },
    {
        'name_pt': 'Tinturaria',
        'name_br': 'Tinturaria',
        'name_en': 'Dyeing',
        'image_url': 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=503,h=360,fit=crop/YZ9Vj5wQjGFEQQ7J/generated/generated-YanyJngRg1SZkMw8.png',
        'requires_dimensions': False,
        'sort_order': 5,
        'base_price': 18.00,
        'price_unit': 'per_piece',
        'min_price': 18.00,
    },
    {
        'name_pt': 'Edredões',
        'name_br': 'Edredons',
        'name_en': 'Comforters',
        'image_url': 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=503,h=360,fit=crop/YZ9Vj5wQjGFEQQ7J/generated/generated-Yg2Wy26Mx5uVWnM4.png',
        'requires_dimensions': True,
        'sort_order': 6,
        'base_price': 15.00,
        'price_unit': 'per_piece',
        'min_price': 15.00,
    },
    {
        'name_pt': 'Packs',
        'name_br': 'Pacotes',
        'name_en': 'Packages',
        'image_url': 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=503,h=360,fit=crop/YZ9Vj5wQjGFEQQ7J/generated/generated-AE0or0gQ4eHpbexP.png',
        'requires_dimensions': False,
        'sort_order': 7,
        'base_price': 25.00,
        'price_unit': 'per_piece',
        'min_price': 25.00,
    },
    {
        'name_pt': 'Arranjos Costura',
        'name_br': 'Ajustes de Costura',
        'name_en': 'Tailoring & Repairs',
        'image_url': 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=503,h=360,fit=crop/YZ9Vj5wQjGFEQQ7J/generated/generated-Y4LVvLa4yPfyR22Z.png',
        'requires_dimensions': False,
        'sort_order': 8,
        'base_price': 10.00,
        'price_unit': 'per_piece',
        'min_price': 10.00,
    },
    {
        'name_pt': 'Roupa por Medida',
        'name_br': 'Roupa Sob Medida',
        'name_en': 'Custom Clothing',
        'image_url': 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=503,h=360,fit=crop/YZ9Vj5wQjGFEQQ7J/generated/generated-mv0DJ0ZGQacj6Kyg.png',
        'requires_dimensions': False,
        'sort_order': 9,
        'base_price': 50.00,
        'price_unit': 'per_piece',
        'min_price': 50.00,
    },
]


class Command(BaseCommand):
    help = 'Popula a tabela de serviços com dados iniciais (inclui preços)'

    def handle(self, *args, **options):
        created_count = 0
        updated_count = 0
        for data in SEED_DATA:
            service, created = Service.objects.get_or_create(
                name_pt=data['name_pt'],
                defaults=data,
            )
            if created:
                created_count += 1
            else:
                # Atualizar preços em serviços existentes
                needs_update = False
                for field in ('base_price', 'price_unit', 'min_price'):
                    if getattr(service, field) != data.get(field):
                        setattr(service, field, data[field])
                        needs_update = True
                if needs_update:
                    service.save()
                    updated_count += 1

        self.stdout.write(
            self.style.SUCCESS(
                f'{created_count} criados, {updated_count} atualizados. '
                f'Total: {Service.objects.count()}'
            )
        )
