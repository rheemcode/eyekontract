"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.recieveEvents = void 0;
const moment_1 = __importDefault(require("moment"));
const Database_1 = __importStar(require("../../database/Database"));
const utils_1 = require("../../utils");
const __1 = require("../..");
const recieveEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let hash = req.headers["verif-hash"];
        if (hash) {
            if (hash == process.env.SEC_HASH) {
                console.log(req.body);
                res.send(200);
            }
        }
        res.send(400);
    }
    catch (error) {
        res.send(405);
    }
});
exports.recieveEvents = recieveEvents;
const checkoutProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = req.body.userData;
        let product = req.body.productData;
        const request = __1.mailjet
            .post("send", { 'version': 'v3.1' })
            .request({
            "Messages": [{
                    "From": {
                        "Email": "oluwabless123@gmail.com",
                        "Name": "Eyekontact"
                    },
                    "To": [{
                            "Email": "info@eyekontact.com.ng",
                            "Name": "Eyekontact"
                        }],
                    "Subject": "New Order From Website!",
                    "TextPart": `
                    Name: ${user.fullName}
                    Email: ${user.email}
                    Phone Number: ${user.phoneNumber}
                    message: ${user.message}
        
                    Order Data:
                    Product Name: ${product.productname}
                    Product Location: ${product.productlocation}
                    Product Price: ${product.productprice}
                    Product Status: ${product.productstatus}
                    `,
                    "HTMLPart": ""
                }]
        });
        request
            .then((info) => __awaiter(void 0, void 0, void 0, function* () {
            let transactionID = yield (0, utils_1.getTransactionID)();
            let orderid = transactionID;
            const order = {
                orderid,
                orderstatus: "pending",
                userid: user.userid,
                productid: product.productid,
                orderdate: (0, moment_1.default)().format().toString(),
                paymentmethod: "card"
            };
            yield Database_1.default.createOrder(order);
            res.json({ message: "created successfully", status: "success" });
        })).catch((err) => {
            console.log("error occured");
            res.json({ message: "order book failed", status: "error" });
        });
    }
    catch (error) {
        console.log(error);
        res.status(Database_1.HTTPCode.SERVER_ERROR).json(error);
    }
});
exports.default = checkoutProduct;
// app.post("/checkout", 
