@echo off
echo ===============================================
echo    INSTALACION AUTOMATICA PADELSTATS WEB
echo ===============================================
echo.

REM Verificar si Python está instalado
echo [1/8] Verificando Python...
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Python no encontrado. Instalar desde https://python.org/
    echo IMPORTANTE: Marcar "Add Python to PATH" durante instalacion
    pause
    exit /b 1
)
echo Python OK

REM Verificar si Node.js está instalado
echo [2/8] Verificando Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js no encontrado. Instalar desde https://nodejs.org/
    pause
    exit /b 1
)
echo Node.js OK

REM Verificar si Git está instalado
echo [3/8] Verificando Git...
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ADVERTENCIA: Git no encontrado. Descargar desde https://git-scm.com/
    echo Puedes continuar si descargaste el proyecto manualmente
    pause
)
echo Git OK

REM Configurar Backend
echo [4/8] Configurando Backend Python...
cd backend
if not exist "venv" (
    echo Creando entorno virtual...
    python -m venv venv
)

echo Activando entorno virtual...
call venv\Scripts\activate

echo Instalando dependencias Python...
python -m pip install --upgrade pip
pip install -r requirements.txt

REM Verificar si correos_settings.py existe
if not exist "correos_settings.py" (
    echo [5/8] Creando archivo de credenciales...
    copy correos_settings_example.py correos_settings.py
    echo.
    echo IMPORTANTE: Edita correos_settings.py con tus credenciales reales
    echo - Usuario y password de ePostal
    echo - Email y password de PayPal
    echo.
    pause
)

echo [8/9] Configurando base de datos...
python manage.py makemigrations
python manage.py migrate

echo [8/9] Poblando base de datos con datos iniciales...
python populate_db.py

echo [9/9] Verificando configuracion automatizacion...
python test_automation.py

cd ..

REM Configurar Frontend
echo [7/9] Configurando Frontend React...
cd frontend

echo Instalando dependencias Node.js...
npm install

cd ..

echo [9/9] Instalacion completada!
echo.
echo ===============================================
echo           PROXIMOS PASOS
echo ===============================================
echo.
echo 1. Editar backend\correos_settings.py con tus credenciales:
echo    - EPOSTAL_USERNAME y EPOSTAL_PASSWORD
echo    - PAYPAL_EMAIL y PAYPAL_PASSWORD
echo.
echo 2. Editar backend\padelstats_backend\settings.py:
echo    - EMAIL_HOST_PASSWORD (password aplicacion Gmail)
echo.
echo 3. Para iniciar el sistema:
echo    - Terminal 1: cd backend ^&^& venv\Scripts\activate ^&^& python manage.py runserver
echo    - Terminal 2: cd frontend ^&^& npm start
echo.
echo 4. Abrir navegador en: http://localhost:3000
echo.
echo 5. Hacer pedido de prueba para verificar automatizacion
echo.
echo ===============================================
echo.
pause