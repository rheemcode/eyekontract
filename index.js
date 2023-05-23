"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailjet = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swaggerFile = require('./swagger_output.json');
const MJ_APIKEY_PUBLIC = 'df6aa7581d57ab2bbed8bf5e3dd6e334';
const MJ_APIKEY_PRIVATE = 'f1e335ad908f3644844543182a6667ac';
const routes_1 = __importDefault(require("./routes"));
//TODO: check if user is logged in and an admin before accessing data
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json({ limit: "50mb" }));
app.use((0, cors_1.default)({
    origin: '*'
}));
app.set("port", process.env.PORT || 5000);
app.set("host", process.env.HOST);
app.use(routes_1.default);
app.use('/doc', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerFile));
exports.mailjet = require('node-mailjet')
    .connect(MJ_APIKEY_PUBLIC, MJ_APIKEY_PRIVATE);
console.log("Port");
app.listen(app.get("port"), () => {
    console.log(`server started at port: ${app.get("port")}`);
});
