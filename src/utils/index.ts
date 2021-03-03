import { Router, Request, Response, NextFunction } from "express";

type Wrapper = ((router: Router) => void);

export const applyCommonMiddleware = (
    middlewareWrappers: Wrapper[],
    router: Router
) => {
    for (const wrapper of middlewareWrappers) {
        wrapper(router);
    }
};

type Handler = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<void> | void;

type Route = {
    path: string;
    method: string;
    handler: Handler | Handler[];
};

export const applyRoutes = (routes: Route[], router: Router) => {
    for (const route of routes) {
        const { method, path, handler } = route;
        (router as any)[method](path, handler);
    }
};

// export const anyValue = (val) => {
//     let anyValue: boolean = true;
//     if (val !== null && val !== undefined) {
//         return anyValue;
//     } else if (isArray(val)) {
//         val.forEach(element => {
//             anyValue = !!element;
//          });
//          return anyValue;
//     }
//     };
