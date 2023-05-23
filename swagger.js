"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_autogen_1 = __importDefault(require("swagger-autogen"));
const doc = {
    info: {
        title: 'Eyekontact API',
        description: 'Eyekontact API',
    },
    host: 'localhost:5000',
    schemes: ['http'],
};
const outputFile = './swagger_output.json';
const endpointsFiles = ['./routes/index.js', "./routes/users/index.js", "./routes/products/index.js", "./routes/orders/index.js", "./routes/webpage/index.js", "./routes/blogs/index.js"];
(0, swagger_autogen_1.default)(outputFile, endpointsFiles, doc);
