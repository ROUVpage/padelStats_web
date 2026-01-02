#!/usr/bin/env python3
"""
Script de prueba para verificar configuración de automatización
Ejecutar desde el directorio backend:
python test_automation.py
"""

import os
import sys

# Añadir el directorio del proyecto al PATH
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Configurar Django
import django
from django.conf import settings
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'padelstats_backend.settings')
django.setup()

from orders.correos_automation import CorreosAutomationService
import logging

# Configurar logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

def test_credenciales():
    """Probar que las credenciales están bien configuradas"""
    logger.info("=== PRUEBA DE CONFIGURACIÓN PADELSTATS ===")
    
    try:
        # Inicializar servicio
        automation = CorreosAutomationService()
        
        logger.info(f"✅ Usuario ePostal: {automation.epostal_username}")
        logger.info(f"✅ PayPal Modo Manual: {'Activado' if automation.paypal_manual_mode else 'Desactivado'}")
        logger.info(f"✅ Teléfono: {automation.remitente['telefono']}")
        logger.info(f"✅ Costo de envío: €{automation.shipping_cost}")
        
        # Verificar especificaciones del producto
        specs = automation.producto_specs
        logger.info(f"✅ Producto: {specs['peso']}g, {specs['largo']}x{specs['ancho']}x{specs['alto']}cm")
        
        print("\n" + "="*50)
        print("CONFIGURACIÓN VERIFICADA CORRECTAMENTE")
        print("="*50)
        print(f"📧 ePostal: {automation.epostal_username}")
        print(f"🔐 Contraseña: {'*' * len(automation.epostal_password)}")
        print(f"📱 Teléfono: {automation.remitente['telefono']}")
        print(f"💳 PayPal: Modo manual activado")
        print(f"📦 Producto: PadelStats Sensor (2kg)")
        print(f"💰 Envío: €{automation.shipping_cost}")
        print("="*50)
        
        return True
        
    except Exception as e:
        logger.error(f"❌ Error en configuración: {e}")
        return False

def test_selenium_basico():
    """Probar que Selenium funciona básicamente"""
    logger.info("\n=== PRUEBA BÁSICA SELENIUM ===")
    
    try:
        from selenium import webdriver
        from selenium.webdriver.chrome.options import Options
        from webdriver_manager.chrome import ChromeDriverManager
        from selenium.webdriver.chrome.service import Service
        
        # Configurar Chrome
        options = Options()
        options.add_argument('--disable-blink-features=AutomationControlled')
        options.add_experimental_option("excludeSwitches", ["enable-automation"])
        options.add_experimental_option('useAutomationExtension', False)
        
        # Inicializar driver
        service = Service(ChromeDriverManager().install())
        driver = webdriver.Chrome(service=service, options=options)
        
        # Probar navegación básica
        driver.get("https://www.google.com")
        title = driver.title
        
        driver.quit()
        
        logger.info(f"✅ Selenium funciona correctamente")
        logger.info(f"✅ Título de prueba: {title}")
        
        print("\n" + "="*50)
        print("SELENIUM VERIFICADO CORRECTAMENTE")
        print("="*50)
        print("✅ ChromeDriver instalado automáticamente")
        print("✅ Navegador Chrome funciona")
        print("✅ Navegación web exitosa")
        print("="*50)
        
        return True
        
    except Exception as e:
        logger.error(f"❌ Error en Selenium: {e}")
        print("\n" + "="*50)
        print("❌ ERROR EN SELENIUM")
        print("="*50)
        print("Posibles soluciones:")
        print("1. Instalar Google Chrome")
        print("2. pip install selenium webdriver-manager")
        print("3. Verificar conexión a internet")
        print("="*50)
        return False

def main():
    """Función principal de pruebas"""
    print("\n🏓 PADELSTATS - VERIFICACIÓN DE CONFIGURACIÓN")
    print("="*60)
    
    # Test 1: Configuración
    config_ok = test_credenciales()
    
    # Test 2: Selenium  
    selenium_ok = test_selenium_basico()
    
    # Resultado final
    print("\n" + "="*60)
    print("RESULTADO FINAL")
    print("="*60)
    
    if config_ok and selenium_ok:
        print("🟢 SISTEMA LISTO PARA USAR")
        print("✅ Configuración correcta")
        print("✅ Selenium funcional")
        print("\nPuedes hacer un pedido de prueba en:")
        print("http://localhost:3000")
        print("\nLa automatización funcionará con:")
        print("- Login automático en ePostal")  
        print("- Entrada manual de PayPal")
        print("- Creación automática del envío")
    else:
        print("🔴 SISTEMA REQUIERE CONFIGURACIÓN")
        if not config_ok:
            print("❌ Verificar correos_settings.py")
        if not selenium_ok:
            print("❌ Instalar Chrome y dependencias")
    
    print("="*60)

if __name__ == "__main__":
    main()