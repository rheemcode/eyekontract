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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePage = exports.getPage = void 0;
const Database_1 = __importStar(require("../../database/Database"));
const getPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const responseData = yield Database_1.default.getWebPage();
        res.json(responseData);
    }
    catch (error) {
        res.status(Database_1.HTTPCode.SERVER_ERROR).json(error);
    }
});
exports.getPage = getPage;
const updatePage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pageContent = req.body.content;
        const responseData = yield Database_1.default.UpdateWebpage(pageContent);
        res.json(responseData);
    }
    catch (error) {
        console.log(error);
        res.status(Database_1.HTTPCode.SERVER_ERROR).json(error);
    }
});
exports.updatePage = updatePage;
