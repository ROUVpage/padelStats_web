# 🚀 Guía de Instalación Completa - PadelStats Web

Esta guía te permitirá instalar y ejecutar el sistema PadelStats en un ordenador nuevo desde cero.

## 📋 Requisitos Previos

### 1. Software Base Requerido

#### Python 3.8+
```bash
# Verificar si está instalado
python --version
# o
python3 --version

# Si no está instalado, descargar de: https://www.python.org/downloads/
# ⚠️ IMPORTANTE: Marcar "Add Python to PATH" durante la instalación
```

#### Node.js 16+
```bash
# Verificar si está instalado
node --version
npm --version

# Si no está instalado, descargar de: https://nodejs.org/
# Descargar la versión LTS (recomendada)
```

#### Git
```bash
# Verificar si está instalado
git --version

# Si no está instalado, descargar de: https://git-scm.com/
```

#### Google Chrome
```bash
# Necesario para la automatización Selenium
# Descargar de: https://www.google.com/chrome/
```

## 📂 Paso 1: Clonar el Proyecto

```bash
# Clonar el repositorio (o descargar ZIP)
git clone [URL_DEL_REPOSITORIO]
cd padelStats_web

# O si descargaste ZIP, extraer y navegar a la carpeta
```

## 🐍 Paso 2: Configuración del Backend (Django)

### 2.1 Crear Entorno Virtual

```bash
# Navegar al backend
cd backend

# Crear entorno virtual
python -m venv venv

# Activar entorno virtual
# En Windows:
venv\Scripts\activate
# En macOS/Linux:
source venv/bin/activate

# Deberías ver (venv) al inicio de tu terminal
```

### 2.2 Instalar Dependencias Python

```bash
# Asegúrate de estar en /backend con el entorno activado
pip install --upgrade pip
pip install -r requirements.txt

# Si hay errores, instalar uno por uno:
pip install Django==5.0.8
pip install djangorestframework==3.15.2
pip install django-cors-headers==4.3.1
pip install Pillow==10.4.0
pip install python-dotenv==1.0.0
pip install selenium==4.15.2
pip install webdriver-manager==4.0.1
```

### 2.3 Configurar Base de Datos

```bash
# Crear migraciones y base de datos
python manage.py makemigrations
python manage.py migrate

# Crear superusuario (opcional)
python manage.py createsuperuser

# Poblar con datos iniciales
python populate_db.py
```

### 2.4 Configurar Credenciales

```bash
# Copiar archivo de ejemplo
copy correos_settings_example.py correos_settings.py
# En Linux/Mac: cp correos_settings_example.py correos_settings.py

# Editar correos_settings.py con tus credenciales:
```

**Abrir `correos_settings.py` y completar:**
```python
# CREDENCIALES EPOSTAL (Correos España)
EPOSTAL_USERNAME = "tu_usuario_epostal_real"
EPOSTAL_PASSWORD = "tu_password_epostal_real"

# CREDENCIALES PAYPAL (para pago automático del envío)
PAYPAL_EMAIL = "tu_email_paypal@gmail.com"
PAYPAL_PASSWORD = "tu_password_paypal_real"

# CONFIGURACIÓN SELENIUM
SELENIUM_VISIBLE = True  # False para modo invisible
SELENIUM_TIMEOUT = 20
```

### 2.5 Configurar Email (Gmail)

**Editar `backend/padelstats_backend/settings.py`:**

Buscar la sección EMAIL y actualizar:
```python
# Configuración Email
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'padelstats0@gmail.com'
EMAIL_HOST_PASSWORD = 'tu_password_aplicacion_gmail'  # ⚠️ No la contraseña normal
DEFAULT_FROM_EMAIL = 'padelstats0@gmail.com'
```

**Para obtener el password de aplicación Gmail:**
1. Ir a https://myaccount.google.com/
2. Seguridad → Verificación en 2 pasos (activar si no está)
3. Contraseñas de aplicaciones → Generar nueva
4. Usar esa contraseña de 16 caracteres

### 2.6 Probar Backend

```bash
# Iniciar servidor Django
python manage.py runserver

# Debería aparecer:
# Starting development server at http://127.0.0.1:8000/
# Ctrl+C para parar
```

**Verificar en navegador:**
- http://127.0.0.1:8000/api/products/ (debe mostrar productos JSON)
- http://127.0.0.1:8000/admin/ (panel admin si creaste superusuario)

## ⚛️ Paso 3: Configuración del Frontend (React)

### 3.1 Abrir Nueva Terminal

```bash
# Abrir nueva terminal/cmd y navegar al proyecto
cd padelStats_web/frontend
```

### 3.2 Instalar Dependencias Node.js

```bash
# Instalar dependencias
npm install

# Si hay errores, intentar:
npm install --force
# o
npm install --legacy-peer-deps
```

### 3.3 Probar Frontend

```bash
# Iniciar servidor React
npm start

# Debería abrirse automáticamente http://localhost:3000
# Si no, abrir manualmente en navegador
```

## 🔧 Paso 4: Configuración de Automatización

### 4.1 ChromeDriver (Automático)

