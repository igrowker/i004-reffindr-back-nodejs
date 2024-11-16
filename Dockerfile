# Establece la versión de Node.js y la imagen base
FROM node:20.15.0-alpine as base

# Establece el directorio de trabajo para todas las etapas de construcción
WORKDIR /usr/src/app

# Crea una etapa para instalar dependencias de producción
FROM base as deps-prod

# Copia los archivos de package para instalar las dependencias de producción
COPY package.json package-lock.json ./

# Instala solo las dependencias de producción, usando el caché de npm
RUN --mount=type=cache,target=/root/.npm \
    npm ci --only=production --frozen-lockfile && \
    rm -rf package.json package-lock.json

# Crea una etapa para instalar dependencias de desarrollo.
FROM base as deps-dev

# Copia los archivos de package para instalar dependencias de desarrollo
COPY package.json package-lock.json ./

# Instala todas las dependencias (tanto de producción como de desarrollo), usando el caché de npm
RUN --mount=type=cache,target=/root/.npm \
    npm ci --only=dev --frozen-lockfile

# Crea una etapa para construir la aplicación
FROM deps-dev as build

# Copia tsconfig.json y el directorio src
COPY tsconfig.json ./
COPY src ./src

# Ejecuta el script de construcción (compilación de TypeScript)
RUN npm run build

# Elimina los archivos de package para que no esten en la etapa final
RUN rm -rf package.json package-lock.json

# Etapa final para ejecutar la aplicación en producción
FROM base as prod

# Copia solo las dependencias de producción
COPY --from=deps-prod /usr/src/app/node_modules ./node_modules

# Copia la aplicación construida desde la etapa de construcción
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/tsconfig.json ./tsconfig.json
COPY --from=build /usr/src/app/src ./src

# Usa un usuario no root para ejecutar la aplicación por motivos de seguridad
USER node

# Ejecuta la aplicación
CMD ["node", "dist/index.js"]
