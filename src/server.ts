import http from "http";
import express from "express";
import { applyCommonMiddleware, applyRoutes } from "./utils/index";
import middleware from "./middleware/index";
import errorHandlers from "./middleware/errorHandlers";
import routes from "./services";
import { createConnections } from "typeorm";
import * as fs from "fs";
import * as path from "path";
// const setTZ = require('set-tz');

// Excepciones no manejadas
process.on("uncaughtException", e => {
    console.error(e);
    process.exit(1);
});

process.on("unhandledRejection", e => {
    console.error(e);
    process.exit(1);
});

// Seteamos la zona horaria en UTC para evitar problemas
// setTZ('UTC');

// Creamos las conexiones

        // Vector de conexiones
createConnections(
).then(async () => {
    const router = express();
    // Aniadimos el middleware a las rutas
    applyCommonMiddleware(middleware, router);
    // Aniadimos las rutas definidas al objeto router de NodeJS
    applyRoutes(routes, router);
    // Aplicamos los manejadores de errores
    applyCommonMiddleware(errorHandlers, router);

    const { PORT = 3000 } = process.env; // Definimos el puerto de escucha
    const server = http.createServer(router); // Creamos el servidor Node

    // Levantamos el servidor
    server.listen(PORT, () =>
        console.log(`Server is running http://localhost:${PORT}...`)
    );
}).catch((error) => console.error(error));
  




// import App from './app';
// import UserController from './controllers/UserController'


// const controllers = [new UserController()];
// const app = new App(controllers, 3000);

// app.listen();

// export default app;