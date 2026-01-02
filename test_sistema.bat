@echo off
title PadelStats - Prueba de Automatizacion

echo ===============================================
echo      PADELSTATS - PRUEBA DE AUTOMATIZACION
echo ===============================================
echo.

REM Verificar si está todo instalado
if not exist "backend\venv\Scripts\activate" (
    echo ERROR: Backend no instalado. Ejecuta primero: instalar.bat
    pause
    exit /b 1
)

echo [1/3] Activando entorno virtual...
cd backend
call venv\Scripts\activate

echo [2/3] Ejecutando pruebas de configuracion...
python test_automation.py

echo.
echo [3/3] Generando pedido de prueba (opcional)...
echo ===============================================
echo        INSTRUCCIONES PARA PRUEBA REAL
echo ===============================================
echo.
echo Para probar el sistema completo:
echo.
echo 1. Ejecutar: iniciar.bat (en otra ventana)
echo 2. Abrir: http://localhost:3000
echo 3. Hacer un pedido con datos reales
echo 4. Observar logs en esta ventana
echo 5. Completar PayPal manualmente cuando se solicite
echo.
echo CREDENCIALES CONFIGURADAS:
echo - ePostal: padelstats0@gmail.com
echo - PayPal: Entrada manual activada
echo - Telefono: 691432907
echo.
echo ===============================================
echo.
pause

cd ..