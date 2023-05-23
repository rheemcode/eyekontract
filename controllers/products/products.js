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
exports.deleteProduct = exports.updateProduct = exports.getProducts = exports.addProduct = void 0;
const nanoid_1 = require("nanoid");
const moment_1 = __importDefault(require("moment"));
const Database_1 = __importStar(require("../../database/Database"));
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const generateProductId = (0, nanoid_1.customAlphabet)("123456789abcdekontact", 8);
        let productid;
        while (true) {
            productid = generateProductId();
            let isValid = yield Database_1.default.createProductId(productid);
            if (isValid)
                break;
        }
        const data = req.body;
        const product = {
            productid: productid,
            productname: data.productname,
            productimage: data.productimage,
            productcategory: data.productcategory,
            productprice: data.productprice,
            productlocation: data.productlocation,
            productstatus: data.productstatus,
            addeddate: (0, moment_1.default)().format().toString()
        };
        // TODO return added product
        let responseData = yield Database_1.default.createProduct(product);
        res.json(responseData);
    }
    catch (error) {
        console.log("error at addProduc");
        res.status(Database_1.HTTPCode.SERVER_ERROR).json(error);
    }
});
exports.addProduct = addProduct;
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const responseData = yield Database_1.default.getProducts();
        res.json(responseData);
    }
    catch (error) {
        res.status(Database_1.HTTPCode.SERVER_ERROR).json(error);
    }
});
exports.getProducts = getProducts;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newProductData = req.body.product;
        const oldProductData = req.body.productOld;
        const product = {
            productname: newProductData.productname,
            productimage: newProductData.productimage,
            productcategory: newProductData.productcategory,
            productprice: newProductData.productprice,
            productlocation: newProductData.productlocation,
            productstatus: newProductData.productstatus,
            addeddate: ""
        };
        const productOld = {
            productname: oldProductData.productname,
            productimage: oldProductData.productimage,
            productcategory: oldProductData.productcategory,
            productprice: oldProductData.productprice,
            productlocation: oldProductData.productlocation,
            productstatus: oldProductData.productstatus,
            addeddate: ""
        };
        const responseData = yield Database_1.default.updateProduct(product, productOld);
        res.json(responseData);
    }
    catch (error) {
        res.status(Database_1.HTTPCode.SERVER_ERROR).json(error);
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productid } = req.params;
        const product = {
            productid: productid,
        };
        //TODO: send deleted product instead
        const responseData = yield Database_1.default.deleteProduct(product);
        responseData.data = productid;
        res.json(responseData);
    }
    catch (error) {
        console.log(error);
        res.status(Database_1.HTTPCode.SERVER_ERROR).json(error);
    }
});
exports.deleteProduct = deleteProduct;
