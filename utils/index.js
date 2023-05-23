"use strict";
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
exports.getTransactionID = void 0;
const nanoid_1 = require("nanoid");
const Database_1 = __importDefault(require("../database/Database"));
const getTransactionID = () => __awaiter(void 0, void 0, void 0, function* () {
    const generateTransactionID = (0, nanoid_1.customAlphabet)("123456789abcdekontact", 11);
    let transactionID;
    while (true) {
        transactionID = generateTransactionID();
        let isValid = yield Database_1.default.createTransactionKey({ id: transactionID });
        if (isValid)
            return transactionID;
    }
});
exports.getTransactionID = getTransactionID;
