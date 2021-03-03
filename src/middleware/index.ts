import {
    handleCors,
    handleBodyRequestParsing,
    handleCompression
} from "./common";

// Exportamos los middleware definidos
export default [handleCors, handleBodyRequestParsing, handleCompression];