El sistema usa `webdriver-manager` que descarga ChromeDriver automáticamente. No necesitas instalarlo manualmente.

### 4.2 Verificar Cuentas Necesarias

**Necesitarás tener:**

1. **Cuenta ePostal (Correos España):**
   - Registrarse en: https://www.epostal.correos.es/
   - Verificar cuenta y activar servicios
   - Tener saldo o método de pago configurado

2. **Cuenta PayPal:**
   - Tener cuenta PayPal activa
   - Saldo suficiente para envíos (~€6-7 por envío)
   - ⚠️ Desactivar verificación en 2 pasos para automatización

## 🧪 Paso 5: Prueba Completa del Sistema

### 5.1 Iniciar Ambos Servidores

**Terminal 1 - Backend:**
```bash
cd backend
venv\Scripts\activate  # Activar entorno virtual
python manage.py runserver
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

### 5.2 Probar Flujo Completo

1. **Abrir:** http://localhost:3000
2. **Navegar a Producto:** Clic en "Ver Producto" 
3. **Añadir al Carrito:** Seleccionar cantidad y añadir
4. **Ir al Carrito:** Clic en ícono carrito
5. **Hacer Pedido:** Completar formulario con datos reales
6. **Verificar Email:** Comprobar que llegan emails de confirmación

### 5.3 Monitorizar Automatización

```bash
# En terminal del backend, verás logs como:
# [INFO] Iniciando automatización para pedido #1
# [INFO] Login exitoso en ePostal
# [INFO] Completando datos destinatario...
# etc.
```

## 📁 Estructura Final de Carpetas

```
padelStats_web/
├── backend/
│   ├── venv/                     # Entorno virtual Python
│   ├── db.sqlite3               # Base de datos
│   ├── correos_settings.py      # TUS credenciales (no subir a Git)
│   └── ...
├── frontend/
│   ├── node_modules/            # Dependencias Node.js
│   └── ...
└── ...
```

## 🔒 Variables de Entorno (Producción)

Para producción, usa variables de entorno en lugar de archivos:

```bash
# Linux/Mac
export EPOSTAL_USERNAME="tu_usuario"
export EPOSTAL_PASSWORD="tu_password"
export PAYPAL_EMAIL="tu_email"
export PAYPAL_PASSWORD="tu_password"

# Windows
set EPOSTAL_USERNAME=tu_usuario
set EPOSTAL_PASSWORD=tu_password
set PAYPAL_EMAIL=tu_email
set PAYPAL_PASSWORD=tu_password
```

## 🐛 Solución de Problemas Comunes

### Error: Python no encontrado
```bash
# Verificar instalación
where python   # Windows
which python   # Linux/Mac

# Si no está en PATH, reinstalar Python marcando "Add to PATH"
```

### Error: npm no encontrado
```bash
# Verificar Node.js
where node     # Windows  
which node     # Linux/Mac

# Reinstalar Node.js desde nodejs.org
```

### Error: ChromeDriver
```bash
# El sistema lo descarga automáticamente, pero si falla:
# Descargar manualmente de: https://chromedriver.chromium.org/
# Colocar en PATH o especificar ruta en correos_settings.py
```

### Error: Selenium TimeoutException
```bash
# En correos_settings.py aumentar timeout:
SELENIUM_TIMEOUT = 30

# O activar modo visible para debug:
SELENIUM_VISIBLE = True
```

### Error: Email no se envía
```bash
# Verificar password de aplicación Gmail (no contraseña normal)
# Verificar que 2FA esté activado en Gmail
# Comprobar configuración SMTP en settings.py
```

### Error: pip install falla
```bash
# Actualizar pip
python -m pip install --upgrade pip

# Instalar con opciones alternativas
pip install --user nombre_paquete
pip install --no-cache-dir nombre_paquete
```

## 🚀 Despliegue en Producción

### Para servidor web:
1. Usar Gunicorn + Nginx (Django)
2. Configurar variables de entorno
3. Usar base de datos PostgreSQL
4. Configurar SSL/HTTPS
5. Instalar ChromeDriver en servidor

## 📞 Soporte

Si tienes problemas:
1. Revisar logs en terminal
2. Verificar que todas las dependencias están instaladas
3. Comprobar credenciales en correos_settings.py
4. Verificar que Chrome y ChromeDriver son compatibles

---

## ✅ Checklist Final

- [ ] Python 3.8+ instalado
- [ ] Node.js 16+ instalado
- [ ] Google Chrome instalado
- [ ] Repositorio clonado/descargado
- [ ] Backend: dependencias instaladas
- [ ] Backend: base de datos migrada
- [ ] Backend: correos_settings.py configurado
- [ ] Backend: email Gmail configurado
- [ ] Frontend: dependencias instaladas
- [ ] Cuentas: ePostal registrada y verificada
- [ ] Cuentas: PayPal con saldo disponible
- [ ] Prueba: pedido de prueba realizado exitosamente

**¡Una vez completado todo, tendrás PadelStats funcionando completamente!** 🏓

---

*Guía de instalación actualizada - Enero 2026*