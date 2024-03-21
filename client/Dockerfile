# Etapa de construcción
FROM node:18.12.1 AS builder

WORKDIR /app

COPY package.json package-lock.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código de la aplicación
COPY . .

# Construir la aplicación
RUN npm run build

# Etapa de producción
FROM nginx:alpine

# Copiar los archivos de construcción de la etapa de construcción a la carpeta de Nginx
COPY --from=builder /app/build /usr/share/nginx/html

# Exponer el puerto 3000
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
