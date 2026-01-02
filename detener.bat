@echo off
title PadelStats Web - Detener Servicios

echo ===============================================
echo      PADELSTATS WEB - DETENER SERVICIOS
echo ===============================================
echo.

echo Deteniendo procesos de Django y React...

REM Detener procesos de Django (puerto 8000)
echo [1/2] Deteniendo Backend Django (puerto 8000)...
for /f "tokens=5" %%a in ('netstat -aon ^| find ":8000" ^| find "LISTENING"') do (
    echo Matando proceso PID: %%a
    taskkill /f /pid %%a >nul 2>&1
)

REM Detener procesos de React (puerto 3000)  
echo [2/2] Deteniendo Frontend React (puerto 3000)...
for /f "tokens=5" %%a in ('netstat -aon ^| find ":3000" ^| find "LISTENING"') do (
    echo Matando proceso PID: %%a
    taskkill /f /pid %%a >nul 2>&1
)

REM Detener procesos de Node.js relacionados con React
echo Deteniendo procesos Node.js de React...
taskkill /f /im "node.exe" /fi "WINDOWTITLE eq Frontend React*" >nul 2>&1

REM Detener procesos Python de Django
echo Deteniendo procesos Python de Django...
taskkill /f /im "python.exe" /fi "WINDOWTITLE eq Backend Django*" >nul 2>&1

echo.
echo ===============================================
echo           SERVICIOS DETENIDOS
echo ===============================================
echo.
echo - Backend Django (puerto 8000): DETENIDO
echo - Frontend React (puerto 3000): DETENIDO
echo.
echo Los puertos 8000 y 3000 ahora estan libres.
echo.
echo Para reiniciar: ejecutar iniciar.bat
echo.
pause