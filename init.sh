#!/bin/bash
 
# Ir al directorio del frontend
cd FrontEnd/src

# Instalar las dependencias del frontend
echo "Instalando dependencias del frontend..."
#npm install

# Iniciar la aplicación frontend (React)
echo "Iniciando la aplicación frontend..."
start "" "C:\Program Files\Git\bin\bash.exe" -c "npm run dev" # Abre una consola aparte para poder cerrar el frontend mas facil

# Ir al directorio del backend
# cd BackEnd/src
# Instalar las dependencias del backend
echo "Instalando dependencias del backend..."
#npm install
# iniciar el backend
# npm install express
echo "Iniciando el servidor backend..."
# node app.js
# npm start o algo asi


