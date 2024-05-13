#!/bin/bash
 
# Ir al directorio del backend
cd BackEnd/
#npm run dev
# Instalar las dependencias del backend
#echo "Instalando dependencias del backend..."
npm install
# iniciar el backend
#npm install
#echo "Iniciando el servidor backend..."
#node app.js
start "" "C:\Program Files\Git\bin\bash.exe" -c "npm run dev"

# Ir al directorio del frontend
cd ..
cd FrontEnd/
npm run dev
# Instalar las dependencias del frontend
#echo "Instalando dependencias del frontend..."
#npm install

# Iniciar la aplicación frontend (React)
#echo "Iniciando la aplicación frontend..."
#npm run dev # Abre una consola aparte para poder cerrar el frontend mas facil

