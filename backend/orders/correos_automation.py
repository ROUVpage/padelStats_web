"""
Servicio de automatización completo para Correos España + PayPal
Automatiza la creación de envíos contrarembolso desde ePostal
"""

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select, WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys
from django.conf import settings
import time
import logging

logger = logging.getLogger(__name__)

class CorreosAutomationService:
    
    def __init__(self):
        self.driver = None
        self.wait = None
        
        # Importar credenciales desde correos_settings.py
        try:
            from ..correos_settings import (
                EPOSTAL_USERNAME, EPOSTAL_PASSWORD, 
                PAYPAL_EMAIL, PAYPAL_PASSWORD, PAYPAL_MANUAL_MODE,
                PHONE_NUMBER
            )
            
            # Credenciales ePostal desde configuración
            self.epostal_username = EPOSTAL_USERNAME
            self.epostal_password = EPOSTAL_PASSWORD
            
            # PayPal desde configuración
            self.paypal_manual_mode = PAYPAL_MANUAL_MODE
            self.paypal_email = PAYPAL_EMAIL
            self.paypal_password = PAYPAL_PASSWORD
            
            logger.info(f"✅ Credenciales cargadas desde correos_settings.py")
            logger.info(f"ePostal: {self.epostal_username}")
            logger.info(f"PayPal modo: {'Manual' if self.paypal_manual_mode else 'Automático'}")
            
        except ImportError as e:
            logger.error(f"❌ Error cargando configuración: {e}")
            # Fallback a credenciales hardcodeadas temporalmente
            self.epostal_username = "padelstats0@gmail.com"
            self.epostal_password = "morre678224Ruben"
            self.paypal_manual_mode = True
            self.paypal_email = ""
            self.paypal_password = ""
        
        # Datos del remitente (Rubén - fijos)
        self.remitente = {
            'nombre': 'Rubén Mora Torres',
            'direccion': 'Avenida Andrés Segovia',
            'codigoPostal': '23700',
            'poblacion': 'LINARES',
            'provincia': 'Jaén', 
            'telefono': '691432907',
            'email': 'padelstats0@gmail.com'
        }
        
        # Especificaciones del producto PadelStats
        self.producto_specs = {
            'peso': 2000,  # 2kg en gramos
            'largo': 22,   # cm
            'ancho': 10,   # cm
            'alto': 4,     # cm
            'descripcion': 'PadelStats Sensor'
        }
        
        self.shipping_cost = 5.99
        
        logger.info("✅ CorreosAutomationService inicializado")
        logger.info(f"Usuario ePostal: {self.epostal_username}")
        logger.info(f"PayPal Modo Manual: {'Activado' if self.paypal_manual_mode else 'Desactivado'}")
    
    def setup_driver(self):
        """Configurar navegador automático"""
        options = Options()
        if not settings.DEBUG:
            options.add_argument('--headless')  # Sin interfaz en producción
        
        options.add_argument('--no-sandbox')
        options.add_argument('--disable-dev-shm-usage')
        options.add_argument('--disable-gpu')
        options.add_argument('--window-size=1920,1080')
        
        self.driver = webdriver.Chrome(options=options)
        self.driver.implicitly_wait(10)
        self.wait = WebDriverWait(self.driver, 30)
    
    def crear_envio_completo(self, order):
        """
        Proceso completo: crear envío contrarembolso + pagar con PayPal
        
        Args:
            order: Instancia del modelo Order con todos los datos del cliente
            
        Returns:
            str: Número de seguimiento o None si falló
        """
        try:
            logger.info(f"Iniciando automatización para pedido #{order.id}")
            self.setup_driver()
            
            # 1. Login en ePostal
            if not self._login_epostal():
                raise Exception("Error en login ePostal")
            
            # 2. Navegar a crear envío
            if not self._navegar_a_crear_envio():
                raise Exception("Error navegando a crear envío")
            
            # 3. Completar formulario con datos del cliente
            if not self._completar_formulario_envio(order):
                raise Exception("Error completando formulario")
            
            # 4. Obtener número de seguimiento
            tracking_number = self._obtener_numero_seguimiento()
            if not tracking_number:
                raise Exception("No se pudo obtener número de seguimiento")
            
            # 5. Procesar pago con PayPal
            if not self._procesar_pago_paypal():
                raise Exception("Error procesando pago PayPal")
            
            logger.info(f"Envío creado exitosamente: {tracking_number}")
            return tracking_number
            
        except Exception as e:
            logger.error(f"Error en automatización pedido #{order.id}: {str(e)}")
            return None
        finally:
            if self.driver:
                self.driver.quit()
    
    def _login_epostal(self):
        """Login automático en ePostal con credenciales configuradas"""
        try:
            logger.info("🔐 Iniciando login en ePostal...")
            self.driver.get("https://epostal.correos.es/")
            
            # Buscar y completar campo email (puede ser 'email' o 'usuario')
            email_field = None
            try:
                email_field = self.wait.until(EC.presence_of_element_located((By.NAME, "email")))
            except:
                try:
                    email_field = self.driver.find_element(By.NAME, "usuario")
                except:
                    email_field = self.driver.find_element(By.NAME, "usuarioContratos")
            
            email_field.clear()
            email_field.send_keys(self.epostal_username)
            logger.info(f"📧 Email introducido: {self.epostal_username}")
            
            # Campo contraseña (puede ser 'password', 'contrasena' o 'claveContratos')
            password_field = None
            try:
                password_field = self.driver.find_element(By.NAME, "password")
            except:
                try:
                    password_field = self.driver.find_element(By.NAME, "contrasena")
                except:
                    password_field = self.driver.find_element(By.NAME, "claveContratos")
            
            password_field.clear()
            password_field.send_keys(self.epostal_password)
            logger.info("🔑 Contraseña introducida")
            
            # Buscar botón de login
            login_button = None
            try:
                login_button = self.driver.find_element(By.XPATH, "//button[contains(text(), 'INICIAR SESIÓN')]")
            except:
                try:
                    login_button = self.driver.find_element(By.XPATH, "//button[@type='submit']")
                except:
                    login_button = self.driver.find_element(By.NAME, "entrar")
            
            login_button.click()
            logger.info("🖱️ Click en botón de login")
            
            # Esperar login exitoso
            time.sleep(5)
            
            # Verificar que el login fue exitoso
            current_url = self.driver.current_url
            if "epostal.correos.es" in current_url and "login" not in current_url.lower():
                logger.info("✅ Login ePostal exitoso")
                return True
            else:
                logger.error("❌ Login falló - verificar credenciales")
                return False
            
        except Exception as e:
            logger.error(f"❌ Error en login ePostal: {str(e)}")
            return False
    
    def _navegar_a_crear_envio(self):
        """Navegar al formulario de crear envío"""
        try:
            # Ir directamente a la URL de crear envío
            self.driver.get("https://epostal.correos.es/OV2PREENVWEB/jsp/preenv/edicionEnvio.faces")
            
            # Verificar que estamos en el formulario correcto
            self.wait.until(EC.presence_of_element_located((By.XPATH, "//h2[contains(text(), 'Crear envío')]")))
            logger.info("Navegación a crear envío exitosa")
            return True
            
        except Exception as e:
            logger.error(f"Error navegando a crear envío: {str(e)}")
            return False
    
    def _completar_formulario_envio(self, order):
        """Completar el formulario con datos del pedido"""
        try:
            # DATOS DEL DESTINATARIO
            self._completar_destinatario(order)
            
            # DATOS DEL REMITENTE (verificar que están correctos)
            self._verificar_remitente()
            
            # CONFIGURAR PAQUETE
            self._configurar_paquete()
            
            # ACTIVAR CONTRAREMBOLSO
            # El total incluye precio del producto + 5.99€ envío
            total_contrarembolso = order.total_amount + 5.99
            self._activar_contrarembolso(order, total_contrarembolso)
            
            logger.info("Formulario completado correctamente")
            return True
            
        except Exception as e:
            logger.error(f"Error completando formulario: {str(e)}")
            return False
    
    def _completar_destinatario(self, order):
        """Completar datos del destinatario (cliente) - CAMPOS REALES ePostal"""
        
        # Limpiar y separar nombre completo del cliente
        nombre_parts = order.customer_name.strip().split(' ')
        nombre = nombre_parts[0] if len(nombre_parts) > 0 else 'Cliente'
        primer_apellido = nombre_parts[1] if len(nombre_parts) > 1 else ''
        segundo_apellido = ' '.join(nombre_parts[2:]) if len(nombre_parts) > 2 else ''
        
        # NOMBRE
        nombre_field = self.wait.until(
            EC.presence_of_element_located((By.NAME, "nombre"))
        )
        nombre_field.clear()
        nombre_field.send_keys(nombre)
        
        # PRIMER APELLIDO
        primer_apellido_field = self.driver.find_element(By.NAME, "primerApellido")
        primer_apellido_field.clear()
        primer_apellido_field.send_keys(primer_apellido)
        
        # SEGUNDO APELLIDO
        if segundo_apellido:
            segundo_apellido_field = self.driver.find_element(By.NAME, "segundoApellido")
            segundo_apellido_field.clear()
            segundo_apellido_field.send_keys(segundo_apellido)
        
        # EMPRESA (opcional - podemos poner Cliente PadelStats)
        empresa_field = self.driver.find_element(By.NAME, "empresa")
        empresa_field.clear()
        empresa_field.send_keys("Cliente PadelStats")
        
        # DIRECCIÓN
        direccion_field = self.driver.find_element(By.NAME, "direccion")
        direccion_field.clear()
        direccion_field.send_keys(order.shipping_address)
        
        # CÓDIGO POSTAL
        cp_field = self.driver.find_element(By.NAME, "codigoPostal")
        cp_field.clear()
        cp_field.send_keys(order.shipping_postal_code)
        
        # LOCALIDAD
        localidad_field = self.driver.find_element(By.NAME, "localidad")
        localidad_field.clear()
        localidad_field.send_keys(order.shipping_city)
        
        # PROVINCIA - Autoselección basada en localidad
        self._seleccionar_provincia(order.shipping_city)
        
        # MÓVIL ENVÍO SMS
        movil_field = self.driver.find_element(By.NAME, "movilSMS")
        movil_field.clear()
        movil_field.send_keys(order.customer_phone)
        
        # TELÉFONO CONTACTO
        telefono_field = self.driver.find_element(By.NAME, "telefonoContacto")
        telefono_field.clear()
        telefono_field.send_keys(order.customer_phone)
        
        # EMAIL
        email_field = self.driver.find_element(By.NAME, "email")
        email_field.clear()
        email_field.send_keys(order.customer_email)
        
        logger.info(f"Datos destinatario completados: {order.customer_name} - {order.shipping_city}")
    
    def _seleccionar_provincia(self, ciudad):
        """Seleccionar provincia basada en la ciudad"""
        # Mapeo ciudad -> provincia más comunes
        provincias_map = {
            'madrid': 'MADRID',
            'barcelona': 'BARCELONA', 
            'valencia': 'VALENCIA',
            'sevilla': 'SEVILLA',
            'bilbao': 'VIZCAYA',
            'zaragoza': 'ZARAGOZA',
            'malaga': 'MALAGA',
            'murcia': 'MURCIA',
            'palma': 'ILLES BALEARS',
            'las palmas': 'LAS PALMAS',
            'linares': 'JAEN',
            'cordoba': 'CORDOBA',
            'granada': 'GRANADA',
            'almeria': 'ALMERIA',
            'cadiz': 'CADIZ',
            'huelva': 'HUELVA',
            'jaen': 'JAEN'
        }
        
        ciudad_lower = ciudad.lower()
        provincia = 'MADRID'  # Por defecto
        
        # Buscar provincia por ciudad
        for key, value in provincias_map.items():
            if key in ciudad_lower:
                provincia = value
                break
        
        try:
            provincia_select = Select(self.driver.find_element(By.NAME, "provincia"))
            provincia_select.select_by_visible_text(provincia)
            logger.info(f"Provincia seleccionada: {provincia}")
        except Exception as e:
            logger.warning(f"No se pudo seleccionar provincia {provincia}: {e}")
    
    def _verificar_remitente(self):
        """Verificar que los datos del remitente están correctos"""
        try:
            # Los datos del remitente deberían estar precargados
            # Solo verificamos que están presentes
            nombre_remitente = self.driver.find_element(By.NAME, "nombreRemitente")
            if not nombre_remitente.get_attribute("value"):
                nombre_remitente.send_keys(self.remitente['nombre'])
            
            logger.info("Datos remitente verificados")
        except Exception as e:
            logger.warning(f"Error verificando remitente: {str(e)}")
    
    def _configurar_paquete(self):
        """Configurar especificaciones del paquete PadelStats - CAMPOS REALES"""
        
        # REFERENCIA CLIENTE 1 (para identificar el pedido)
        ref1_field = self.driver.find_element(By.NAME, "referenciaCliente1")
        ref1_field.clear()
        ref1_field.send_keys("PadelStats")
        
        # REFERENCIA CLIENTE 2 (opcional)
        ref2_field = self.driver.find_element(By.NAME, "referenciaCliente2")
        ref2_field.clear()
        ref2_field.send_keys("Sensor")
        
        # PESO EN KG (2kg)
        peso_field = self.driver.find_element(By.NAME, "peso")
        peso_field.clear()
        peso_field.send_keys("2")
        
        # ALTO en cm (actualizado según tus datos: 22x10x4cm)
        alto_field = self.driver.find_element(By.NAME, "alto")
        alto_field.clear()
        alto_field.send_keys("4")  # 4cm de alto
        
        # ANCHO en cm
        ancho_field = self.driver.find_element(By.NAME, "ancho")
        ancho_field.clear()
        ancho_field.send_keys("10")  # 10cm de ancho
        
        # LARGO en cm
        largo_field = self.driver.find_element(By.NAME, "largo")
        largo_field.clear()
        largo_field.send_keys("22")  # 22cm de largo
        
        # El peso volumétrico se calcula automáticamente
        # Si necesitas forzarlo:
        try:
            peso_vol_field = self.driver.find_element(By.NAME, "pesoVolumetrico")
            # Cálculo: (largo x ancho x alto) / factor volumétrico
            # Para Correos: 22 x 10 x 4 = 880 cm³
            peso_vol = round(22 * 10 * 4 / 8000, 3)  # Factor estándar ~8000
            peso_vol_field.clear()
            peso_vol_field.send_keys(str(peso_vol))
        except:
            # Si es automático, no hacer nada
            pass
        
        logger.info("Especificaciones paquete: 2kg, 22x10x4cm (PadelStats Sensor)")
    
    def _activar_contrarembolso(self, order, total_amount):
        """Activar contrarembolso en domicilio - CAMPOS REALES"""
        
        # Marcar checkbox "Reembolso en Domicilio o Apartado postal"
        try:
            contrarembolso_checkbox = self.driver.find_element(By.NAME, "reembolsoDomicilio")
            if not contrarembolso_checkbox.is_selected():
                contrarembolso_checkbox.click()
            
            # Esperar a que aparezcan los campos
            time.sleep(2)
            
            # IMPORTE del contrarembolso
            importe_field = self.wait.until(
                EC.presence_of_element_located((By.NAME, "importeReembolsoDomicilio"))
            )
            importe_field.clear()
            importe_field.send_keys(f"{total_amount:.2f}")
            
            logger.info(f"Contrarembolso domicilio activado: €{total_amount:.2f}")
            
        except Exception as e:
            logger.error(f"Error activando contrarembolso: {e}")
            # Intentar con nombres alternativos
            try:
                # Buscar por xpath si no funciona por nombre
                checkbox = self.driver.find_element(By.XPATH, "//input[@type='checkbox' and contains(@name, 'reembolso')]")
                if not checkbox.is_selected():
                    checkbox.click()
                    
                time.sleep(2)
                
                # Buscar campo de importe
                importe = self.driver.find_element(By.XPATH, "//input[contains(@name, 'importe') and contains(@name, 'reembolso')]")
                importe.clear()
                importe.send_keys(f"{total_amount:.2f}")
                
                logger.info(f"Contrarembolso activado (método alternativo): €{total_amount:.2f}")
                
            except Exception as e2:
                logger.error(f"Error en método alternativo contrarembolso: {e2}")
                raise Exception("No se pudo activar contrarembolso")
    
    def _obtener_numero_seguimiento(self):
        """Enviar formulario y obtener número de seguimiento"""
        try:
            # Click en crear envío
            crear_button = self.driver.find_element(By.XPATH, "//button[contains(text(), 'Crear envío')]")
            crear_button.click()
            
            # Esperar a página de confirmación
            self.wait.until(EC.presence_of_element_located((By.CLASS_NAME, "confirmacion-envio")))
            
            # Buscar número de seguimiento en varios posibles selectores
            tracking_selectors = [
                ".numero-seguimiento",
                "#tracking-number", 
                "[data-tracking]",
                "//span[contains(text(), 'CP')]"
            ]
            
            tracking_number = None
            for selector in tracking_selectors:
                try:
                    if selector.startswith("//"):
                        element = self.driver.find_element(By.XPATH, selector)
                    else:
                        element = self.driver.find_element(By.CSS_SELECTOR, selector)
                    
                    tracking_number = element.text.strip()
                    if tracking_number and len(tracking_number) > 5:
                        break
                except:
                    continue
            
            if not tracking_number:
                # Buscar en todo el texto de la página
                page_text = self.driver.page_source
                import re
                match = re.search(r'CP\d{9}[A-Z]{2}', page_text)
                if match:
                    tracking_number = match.group()
            
            logger.info(f"Número de seguimiento obtenido: {tracking_number}")
            return tracking_number
            
        except Exception as e:
            logger.error(f"Error obteniendo número de seguimiento: {str(e)}")
            return None
    
    def _procesar_pago_paypal(self):
        """Procesar pago automáticamente con PayPal - MODO MANUAL"""
        try:
            logger.info("💳 Iniciando proceso de pago PayPal...")
            
            # Buscar botón PayPal
            paypal_button = self.wait.until(
                EC.element_to_be_clickable((By.XPATH, "//button[contains(@class, 'paypal') or contains(text(), 'PayPal')]"))
            )
            paypal_button.click()
            logger.info("🖱️ Click en botón PayPal")
            
            # Cambiar a ventana de PayPal si se abre nueva pestaña
            if len(self.driver.window_handles) > 1:
                self.driver.switch_to.window(self.driver.window_handles[-1])
                logger.info("🔄 Cambiado a ventana PayPal")
            
            # Esperar a que cargue PayPal
            time.sleep(3)
            
            if self.paypal_manual_mode:
                logger.info("⚠️ MODO MANUAL ACTIVADO")
                logger.info("========================================")
                logger.info("ACCIÓN REQUERIDA:")
                logger.info("1. Se ha abierto PayPal en el navegador")
                logger.info("2. Introduce manualmente:")
                logger.info("   - Tu email de PayPal")
                logger.info("   - Tu contraseña de PayPal")
                logger.info("3. Confirma el pago (~€6.50)")
                logger.info("4. Espera a volver a ePostal")
                logger.info("========================================")
                
                # Pausa para permitir entrada manual
                input("⏸️ Presiona ENTER después de completar el pago PayPal...")
                
            else:
                # Modo automático (si tienes credenciales configuradas)
                try:
                    email_field = self.wait.until(EC.presence_of_element_located((By.ID, "email")))
                    email_field.send_keys(self.paypal_email)
                    
                    next_button = self.driver.find_element(By.ID, "btnNext")
                    next_button.click()
                    
                    # Contraseña
                    password_field = self.wait.until(EC.presence_of_element_located((By.ID, "password")))
                    password_field.send_keys(self.paypal_password)
                    
                    login_button = self.driver.find_element(By.ID, "btnLogin")
                    login_button.click()
                    
                    # Confirmar pago
                    confirmar_button = self.wait.until(
                        EC.element_to_be_clickable((By.ID, "payment-submit-btn"))
                    )
                    confirmar_button.click()
                    
                except Exception as e:
                    logger.warning(f"Automatización PayPal falló, cambiando a manual: {e}")
                    input("⏸️ Completa manualmente el pago PayPal y presiona ENTER...")
            
            # Esperar confirmación de pago
            time.sleep(5)
            
            # Volver a ventana principal si había múltiples
            if len(self.driver.window_handles) > 1:
                self.driver.close()
                self.driver.switch_to.window(self.driver.window_handles[0])
                logger.info("🔄 Regresado a ventana principal")
            
            logger.info("✅ Proceso PayPal completado")
            return True
            
        except Exception as e:
            logger.error(f"❌ Error procesando pago PayPal: {str(e)}")
            return False
    
    def calcular_costo_envio(self, order):
        """Calcular el costo total del envío + comisión"""
        # Estos valores pueden variar, deberían estar en settings
        costo_envio_base = 6.50  # Paquete Azul 2kg
        comision_contrarembolso = order.total_amount * 0.03  # 3%
        
        return costo_envio_base + comision_contrarembolso
    
    def automatizar_envio_completo(self, order):
        """Método principal para automatización completa del envío"""
        try:
            logger.info(f"=== INICIANDO AUTOMATIZACIÓN ENVÍO #{order.id} ===")
            
            # PASO 1: Configuración inicial
            if not self._configurar_navegador():
                logger.error("Error configurando navegador")
                return None
                
            # PASO 2: Login en ePostal
            logger.info("Paso 1/6: Iniciando sesión en ePostal...")
            if not self._login_epostal():
                logger.error("Error en login ePostal")
                self._cerrar_navegador()
                return None
            
            # PASO 3: Navegar a crear envío
            logger.info("Paso 2/6: Navegando a crear envío...")
            if not self._navegar_crear_envio():
                logger.error("Error navegando a crear envío")
                self._cerrar_navegador()
                return None
            
            # PASO 4: Completar datos del destinatario
            logger.info("Paso 3/6: Completando datos destinatario...")
            if not self._completar_destinatario(order):
                logger.error("Error completando datos destinatario")
                self._cerrar_navegador()
                return None
            
            # PASO 5: Configurar especificaciones del paquete
            logger.info("Paso 4/6: Configurando paquete...")
            self._configurar_paquete()
            
            # PASO 6: Activar contrarembolso
            total_amount = order.total_amount + self.shipping_cost
            logger.info(f"Paso 5/6: Activando contrarembolso por €{total_amount:.2f}...")
            self._activar_contrarembolso(order, total_amount)
            
            # PASO 7: Procesar pago con PayPal
            logger.info("Paso 6/6: Procesando pago PayPal...")
            if self._procesar_pago_paypal():
                # Obtener número de tracking
                time.sleep(3)
                tracking_number = self._obtener_numero_tracking()
                
                if tracking_number:
                    logger.info(f"=== AUTOMATIZACIÓN EXITOSA - TRACKING: {tracking_number} ===")
                    self._cerrar_navegador()
                    return tracking_number
                else:
                    logger.info("=== AUTOMATIZACIÓN EXITOSA - TRACKING PENDIENTE ===")
                    self._cerrar_navegador()
                    return "PENDING_TRACKING"
            
            logger.error("Error en pago PayPal")
            self._cerrar_navegador()
            return None
            
        except Exception as e:
            logger.error(f"Error en automatización completa: {str(e)}")
            self._cerrar_navegador()
            return None
    
    def _configurar_navegador(self):
        """Configurar y inicializar el navegador"""
        try:
            chrome_options = Options()
            chrome_options.add_argument('--disable-blink-features=AutomationControlled')
            chrome_options.add_experimental_option("excludeSwitches", ["enable-automation"])
            chrome_options.add_experimental_option('useAutomationExtension', False)
            chrome_options.add_argument('--start-maximized')
            
            self.driver = webdriver.Chrome(options=chrome_options)
            self.wait = WebDriverWait(self.driver, 20)
            
            # Ejecutar script para ocultar webdriver
            self.driver.execute_script("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})")
            
            return True
        except Exception as e:
            logger.error(f"Error configurando navegador: {e}")
            return False
    
    def _cerrar_navegador(self):
        """Cerrar navegador de forma segura"""
        try:
            if hasattr(self, 'driver') and self.driver:
                self.driver.quit()
        except:
            pass