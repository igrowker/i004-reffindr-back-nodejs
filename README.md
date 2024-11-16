Este es un proyecto de backend creado con **Node.js**, utilizando **TypeScript** para la programación y **Express** como framework de servidor. El proyecto está diseñado para servir como un API para interactuar con diferentes servicios.

## Características

- **Node.js** como entorno de ejecución.
- **TypeScript** para una mayor seguridad y claridad en el código.
- **Express** como servidor web.
- **JWT (JSON Web Tokens)** para la autenticación.
- **Axios** para realizar peticiones HTTP.
- **dotenv** para manejar variables de entorno.

## Tecnologías usadas

### Dependencias

- **axios**: Librería para realizar peticiones HTTP desde el servidor.
- **dotenv**: Permite cargar variables de entorno desde un archivo `.env`.
- **express**: Framework para construir el servidor web.
- **jsonwebtoken**: Utilizado para la creación y verificación de JSON Web Tokens, útil para la autenticación y autorización.

### Dependencias de desarrollo

- **@types/express**: Tipos de TypeScript para Express.
- **@types/node**: Tipos de TypeScript para Node.js.
- **nodemon**: Herramienta que reinicia automáticamente el servidor durante el desarrollo.
- **ts-node**: Ejecuta archivos TypeScript directamente sin necesidad de compilarlos manualmente.
- **typescript**: Lenguaje de programación que agrega tipado estático a JavaScript.

## Requisitos previos

Asegúrate de tener **Node.js** y **npm** instalados en tu sistema. Si no los tienes, puedes descargarlos desde [Node.js](https://nodejs.org/).

## Instalación

1. Clona este repositorio en tu máquina local:

   ```bash
   git clone <URL del repositorio>
   ```

2. Navega al directorio del proyecto:

   ```bash
   cd reffindr-back-nodejs
   ```

3. Instala las dependencias necesarias:

   ```bash
   npm install
   ```

## Scripts

El proyecto viene con los siguientes scripts preconfigurados:

- **`npm run build`**: Compila el código TypeScript en la carpeta `dist`.
- **`npm run start`**: Inicia el servidor en producción, ejecutando el archivo `dist/index.js`.
- **`npm run dev`**: Inicia el servidor en modo desarrollo utilizando **nodemon** para reiniciar automáticamente el servidor cuando se hagan cambios en el código fuente. Utiliza el archivo `src/index.ts`.

## Variables de Entorno

El proyecto utiliza **dotenv** para cargar las variables de entorno. Asegúrate de crear un archivo `.env` en la raíz del proyecto con las configuraciones necesarias. Un ejemplo de archivo `.env` podría ser:

```
PORT=3000
JWT_SECRET=mysecretkey
```

## Construcción y ejecución de tu aplicación

Cuando estés listo, inicia tu aplicación ejecutando: docker compose up --build.

Tu aplicación estará disponible en http://localhost:${PORT}.

## Desplegar tu aplicación en la nube

Primero, construye tu imagen, por ejemplo: docker build -t myapp .. Si tu nube usa una arquitectura de CPU diferente a la de tu máquina de desarrollo (por ejemplo, estás en un Mac M1 y tu proveedor de la nube es amd64), querrás construir la imagen para esa plataforma, por ejemplo: docker build --platform=linux/amd64 -t myapp ..

Luego, súbela a tu registro, por ejemplo docker push myregistry.com/myapp.

Consulta la documentación de inicio de Docker [getting started](https://docs.docker.com/go/get-started-sharing/) para más detalles sobre cómo construir y subir.

## Referencias

[Guía de Node.js de Docker](https://docs.docker.com/language/nodejs/)

## Licencia

Este proyecto está licenciado bajo la **MIT License**