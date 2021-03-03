import {Request, Response, NextFunction, Router} from "express";
import * as ErrorHandler from "../utils/ErrorHandler";
// import { logMessages } from "../utils/const";
// import { infoLog } from "../utils/infoLog";

// Manejamos los errores 404
const handle404Error = (router: Router) => {
    // router.use(async (req: Request, res: Response) =>  {
    router.use((req: Request, res: Response) => {
        // if (req) {
            
        //     if (req.path != "/") {
        //         let details = logMessages.PROCESS.ERROR + logMessages.FUNCTION.ERROR_HANDLER + " | " + logMessages.ERRORS.NOT_FOUNT_404 + ": " + req.path;
        //         const log = infoLog(logMessages.SEVERITY.ERROR, req, res, null, 404, details);
        //     }

        // }
        ErrorHandler.notFoundError();
    });
};

// Manejamos los errores en la petición del cliente
const handleClientError = (router: Router) => {
    router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        ErrorHandler.clientError(err, res, next);
    });
};

// Manejamos los errores del servidor (500)
const handleServerError = (router: Router) => {
    router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        ErrorHandler.serverError(err, res, next);
    });
};

export default [handle404Error, handleClientError, handleServerError];
