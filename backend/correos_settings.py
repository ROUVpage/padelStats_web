# CONFIGURACIÓN DE AUTOMATIZACIÓN CORREOS ESPAÑA
# ==================================================
# 
# Instrucciones de configuración:
# 1. Este archivo contiene las credenciales reales
# 2. NO subir a Git (está en .gitignore)
# 3. Para PayPal se usará entrada manual durante el proceso

# CREDENCIALES EPOSTAL (Correos España)
# Obtener en: https://www.epostal.correos.es/
EPOSTAL_USERNAME = "padelstats0@gmail.com"
EPOSTAL_PASSWORD = "morre678224Ruben"

# CREDENCIALES PAYPAL
# Se solicitarán manualmente durante el proceso para mayor seguridad
PAYPAL_EMAIL = ""  # Se pedirá durante la automatización
PAYPAL_PASSWORD = ""  # Se pedirá durante la automatización
PAYPAL_MANUAL_MODE = True  # Modo manual activado

# INFORMACIÓN DE CONTACTO
PHONE_NUMBER = "691432907"

# CONFIGURACIÓN SELENIUM
# Path al ChromeDriver si no está en PATH
# Descargar de: https://chromedriver.chromium.org/
CHROMEDRIVER_PATH = None  # None para usar PATH, o ruta completa

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

"""
# CONFIGURACIÓN ENVÍO
SHIPPING_COST = 5.99  # Costo fijo de envío
CONTRAREMBOLSO_COMMISSION = 0.03  # 3% de comisión contrarembolso
CORREOS_PASSWORD=tu_password_epostal
CORREOS_PHONE=tu_telefono
PAYPAL_EMAIL=tu_email_paypal
PAYPAL_PASSWORD=tu_password_paypal
CORREOS_AUTOMATION_ENABLED=true
"""

# Dependencias adicionales para requirements.txt:
"""
selenium==4.15.2
webdriver-manager==4.0.1
"""

# Comando para instalar ChromeDriver:
"""
# Ubuntu/Debian:
sudo apt-get install chromium-browser chromium-chromedriver

# Windows:
# Descargar desde: https://chromedriver.chromium.org/
# Colocar en PATH o especificar ruta en CHROME_DRIVER_PATH

# MacOS:
brew install --cask google-chrome
brew install chromedriver
"""