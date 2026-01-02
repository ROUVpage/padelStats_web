# CONFIGURACIÓN DE AUTOMATIZACIÓN CORREOS ESPAÑA
# ==================================================
# 
# Instrucciones de configuración:
# 1. Copiar este archivo como 'correos_settings.py' 
# 2. Completar con tus credenciales reales
# 3. NO subir correos_settings.py a Git (está en .gitignore)

# CREDENCIALES EPOSTAL (Correos España)
# Obtener en: https://www.epostal.correos.es/
EPOSTAL_USERNAME = "tu_usuario_epostal"
EPOSTAL_PASSWORD = "tu_password_epostal"

# CREDENCIALES PAYPAL
# Para automatizar el pago del envío
PAYPAL_EMAIL = "tu_email_paypal"
PAYPAL_PASSWORD = "tu_password_paypal"

# CONFIGURACIÓN SELENIUM
# Path al ChromeDriver si no está en PATH
# Descargar de: https://chromedriver.chromium.org/
CHROMEDRIVER_PATH = None  # None para usar PATH, o ruta completa: "C:/path/to/chromedriver.exe"

# CONFIGURACIÓN DEBUGGING
# Habilitar modo visible (False para headless)
SELENIUM_VISIBLE = True

# TIMEOUT CONFIGURACIÓN
# Tiempo máximo para esperar elementos (segundos)
SELENIUM_TIMEOUT = 20

# CONFIGURACIÓN DE LOGGING
import logging

CORREOS_LOGGER = logging.getLogger('correos_automation')
CORREOS_LOGGER.setLevel(logging.INFO)

handler = logging.StreamHandler()
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
handler.setFormatter(formatter)
CORREOS_LOGGER.addHandler(handler)

# CONFIGURACIÓN URLS
EPOSTAL_LOGIN_URL = "https://www.epostal.correos.es/loginAction.do"
EPOSTAL_CREATE_SHIPMENT_URL = "https://www.epostal.correos.es/nuevoEnvioAction.do"

# ESPECIFICACIONES PRODUCTO PADELSTATS
PRODUCT_SPECS = {
    'peso_kg': 2.0,
    'largo_cm': 22,
    'ancho_cm': 10,
    'alto_cm': 4,
    'descripcion': 'PadelStats Sensor - Dispositivo deportivo'
}

# CONFIGURACIÓN ENVÍO
SHIPPING_COST = 5.99  # Costo fijo de envío
CONTRAREMBOLSO_COMMISSION = 0.03  # 3% de comisión contrarembolso