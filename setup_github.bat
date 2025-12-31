@echo off
echo ============================================
echo   CONFIGURACION PARA SUBIR A GITHUB
echo ============================================
echo.
echo Tu proyecto PadelStats ya esta listo y commiteado en Git local.
echo Tienes las siguientes opciones para subirlo a GitHub:
echo.
echo OPCION 1: Usando GitHub CLI (Recomendado)
echo ------------------------------------------
echo 1. Instala GitHub CLI desde: https://cli.github.com/
echo 2. Ejecuta: gh auth login
echo 3. Ejecuta: gh repo create padelstats-web --public --push --source=. --description="Complete PadelStats web application with React frontend and Django backend"
echo.
echo OPCION 2: Creando repositorio manualmente en GitHub.com
echo --------------------------------------------------------
echo 1. Ve a https://github.com/new
echo 2. Nombre del repositorio: padelstats-web
echo 3. Descripcion: Complete PadelStats web application with React frontend and Django backend
echo 4. Hazlo publico
echo 5. NO inicialices con README, .gitignore o licencia (ya los tienes)
echo 6. Crea el repositorio
echo 7. Copia la URL del repositorio (ejemplo: https://github.com/tuusuario/padelstats-web.git)
echo 8. Ejecuta en tu terminal:
echo    git remote add origin https://github.com/tuusuario/padelstats-web.git
echo    git branch -M main
echo    git push -u origin main
echo.
echo OPCION 3: Script automatico (necesita URL de tu repositorio)
echo ----------------------------------------------------------
echo Si ya creaste el repositorio en GitHub, edita este archivo
echo y reemplaza YOUR_GITHUB_REPO_URL con la URL real, luego descomenta y ejecuta:
echo.
echo rem git remote add origin YOUR_GITHUB_REPO_URL
echo rem git branch -M main  
echo rem git push -u origin main
echo.
echo ============================================
echo   RESUMEN DEL PROYECTO CREADO
echo ============================================
echo.
echo ✓ Django backend con API REST completa
echo ✓ React frontend con diseno oscuro profesional
echo ✓ Sistema de carrito con codigos de descuento
echo ✓ Sistema de blog y paginas de ayuda
echo ✓ Envio automatico de emails
echo ✓ Diseno responsive con CSS externo
echo ✓ Caracteristicas interactivas del producto
echo ✓ Documentacion completa en README.md
echo.
echo ¡Todo listo para produccion!
echo.
pause