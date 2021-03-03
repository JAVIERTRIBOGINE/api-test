import { Request, Response } from "express";
import { checkJwt } from "../../middleware/checkJWT";
import { AuthController} from "./authController";

/**
 * Rutas para el controller de autenticación
 */
export default [

    {
        path: "/api/auth",
        method: "post",
        handler: [
            async (req: Request, res: Response) => {
                // let details = logMessages.PROCESS.INIT + logMessages.ENTITY.USERS + " | " + logMessages.ACTION.LOGIN ;
                try {

                    // infoLog(logMessages.SEVERITY.INFO, req, res, null, null, details);

                if (req.body.entercode != undefined) {
                    const result = await AuthController.login(req.body);
                    if (result && result.ok) {
                        // Almacenamos el log en BD
                        // (req.ip, 'LOGGED IN', <number>result.user_oid);
                        // details = details.replace(logMessages.PROCESS.INIT, logMessages.PROCESS.END);

                        // infoLog(logMessages.SEVERITY.INFO,  req, res, result, 200, details );

                        res.status(200).send({
                            ok: true,
                            usertoken: result.jwt,
                            id: result.id,
                            name: result.name,
                            mail: result.mail,
                            userRol: result.userRol
                        });

                    } else {
                        // Almacenamos el log en BD
                        // (req.ip, 'LOGIN TRY', <number>result.user_oid);
                        // details = details.replace(logMessages.PROCESS.INIT, logMessages.PROCESS.ERROR);
                        // infoLog(logMessages.ERRORS.SERVER,  req, res, null, 403,  details + logMessages.ERRORS.USER + "| content: " + result.message);
                        res.status(403).send({ ok: false, message: "fallo en autenticacion" });
                    }
                } else {
                    // details = details.replace(logMessages.PROCESS.INIT, logMessages.PROCESS.ERROR);
                    // infoLog(logMessages.ERRORS.SERVER,  req, res, null, 400,  details + logMessages.ERRORS.USER + "| content: code-enter vacío");
                    res.status(400).send("bad request");
                }
                } catch (ex) {

                    // infoLog(logMessages.SEVERITY.ERROR, req, res, null, 500, logMessages.PROCESS.ERROR + logMessages.ERRORS.USER + " | " + logMessages.ACTION.READ + " | " + ex.message + " | " + ex.stack);

                    res.status(500).send(ex.message)
                }

            }
        ]
    }
]
