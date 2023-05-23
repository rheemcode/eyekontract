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
const users_1 = __importDefault(require("./users"));
const products_1 = __importDefault(require("./products"));
const orders_1 = __importDefault(require("./orders"));
const webpage_1 = __importDefault(require("./webpage"));
const blogs_1 = __importDefault(require("./blogs"));
const express_1 = __importDefault(require("express"));
const form_data_1 = require("form-data");
const formidable_1 = __importDefault(require("formidable"));
const mailgun_js_1 = __importDefault(require("mailgun.js"));
const __1 = require("..");
const Database_1 = require("../database/Database");
const basic_ftp_1 = require("basic-ftp");
const form_data_2 = __importDefault(require("form-data"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const router = express_1.default.Router();
router.use("", users_1.default);
router.use("", products_1.default);
router.use("", orders_1.default);
router.use("", blogs_1.default);
router.use("", webpage_1.default);
function uploadFile(filePath, remotePath) {
    return __awaiter(this, void 0, void 0, function* () {
        // while (!fs.existsSync(filePath)) {
        // if (!fs.existsSync(filePath)) return;
        // }
        const client = new basic_ftp_1.Client();
        client.ftp.verbose = true;
        try {
            yield client.access({
                host: "ftp.eyekontact.com.ng",
                user: "fileman@eyekontact.com.ng",
                password: "Development@101",
                secure: false
            });
            // console.log(await client.list())
            yield client.uploadFrom(filePath, "uploads/images/" + remotePath);
        }
        catch (err) {
            console.log(err);
        }
        client.close();
    });
}
router.post("/contact", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = req.body.userData;
        const mailgun = new mailgun_js_1.default(form_data_2.default);
        const client = mailgun.client({ username: "dev", key: "1b33a37ba3e5f408975440105af30109-1b237f8b-40c31169" });
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
                    "Subject": "New message from eyekontact website!",
                    "TextPart": `
                    Name: ${user.fullName}
                    Email: ${user.email}
                    Phone Number: ${user.phoneNumber}
                    message: ${user.message}
                    `,
                    "HTMLPart": ""
                }]
        });
        request
            .then((result) => {
            console.log(result.body);
        })
            .catch((err) => {
            console.log(err);
            console.log(err.statusCode);
        });
        res.json({ message: "success" });
    }
    catch (error) {
        console.log(error);
        res.status(Database_1.HTTPCode.SERVER_ERROR).json(error);
    }
}));
router.post("/uploads/images", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let allFiles = [];
    const pass = new form_data_1.PassThrough();
    try {
        let form = (0, formidable_1.default)({ multiples: true, keepExtensions: true, uploadDir: path_1.default.resolve(__dirname + "/uploads/images/") });
        // form.parse(req, async function (err, fields: any, files) {
        //     let images = files.image as formidable.File[];
        //     let responseData = "";
        //     if (images.length)
        //         for (let i = 0; i < images.length; i++) {
        //             let image = images[i];
        //             allFiles[i] = path.join(__dirname, "uploads/" + image.newFilename);
        //             responseData += image.newFilename + "\n";
        //             await uploadFile(path.join(__dirname, "uploads/" + image.newFilename), image.newFilename);
        //             // fs.rm(path.join(__dirname, "uploads/" + image.newFilename), (err) => {
        //             //     console.log(err);
        //             // })
        //             if (i == (images.length - 1)) {
        //             }
        //         }
        //     else if (images) {
        //         let image = files.image as formidable.File;
        //         // responseData += image.newFilename + "\n";
        //         allFiles[0] = path.join(__dirname, "uploads/" + image.newFilename)
        //         await uploadFile(path.join(__dirname, "uploads/" + image.newFilename), image.newFilename);
        //         // fs.rm(path.join(__dirname, "uploads/" + image.newFilename), (err) => {
        //         //     console.log(err);
        //         // })
        //         // res.json({ default: "https://eyekontact.com.ng/uploads/images/" + responseData });
        //     }
        //     res.json({ default: "https://eyekontact.com.ng/uploads/images/" + allFiles[0] });
        // })
        // form.once("end", () => {
        //     console.log(fs.existsSync(allFiles[0]));
        // })
        let fileMeta = { name: "", type: "" };
        form.onPart = part => {
            if (!part.originalFilename) {
                form._handlePart(part);
                return;
            }
            fileMeta.name = part.originalFilename;
            fileMeta.type = part.mimetype;
            part.on('data', function (buffer) {
                pass.write(buffer);
            });
            part.on('end', function () {
                pass.end();
            });
        };
        form.parse(req, err => {
            if (err) {
                console.log(err);
                // req.minio = { error: err }
            }
            else {
                console.log("uploading file");
                allFiles.push("https://eyekontact.com.ng/uploads/images/" + fileMeta.name);
                res.json({ default: allFiles[0] });
                uploadFile(pass, fileMeta.name);
                // handlePostStream(req, next, fileMeta, pass)
            }
        });
    }
    catch (error) {
        console.log(error);
        res.status(Database_1.HTTPCode.SERVER_ERROR).json(error);
    }
    setTimeout(() => console.log(fs_1.default.existsSync(allFiles[0])), 5000);
}));
router.get('/blogImages/:file', function (req, res) {
    try {
        let file = req.params.file;
        res.send("https://eyekontact.com.ng/uploads" + file);
    }
    catch (err) {
        res.status(Database_1.HTTPCode.SERVER_ERROR).json({ error: err });
    }
});
router.get("/uploads/images/:file", (req, res) => {
    try {
        let file = req.params.file;
        res.send("https://eyekontact.com.ng/uploads/images/" + file);
    }
    catch (err) {
        res.status(Database_1.HTTPCode.SERVER_ERROR).json({ error: err });
    }
});
router.get("/uploads/videos/:file", (req, res) => {
    try {
        let file = req.params.file;
        res.sendFile(path_1.default.join(__dirname, 'uploads/videos/' + file));
    }
    catch (err) {
        res.status(Database_1.HTTPCode.SERVER_ERROR).json({ error: err });
    }
});
router.get("/uploads/icons/:file", (req, res) => {
    try {
        let file = req.params.file;
        res.sendFile(path_1.default.join(__dirname, 'uploads/images/' + file));
    }
    catch (err) {
        res.status(Database_1.HTTPCode.SERVER_ERROR).json({ error: err });
    }
});
exports.default = router;
