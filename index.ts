import express, { response } from "express"
import nanoid, { customAlphabet } from "nanoid";
import bodyParser from "body-parser";
import cors from "cors";
import 'dotenv/config'

import swaggerUi from "swagger-ui-express"
const swaggerFile = require('./swagger_output.json')

const MJ_APIKEY_PUBLIC = 'df6aa7581d57ab2bbed8bf5e3dd6e334'
const MJ_APIKEY_PRIVATE = 'f1e335ad908f3644844543182a6667ac'

import routes from "./routes"


//TODO: check if user is logged in and an admin before accessing data

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb" }))
app.use(cors({
    origin: '*'
}));

app.set("port", process.env.PORT || 5000);
app.set("host", process.env.HOST);

app.use(routes);
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))


export const mailjet = require('node-mailjet')
    .connect(MJ_APIKEY_PUBLIC, MJ_APIKEY_PRIVATE)


console.log("Port");

app.listen(app.get("port"), () => {
    console.log(`server started at port: ${app.get("port")}`)
});
