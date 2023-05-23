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
exports.deleteBlog = exports.updateBlog = exports.getBlogs = exports.addBlog = void 0;
const nanoid_1 = require("nanoid");
const Database_1 = __importStar(require("../../database/Database"));
const reading_time_1 = __importDefault(require("reading-time"));
const addBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const generateBlogID = (0, nanoid_1.customAlphabet)("123456789abcdekontact", 8);
        let blogid;
        while (true) {
            blogid = generateBlogID();
            let isValid = yield Database_1.default.createBlogId(blogid);
            if (isValid)
                break;
        }
        const data = req.body;
        const blog = {
            blogid: blogid,
            creatorid: data.creatorid,
            thumbnail: data.thumbnail,
            title: data.title,
            category: data.category,
            createddate: data.createddate,
            data: data.data,
            tags: data.tags,
            status: data.status,
            comments: data.comments ? data.comments : "undefined",
        };
        console.log(blog);
        // TODO return added product
        let responseData = yield Database_1.default.createBlog(blog);
        res.json(responseData);
    }
    catch (error) {
        console.log(error);
        res.status(Database_1.HTTPCode.SERVER_ERROR).json(error);
    }
});
exports.addBlog = addBlog;
const getBlogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const responseData = yield Database_1.default.getBlogs();
        res.json(responseData);
    }
    catch (error) {
        res.status(Database_1.HTTPCode.SERVER_ERROR).json(error);
    }
});
exports.getBlogs = getBlogs;
const updateBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const blog = {
            blogid: data.blogid,
            thumbnail: data.thumbnail,
            title: data.title,
            category: data.category,
            createddate: data.createddate,
            data: data.data,
            tags: data.tags,
            status: data.status,
            comments: data.comments == "" ? data.comments : "undefined",
            readtime: (0, reading_time_1.default)(data.data).text
        };
        const responseData = yield Database_1.default.updateBlog(blog);
        res.json(responseData);
    }
    catch (error) {
        console.log(error);
        res.status(Database_1.HTTPCode.SERVER_ERROR).json(error);
    }
});
exports.updateBlog = updateBlog;
const deleteBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { blogid } = req.query;
        const blog = {
            blogid: blogid,
        };
        //TODO: send deleted product instead
        const responseData = yield Database_1.default.deleteBlog(blog);
        responseData.data = yield (yield Database_1.default.getBlogs()).data;
        res.json(responseData);
    }
    catch (error) {
        res.status(Database_1.HTTPCode.SERVER_ERROR).json(error);
    }
});
exports.deleteBlog = deleteBlog;
