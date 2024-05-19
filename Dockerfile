# Usa una imagen de node como base
FROM node:14

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de la aplicación al contenedor
COPY package*.json ./
COPY public ./public
COPY index.js ./
COPY dal.js ./ 

# Instala las dependencias
RUN npm install

# Expone el puerto en el que se ejecutará la aplicación
EXPOSE 3000

# Comando para ejecutar la aplicación cuando se inicie el contenedor
CMD ["node", "index.js"]
