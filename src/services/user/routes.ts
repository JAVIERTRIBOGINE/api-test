import { Request, Response } from "express";
import { checkJwt } from "../../middleware/checkJWT";
import { UserController } from "./userController";

export default [
    {
        path: "/users",
        method: "get",
        handler: [
            checkJwt,
            async (req: Request, res: Response) => {
                debugger;
                let result = null;
                // let // details = logMessages.PROCESS.INIT + logMessages.ENTITY.ZONES + " | " + logMessages.ACTION.READ ;
                // // infoLog(logMessages.SEVERITY.INFO,  req, res, null, null, details );
                try {
                        result = await UserController.listAll();
                    // details = details.replace(logMessages.PROCESS.INIT, logMessages.PROCESS.END);
                    // infoLog(logMessages.SEVERITY.INFO,  req, res, result, 200, details );
                    res.status(200).send(result);
                } catch (e) {
                    // details = details.replace(logMessages.PROCESS.INIT, logMessages.PROCESS.ERROR);
                    // infoLog(logMessages.ERRORS.SERVER,  req, res, null, 500,  details + logMessages.ERRORS.SERVER + "| content: " + e.message);
                    res.status(500).send(e);
                }
            }
        ]
    },
    {
        path: "/api/users/:oid",
        method: "get",
        handler: [
            checkJwt,
            async (req: Request, res: Response) => {
                // let // details = logMessages.PROCESS.INIT + logMessages.ENTITY.ZONES + " | " + logMessages.ACTION.READ ;
                // // infoLog(logMessages.SEVERITY.INFO,  req, res, null, null, details );
                try {
                    const result = await UserController.findOne(req.params.id);
                    // details = details.replace(logMessages.PROCESS.INIT, logMessages.PROCESS.END);
                    // infoLog(logMessages.SEVERITY.INFO,  req, res, result, 200, details );
                    res.status(200).send(result);
                } catch (e) {
                    // details = details.replace(logMessages.PROCESS.INIT, logMessages.PROCESS.ERROR);
                    // infoLog(logMessages.ERRORS.SERVER,  req, res, null, 404,  details + logMessages.ERRORS.SERVER + "| content: " + e.message);
                    res.status(404).send("Bad Request")
                }
            }
        ]
    },
    {
        path: "/api/users",
        method: "post",
        handler: [
            checkJwt,
            // checkRoleJWT([rolesUsuario.ADMINISTRADOR]),
            async (req: Request, res: Response) => {
                // let // details = logMessages.PROCESS.INIT + logMessages.ENTITY.ZONES + " | " + logMessages.ACTION.CREATE ;
                // // infoLog(logMessages.SEVERITY.INFO,  req, res, null, null, details );
                try {
                    if (req.body.name != undefined && req.body.country_oid != undefined) {
                        const result = await UserController.insert(req.body, res.locals.jwtPayload.userId);
                        // details = details.replace(logMessages.PROCESS.INIT, logMessages.PROCESS.END);
                        // infoLog(logMessages.SEVERITY.INFO,  req, res, result, 200, details );
                        // (req.ip,
                        //     `CREATED ZONE: ${result.generatedMaps[0]}`,
                        res.status(200).send(result.generatedMaps[0]);
                    } else {
                        // details = details.replace(logMessages.PROCESS.INIT, logMessages.PROCESS.ERROR);
                        // infoLog(logMessages.SEVERITY.ERROR,  req, res, null, 400,  details + "|" + logMessages.ERRORS.VALIDATON);
                        res.status(400).send("Bad request");
                    }
                } catch (e) {
                    // details = details.replace(logMessages.PROCESS.INIT, logMessages.PROCESS.ERROR);
                    // infoLog(logMessages.SEVERITY.ERROR,  req, res, null, 500,  details + " | " + logMessages.ERRORS.SERVER + "| content: " + e.message + " | " + e.stack);
                    res.status(500).send("Internal server Error");   
                }
            }
        ]
    },
    {
        path: "/api/users/:oid",
        method: "put",
        handler: [
            checkJwt,
            // checkRoleJWT([rolesUsuario.ADMINISTRADOR]),
            async (req: Request, res: Response) => {
                // let // details = logMessages.PROCESS.INIT + logMessages.ENTITY.ZONES + " | " + logMessages.ACTION.UPDATE ;
                // // infoLog(logMessages.SEVERITY.INFO,  req, res, null, null, details );
                try {
                    if (req.body.name !== undefined && req.body.country_oid !== undefined) {
                        const result = await UserController.update(req.params.oid, req.body, res.locals.jwtPayload.userId);
                        // (req.ip,
                        //     `UPDATED ZONE WITH OID ${req.params.oid}: ${JSON.stringify(req.body)}`,
                        // details = details.replace(logMessages.PROCESS.INIT, logMessages.PROCESS.END);
                        // infoLog(logMessages.SEVERITY.INFO,  req, res, result, 200, details );
                        res.status(200).send(req.body);
                    } else {
                        // details = details.replace(logMessages.PROCESS.INIT, logMessages.PROCESS.ERROR);
                        // infoLog(logMessages.SEVERITY.ERROR,  req, res, null, 400,  details + " | " + logMessages.ERRORS.VALIDATON);
                        res.status(400).send("bad request")
                    }
                } catch (e) {
                    // details = details.replace(logMessages.PROCESS.INIT, logMessages.PROCESS.ERROR);
                    // infoLog(logMessages.SEVERITY.ERROR,  req, res, null, 500,  details + " | " + logMessages.ERRORS.SERVER + "| content: " + e.message);
                    // (req.ip, `TRIED TO UPDATE ZONE WITH OID ${req.params.oid}: ${JSON.stringify(req.body)}`,
                    res.status(500).send("Internal Server error")
                }
            }
        ]
    },
    {
        path: "/api/users/:oid",
        method: "delete",
        handler: [
            checkJwt,
            // checkRoleJWT([rolesUsuario.ADMINISTRADOR]),
            async (req: Request, res: Response) => {
                // let // details = logMessages.PROCESS.INIT + logMessages.ENTITY.ZONES + " | " + logMessages.ACTION.DELETE ;
                // // infoLog(logMessages.SEVERITY.INFO,  req, res, null, null, details );
                try {
                    const zoneDeleted = await UserController.delete(req.params.oid);
                    // details = details.replace(logMessages.PROCESS.INIT, logMessages.PROCESS.END);
                    // // infoLog(logMessages.SEVERITY.INFO,  req, res, zoneDeleted, 200, details );
                    // (req.ip,
                    //     `DELETED ZONE WITH OID ${req.params.oid}: ${JSON.stringify(zoneDeleted)}`,
                    res.status(200).send({});
                } catch (e) {
                    // (req.ip, `TRIED TO DELETE ZONE WITH OID ${req.params.oid}`,
                    // details = details.replace(logMessages.PROCESS.INIT, logMessages.PROCESS.END);
                    // // infoLog(logMessages.SEVERITY.ERROR,  req, res, null, 500, details  + " | " + logMessages.ERRORS.SERVER + "| content: " + e.message);
                    res.status(500).send("Internal Server error")
                }
            }
        ]
    }
];
