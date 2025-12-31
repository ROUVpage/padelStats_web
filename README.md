# PadelStats Web Application

Una aplicación web completa para PadelStats - el sensor inteligente que se coloca en el canto de las palas de pádel para medir potencia, precisión, efecto y exigencia física.

## 🏗️ Estructura del Proyecto

```
padelStats_web/
├── backend/                    # Django REST API
│   ├── manage.py
│   ├── requirements.txt
│   ├── padelstats_backend/    # Configuración principal
│   ├── products/              # API de productos
│   ├── blog/                  # API del blog
│   └── help/                  # API de ayuda y FAQ
├── frontend/                   # React.js aplicación
│   ├── package.json
│   ├── src/
│   │   ├── components/        # Componentes reutilizables
│   │   ├── pages/            # Páginas principales
│   │   ├── App.js
│   │   └── index.js
│   └── public/
└── docs/                      # Documentación
```

## ✨ Características Principales

### 🎯 Secciones de la Web

1. **Inicio**: Página principal con hero section y características destacadas
2. **Producto**: Información detallada con pricing y especificaciones técnicas
3. **Blog**: Artículos con imagen, título e introducción (navegable)
4. **Ayuda**: Formulario de contacto + FAQ desplegable
5. **Carrito**: Sistema de compra completo con códigos de descuento

### 💰 Información de Precios

- **Precio regular**: €84.99 (tachado)
- **Precio con descuento**: €59.99
- **Oferta pack de 4**: €49.99 por unidad

### 📱 Características del Producto

- **Medición de potencia**: Análisis de fuerza en cada golpe
- **Análisis de precisión**: Control y exactitud de golpes
- **Medición de efecto**: Spin y efectos aplicados
- **Exigencia física**: Monitor de desgaste físico
- **Duración batería**: 4h 30min
- **Resistencia**: Muy duradera (IPX7)
- **App móvil**: Gratuita en Play Store y App Store

## 🚀 Instalación y Uso

### Backend (Django)

1. Navega al directorio backend:
   ```bash
   cd backend
   ```

2. Instala las dependencias:
   ```bash
   pip install -r requirements.txt
   ```

3. Ejecuta las migraciones:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

4. Crea un superusuario:
   ```bash
   python manage.py createsuperuser
   ```

5. Ejecuta el servidor:
   ```bash
   python manage.py runserver
   ```

El backend estará disponible en `http://localhost:8000`

### Frontend (React)

1. Navega al directorio frontend:
   ```bash
   cd frontend
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Ejecuta la aplicación:
   ```bash
   npm start
   ```

El frontend estará disponible en `http://localhost:3000`

## 🔗 API Endpoints

### Productos
- `GET /api/products/` - Lista de productos
- `GET /api/products/{id}/` - Detalle de producto

### Blog  
- `GET /api/blog/` - Lista de artículos (con excerpt)
- `GET /api/blog/{slug}/` - Artículo completo
- `GET /api/blog/categories/` - Categorías del blog

### Ayuda
- `GET /api/help/faq/` - Preguntas frecuentes
- `POST /api/help/contact/` - Envío de formulario de contacto

### Pedidos y Carrito
- `POST /api/orders/validate-discount/` - Validar código de descuento
- `POST /api/orders/create/` - Crear nuevo pedido
- `GET /api/orders/` - Lista de pedidos (admin)

## 🎨 Tecnologías Utilizadas

### Backend
- **Django 5.0.8**: Framework web
- **Django REST Framework**: API REST
- **django-cors-headers**: CORS para React
- **Pillow**: Procesamiento de imágenes
- **SQLite**: Base de datos (desarrollo)

### Frontend
- **React 18**: Biblioteca de interfaz de usuario
- **React Router DOM**: Navegación SPA
- **Tailwind CSS**: Framework de utilidades CSS
- **React Icons**: Iconos
- **Axios**: Cliente HTTP para API calls
- **Framer Motion**: Animaciones

## 📱 Responsive Design

La aplicación está completamente optimizada para:
- 📱 **Móviles** (320px - 768px)
- 💻 **Tablets** (768px - 1024px)  
- 🖥️ **Desktop** (1024px+)

## 🔧 Configuración de Desarrollo

### Variables de Entorno (Backend)

Crea un archivo `.env` en el directorio backend:

```env
SECRET_KEY=tu-clave-secreta-aqui
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
```

### Proxy de Desarrollo (Frontend)

El frontend está configurado para hacer proxy al backend durante el desarrollo.

## 🚢 Despliegue

### Backend (Django)
1. Configura las variables de entorno para producción
2. Recolecta archivos estáticos: `python manage.py collectstatic`
3. Usa un servidor como Gunicorn + Nginx

### Frontend (React)
1. Construye la aplicación: `npm run build`
2. Sirve los archivos estáticos con Nginx o CDN

## 📝 Funcionalidades Implementadas

### ✅ Completado
- [x] Estructura de proyecto Django + React
- [x] Modelos de base de datos (Productos, Blog, FAQ, Contacto)
- [x] API REST completa
- [x] Frontend responsive con Tailwind CSS
- [x] Página de producto con pricing dinámico
- [x] Sistema de blog con artículos completos
- [x] Sección de ayuda con FAQ desplegable
- [x] Formulario de contacto funcional
- [x] Navegación SPA optimizada
- [x] **Sistema de carrito de compras**
- [x] **Códigos de descuento con validación**
- [x] **Envío automático de emails de pedidos**
- [x] **Gestión completa de pedidos en admin**

### 🔄 Próximas Mejoras
- [ ] Sistema de autenticación de usuarios
- [ ] Panel de administración mejorado
- [ ] Integración con pasarela de pagos
- [ ] Sistema de notificaciones
- [ ] SEO avanzado y sitemap
- [ ] Progressive Web App (PWA)
- [ ] Tests unitarios e integración

## 📧 Soporte

Para preguntas o problemas:
- **Email**: soporte@padelstats.com
- **WhatsApp**: +34 600 123 456
- **Horario**: Lun-Vie 9:00-18:00 CET

## 📄 Licencia

© 2024 PadelStats. Todos los derechos reservados.

---

**PadelStats** - Revoluciona tu pádel con inteligencia artificial 🏓⚡