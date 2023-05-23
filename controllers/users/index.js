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
exports.deleteUser = exports.updateUser = exports.loginUser = exports.addUser = exports.getUsers = exports.registerUser = exports.getSubscribers = exports.subscribeUser = void 0;
const nanoid_1 = require("nanoid");
const moment_1 = __importDefault(require("moment"));
const Database_1 = __importStar(require("../../database/Database"));
const subscribeUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.params;
        Database_1.default.subscribeUser(email);
        res.sendStatus(200);
    }
    catch (error) {
        res.sendStatus(500);
    }
});
exports.subscribeUser = subscribeUser;
const getSubscribers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const responseData = yield Database_1.default.getSubscribers();
        console.log(responseData);
        res.json(responseData);
    }
    catch (error) {
        res.sendStatus(500);
    }
});
exports.getSubscribers = getSubscribers;
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const generateUserID = (0, nanoid_1.customAlphabet)("123456789abcdekontact", 11);
        let userid;
        while (true) {
            userid = generateUserID();
            console.log("generating user id");
            let isValid = yield Database_1.default.createUserId(userid);
            if (isValid)
                break;
        }
        const data = req.body;
        const user = {
            userid: userid,
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            phone: data.phone,
            role: "user",
            createddate: (0, moment_1.default)().format().toString(),
            password: data.password
        };
        const responseData = yield Database_1.default.createUser(user);
        res.json(responseData);
    }
    catch (e) {
        console.log(e);
        res.status(Database_1.HTTPCode.SERVER_ERROR).json(e);
    }
});
exports.registerUser = registerUser;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const responseData = yield Database_1.default.getUsers();
        res.json(responseData);
    }
    catch (error) {
        res.status(Database_1.HTTPCode.SERVER_ERROR).json(error);
    }
});
exports.getUsers = getUsers;
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const user = {
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            phone: data.phone,
            role: "user",
            createddate: (0, moment_1.default)().format().toString(),
            password: data.password
        };
        yield Database_1.default.createUser(user);
        const responseData = yield Database_1.default.getUsers();
        res.json(responseData);
    }
    catch (e) {
        res.status(Database_1.HTTPCode.SERVER_ERROR).json(e);
    }
});
exports.addUser = addUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const user = {
            email: data.email,
            password: data.password
        };
        const responseData = yield Database_1.default.getUser(user);
        res.json(responseData);
    }
    catch (error) {
        res.status(Database_1.HTTPCode.SERVER_ERROR).json(error);
    }
});
exports.loginUser = loginUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const user = {
            firstname: data.firstname,
            lastname: data.lastname,
            role: data.role,
            phone: data.phone,
            email: data.email,
            password: ""
        };
        const responseData = yield Database_1.default.updateUser(user);
        console.log(responseData);
        res.json(responseData);
    }
    catch (error) {
        res.status(Database_1.HTTPCode.SERVER_ERROR).json(error);
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.query;
        const user = {
            email: email
        };
        let responseData = yield Database_1.default.deleteUser(user);
        responseData.data = yield (yield Database_1.default.getUsers()).data;
        res.json(responseData);
    }
    catch (error) {
        res.status(Database_1.HTTPCode.SERVER_ERROR).json(error);
    }
});
exports.deleteUser = deleteUser;
