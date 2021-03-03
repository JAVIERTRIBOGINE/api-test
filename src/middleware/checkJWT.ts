import { Request, Response, NextFunction } from "express";
import { SimpleConsoleLogger } from "typeorm";
import * as jwt from 'jsonwebtoken';
import config from '../config/config';
// import * as jwt from "jsonwebtoken";


export const checkJwt = async (req: Request, res: Response, next: NextFunction) => {


    // Obtenemos el token de la cabecera de la petición
    debugger;
    const token = <string>req.headers['x-access-token'];
    let jwtPayload: any;


    // Intentamos validar el token
    try {
        jwtPayload = <any>jwt.verify(token, config.jwtSecret);
        res.locals.jwtPayload = jwtPayload; // Si es valido, metemos el contenido en la respuesta
        console.log("pasa por jwt");

    } catch (error) {
        // Si el token no es valido, mandamos una respuesta 401 (not authorized)
        // nuevo log con info de incidencias con el token;

        res.status(401).send(error);
        return;
    }

    // Código para regenerar el token
    //--------------------------------------------------------------
    //--------------------------------------------------------------
    //--------------------------------------------------------------
    //--------------------------------------------------------------

    // //The token is valid for 1 hour
    // //We want to send a new token on every request
    const {userId, username} = jwtPayload;
    const newToken = jwt.sign({userId, username}, config.jwtSecret, {
        expiresIn: "1h"
    });
    res.setHeader("token", newToken);

    // Llamamos a la siguiente funcion
    next();
};
