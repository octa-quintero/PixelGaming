<h1 align="center">¡Hola! Soy Octavio Quintero 👋</h1>
<h1 align="center">Desarrollador FullStack </h1>

- 👨‍💻 Encuentra mis proyectos en mi [portafolio](https://octavioquintero.vercel.app/)

- 📫 Contacto: **octa.quinteroo@gmail.com**

<h3 align="left">Conéctate conmigo:</h3>
<p align="left">
  <a href="https://linkedin.com/in/octavio-quintero" target="blank">
    <img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/linked-in-alt.svg" alt="octavio-quintero" height="30" width="40" />
  </a>
  <a href="https://instagram.com/octa.quintero" target="blank">
    <img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/instagram.svg" alt="octa.quintero" height="30" width="40" />
  </a>
</p>

<p><b>PixelGaming</b></p>

PixelGaming es una plataforma innovadora para amantes de los juegos online, centrada en la búsqueda, personalización y interaccion de la comunidad. Descubre, crea tu biblioteca, y participa en la comunidad de jugadores.

- **Descubre y Explora:** Encuentra emocionantes juegos online.
  
- **Crea tu Cuenta:** Personaliza tu experiencia y comparte con la comunidad.

- **Biblioteca Personal:** Gestiona tus juegos favoritos fácilmente.

- **Top 2023:** Destacamos los mejores juegos del año.

- **Comunidad Activa:** Interactúa, comparte reseñas y descubre nuevas recomendaciones.

## Instalación

Para ejecutar el proyecto en tu entorno local, sigue estos sencillos pasos:

1. **Clonar el Repositorio:**
   ```bash
    git clone https://github.com/octa-quintero/pixelgaming

2. **Instalar Dependencias**

   ```bash

    Primero busca la raiz del proyecto

    Para la parte del servidor

    cd server
    npm install
    npm start

    Y para la parte del cliente

    cd client
    npm install
    npm start

## Estructura del Proyecto

El proyecto PixelGaming está organizado de la siguiente manera:

- **`client/`:** Contiene el código del frontend de la aplicación.

  - **`public/`:** Almacena archivos estáticos y de acceso público.

  - **`src/`:** Contiene el código fuente principal.

      - **`assets/`:** Contenido multimedia

      - **`components/`:** Componentes reutilizables de React.

      - **`config`:** Componentes reutilizables de React.

  - **`config/`:** Contiene configuraciones esenciales y componentes reutilizables relacionados con la lógica de configuración de la aplicación.

  - **`redux/`:** Contiene archivos relacionados con la implementación de Redux para gestionar el estado global de la aplicación.

      - **`actions/`:** Almacena archivos que definen las acciones de Redux, que son eventos que desencadenan cambios en el estado.

      - **`reducers/`:** Contiene archivos que definen los reducers de Redux. Los reducers especifican cómo cambia el estado en respuesta a las acciones enviadas.

      - **`store.js`:** Archivo principal que crea y exporta la tienda Redux. La tienda es un objeto central que mantiene el estado global de la aplicación.

  - **`App.js`:** Punto de entrada principal del frontend.

  - **`index.js`:** Punto de entrada para renderizar la aplicación.

  - **`package.json`:** Gestiona dependencias y scripts del frontend.

  - **`webpack.config.js`:** Contiene la configuración principal de Webpack para empaquetar y construir tu aplicación.

  - **`setupProxy.js`:** Contiene la configuración del servidor proxy para redirigir solicitudes durante el desarrollo.



- **`server/`:** Contiene el código del backend de la aplicación.

  - **`src/`:** Contiene el código fuente principal.

  - **`controllers/`:** Contiene controladores que manejan la lógica de las llamadas a la api.

  - **`middleware/`:** Contiene archivos relacionados con la implementación de middleware en tu aplicación.

  - **`models/`:** Almacena modelos de datos o esquemas de la base de datos.

  - **`routes/`:** Define las rutas de la API.

  - **`server.js`:** Punto de entrada principal para el backend.

  - **`app.js`:** Archivo principal de configuración de la aplicación, que incluye la habilitación de CORS y el manejo de middleware para errores.

  - **`index.js`:** Archivo principal que inicia el servidor Express, configura middleware, maneja archivos estáticos y sincroniza la base de datos.

- **`db.js`:** Archivo dedicado para la configuración de Sequelize, definición de modelos y sus relaciones en la base de datos.

- **`package.json`:** Gestiona dependencias y scripts del backend.





