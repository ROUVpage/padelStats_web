"""
Script para poblar la base de datos con datos de ejemplo para PadelStats.
Ejecutar desde el shell de Django: python manage.py shell < populate_db.py
"""

from products.models import Product, ProductFeature, ProductSpecification
from blog.models import BlogPost, BlogCategory
from help.models import FAQ
from orders.models import DiscountCode

# Crear producto principal
product, created = Product.objects.get_or_create(
    name="PadelStats Sensor",
    defaults={
        'description': 'El sensor inteligente que se coloca en el canto de tu pala de pádel para medir potencia, precisión, efecto y exigencia física de cada golpe.',
        'price': 84.99,
        'discounted_price': 59.99,
        'bulk_price': 49.99,
        'bulk_quantity': 4,
        'battery_life': '4h 30min',
        'is_active': True
    }
)

if created:
    print(f"Producto creado: {product.name}")
    
    # Características del producto
    features_data = [
        {
            'name': 'Medición de Potencia',
            'description': 'Analiza la fuerza aplicada en cada golpe con sensores de alta precisión. Obtén métricas detalladas sobre la velocidad de impacto y la energía transferida a la pelota.',
            'icon': 'power',
            'order': 1
        },
        {
            'name': 'Análisis de Precisión', 
            'description': 'Rastrea la exactitud de tus golpes y mejora tu control. El sistema detecta la zona de impacto y calcula desviaciones del punto óptimo.',
            'icon': 'precision',
            'order': 2
        },
        {
            'name': 'Medición de Efecto',
            'description': 'Analiza el spin aplicado a cada pelota, incluyendo efecto liftado, cortado y lateral. Perfecciona tu técnica con datos precisos.',
            'icon': 'spin',
            'order': 3
        },
        {
            'name': 'Exigencia Física',
            'description': 'Monitorea tu desgaste físico durante el juego. Controla la intensidad de cada golpe y optimiza tu rendimiento a lo largo del partido.',
            'icon': 'fitness',
            'order': 4
        }
    ]
    
    for feature_data in features_data:
        ProductFeature.objects.create(product=product, **feature_data)
    
    # Especificaciones técnicas
    specs_data = [
        {'name': 'Duración de batería', 'value': '4h 30min', 'unit': '', 'order': 1},
        {'name': 'Conectividad', 'value': 'Bluetooth 5.0', 'unit': '', 'order': 2},
        {'name': 'Resistencia', 'value': 'IPX7', 'unit': '', 'order': 3},
        {'name': 'Peso', 'value': '12', 'unit': 'g', 'order': 4},
        {'name': 'Dimensiones', 'value': '4x2x1', 'unit': 'cm', 'order': 5},
        {'name': 'Material', 'value': 'Fibra de carbono', 'unit': '', 'order': 6},
        {'name': 'Memoria', 'value': '500', 'unit': 'partidos', 'order': 7},
        {'name': 'Precisión', 'value': '±2', 'unit': '%', 'order': 8}
    ]
    
    for spec_data in specs_data:
        ProductSpecification.objects.create(product=product, **spec_data)

# Crear categorías de blog
category, created = BlogCategory.objects.get_or_create(
    name="Técnica y Consejos",
    defaults={'slug': 'tecnica-consejos', 'description': 'Consejos para mejorar tu técnica de pádel'}
)

# Crear posts de blog de ejemplo
blog_posts_data = [
    {
        'title': 'Cómo mejorar tu técnica de remate en pádel',
        'slug': 'como-mejorar-tecnica-remate-padel',
        'excerpt': 'Descubre los secretos para ejecutar remates más efectivos y potentes en el pádel. Analizamos la técnica correcta, errores comunes y ejercicios específicos para mejorar tu juego ofensivo.',
        'content': 'El remate es uno de los golpes más espectaculares y decisivos en el pádel...',
        'author': 'PadelStats Team',
        'published': True
    },
    {
        'title': 'Análisis de datos: ¿Cuál es tu zona de golpe ideal?',
        'slug': 'analisis-datos-zona-golpe-ideal',
        'excerpt': 'Con PadelStats hemos analizado miles de golpes para determinar cuál es la zona óptima de impacto en la pala. Te mostramos los resultados y cómo aplicarlos a tu juego.',
        'content': 'Nuestros datos muestran patrones interesantes en las zonas de impacto...',
        'author': 'Dr. Carlos Martínez',
        'published': True
    },
    {
        'title': 'Guía completa: Cómo conectar PadelStats a tu móvil',
        'slug': 'guia-conectar-padelstats-movil', 
        'excerpt': 'Tutorial paso a paso para conectar tu sensor PadelStats con la aplicación móvil. Incluye solución a problemas comunes de conectividad y configuración inicial.',
        'content': 'Conectar tu sensor PadelStats a tu smartphone es muy sencillo...',
        'author': 'Soporte Técnico',
        'published': True
    }
]

for post_data in blog_posts_data:
    post, created = BlogPost.objects.get_or_create(
        slug=post_data['slug'],
        defaults=post_data
    )
    if created:
        print(f"Post creado: {post.title}")

# Crear FAQs
faqs_data = [
    {
        'question': '¿Cómo descargar la app PadelStats en mi móvil?',
        'answer': 'Puedes descargar la app PadelStats de forma completamente gratuita desde las tiendas oficiales: Play Store para Android y App Store para iOS. Simplemente busca "PadelStats" en tu tienda de aplicaciones y descárgala.',
        'order': 1
    },
    {
        'question': '¿Cómo conectar mi PadelStats al móvil?',
        'answer': 'Para conectar tu sensor: 1) Ten la app instalada, 2) Enciende el sensor (botón 3 seg), 3) Abre la app y toca "Conectar Sensor", 4) Selecciona tu dispositivo, 5) Confirma el emparejamiento.',
        'order': 2
    },
    {
        'question': '¿Cuánto dura la batería del PadelStats?',
        'answer': 'La batería tiene una duración de 4 horas y 30 minutos de uso continuo. Suficiente para 6-8 partidos completos. Se carga completamente en 2 horas con USB-C.',
        'order': 3
    },
    {
        'question': '¿Qué tan resistente es el PadelStats?',
        'answer': 'El PadelStats es muy duradera con certificación IPX7 (resistente al agua y sudor). Su carcasa de fibra de carbono soporta impactos fuertes. Probado en +100,000 golpes sin degradación.',
        'order': 4
    }
]

for faq_data in faqs_data:
    faq, created = FAQ.objects.get_or_create(
        question=faq_data['question'],
        defaults={
            'answer': faq_data['answer'],
            'order': faq_data['order'],
            'is_active': True
        }
    )
    if created:
        print(f"FAQ creada: {faq.question}")

# Crear código de descuento inicial
discount_code, created = DiscountCode.objects.get_or_create(
    code='XTRES',
    defaults={
        'discount_percentage': 10.0,
        'is_active': True,
        'usage_limit': 100,  # Límite de 100 usos
        'used_count': 0
    }
)

if created:
    print(f"Código de descuento creado: {discount_code.code} - {discount_code.discount_percentage}%")

print("¡Base de datos poblada con datos de ejemplo!")
print("Producto PadelStats creado con características y especificaciones")
print("Posts de blog creados")
print("FAQs creadas")
print("Código de descuento XTRES (10%) creado")
print("\nPuedes acceder al admin en: http://localhost:8000/admin")
print("API endpoints disponibles en: http://localhost:8000/api/")