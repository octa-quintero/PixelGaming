# Etapa de construcción
FROM node:18.12.1 AS builder

WORKDIR /app

COPY package.json package-lock.json ./

# Instalar dependencias de producción
RUN npm ci

# Copiar el código de la aplicación
COPY . .

# Construir la aplicación
RUN npm run build

# Etapa de producción
FROM node:18.12.1

WORKDIR /app

# Copiar archivos de la etapa de construcción
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/index.js ./index.js

# Copiar toda la carpeta src
COPY --from=builder /app/src ./src

# Exponer el puerto
EXPOSE 8080

# Comando para iniciar el servidor
CMD ["node", "index.js"]