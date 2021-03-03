import {Router} from "express";
import cors from "cors";
import parser from "body-parser";
import compression from "compression";

// CORS
export const handleCors = (router: Router) =>
    router.use(cors({credentials: true, origin: true}));

// Indicamos el parser del body. Se acepta JSON
export const handleBodyRequestParsing = (router: Router) => {
    router.use(parser.urlencoded({extended: true}));
    router.use(parser.json());
};

export const handleCompression = (router: Router) => {
    router.use(compression());
};
