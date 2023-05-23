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
exports.deleteOrder = exports.updateOrder = exports.getOrders = exports.addOrder = void 0;
const moment_1 = __importDefault(require("moment"));
const Database_1 = __importStar(require("../../database/Database"));
const utils_1 = require("../../utils");
const addOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let orderid = yield (0, utils_1.getTransactionID)();
        const data = req.body;
        const order = {
            orderid: orderid,
            userid: data.userid,
            orderstatus: data.orderstatus,
            productid: data.productid,
            orderdate: (0, moment_1.default)().format().toString(),
            paymentmethod: data.paymentmethod,
        };
        // TODO return added product
        let responseData = yield Database_1.default.createOrder(order);
        res.json(responseData);
    }
    catch (error) {
        console.log("error at add order");
        res.status(Database_1.HTTPCode.SERVER_ERROR).json(error);
    }
});
exports.addOrder = addOrder;
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const responseData = yield Database_1.default.getOrders();
        res.json(responseData);
    }
    catch (error) {
        res.status(Database_1.HTTPCode.SERVER_ERROR).json(error);
    }
});
exports.getOrders = getOrders;
const updateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderData = req.body;
        const order = {
            orderid: orderData.orderid,
            orderstatus: orderData.orderstatus,
            paymentmethod: orderData.paymentmethod,
            orderdate: orderData.orderdate,
        };
        const responseData = yield Database_1.default.updateOrder(order);
        res.json(responseData);
    }
    catch (error) {
        console.log(error);
        res.status(Database_1.HTTPCode.SERVER_ERROR).json(error);
    }
});
exports.updateOrder = updateOrder;
const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { orderid } = req.query;
        const order = {
            orderid: orderid,
        };
        //TODO: send deleted product instead
        const responseData = yield Database_1.default.deleteOrder(order);
        responseData.data = yield (yield Database_1.default.getOrders()).data;
        res.json(responseData);
    }
    catch (error) {
        res.status(Database_1.HTTPCode.SERVER_ERROR).json(error);
    }
});
exports.deleteOrder = deleteOrder;
