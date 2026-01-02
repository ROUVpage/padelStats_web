@echo off
title PadelStats Web - Inicio Rapido

echo ===============================================
echo         PADELSTATS WEB - INICIO RAPIDO
echo ===============================================
echo.

REM Verificar si está todo instalado
if not exist "backend\venv\Scripts\activate" (
    echo ERROR: Backend no instalado. Ejecuta primero: instalar.bat
    pause
    exit /b 1
)

if not exist "frontend\node_modules" (
    echo ERROR: Frontend no instalado. Ejecuta primero: instalar.bat
    pause
    exit /b 1
)

REM Iniciar backend en nueva ventana
echo [1/2] Iniciando Backend Django...
start "Backend Django" cmd /k "cd backend && venv\Scripts\activate && echo Backend iniciado en http://127.0.0.1:8000 && python manage.py runserver"

REM Esperar un poco para que inicie el backend
timeout /t 3 /nobreak >nul

REM Iniciar frontend en nueva ventana
echo [2/2] Iniciando Frontend React...
start "Frontend React" cmd /k "cd frontend && echo Frontend iniciado en http://localhost:3000 && npm start"

echo.
echo ===============================================
echo            SISTEMA INICIADO
echo ===============================================
echo.
echo Backend Django: http://127.0.0.1:8000
echo Frontend React: http://localhost:3000
echo.
echo Se abrieron 2 ventanas de terminal:
echo - Backend: Servidor Django
echo - Frontend: Servidor React
echo.
echo Para detener: Ctrl+C en cada terminal
echo.
echo URLS IMPORTANTES:
echo - Web Principal: http://localhost:3000
echo - Admin Django: http://127.0.0.1:8000/admin/
echo - API Productos: http://127.0.0.1:8000/api/products/
echo.
echo ===============================================
pause