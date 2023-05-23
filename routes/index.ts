import userRoutes from "./users"
import productRoutes from "./products"
import orderRoutes from "./orders"
import pageRoutes from "./webpage"
import blogRoutes from "./blogs"
import express, { response } from "express"
import { PassThrough } from "form-data"
import formidable from "formidable"
import Mailgun from "mailgun.js"
import { mailjet } from ".."
import { HTTPCode } from "../database/Database"
import { Client } from "basic-ftp";
import FormData from "form-data";
import fs, { constants } from 'fs';
import path from "path"

const router = express.Router()



router.use("", userRoutes);
router.use("", productRoutes);
router.use("", orderRoutes);
router.use("", blogRoutes);
router.use("", pageRoutes);

async function uploadFile(filePath: any, remotePath: string) {
    // while (!fs.existsSync(filePath)) {
    // if (!fs.existsSync(filePath)) return;
    // }

    const client = new Client()
    client.ftp.verbose = true
    try {
        await client.access({
            host: "ftp.eyekontact.com.ng",
            user: "fileman@eyekontact.com.ng",
            password: "Development@101",
            secure: false
        })
        // console.log(await client.list())
        await client.uploadFrom(filePath, "uploads/images/" + remotePath)
    }
    catch (err) {
        console.log(err)
    }
    client.close()
}

router.post("/contact", async (req, res) => {
    try {
        let user = req.body.userData;

        const mailgun = new Mailgun(FormData);
        const client = mailgun.client({ username: "dev", key: "1b33a37ba3e5f408975440105af30109-1b237f8b-40c31169" })

        const request = mailjet
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
            })
        request
            .then((result: any) => {
                console.log(result.body)
            })
            .catch((err: any) => {
                console.log(err)
                console.log(err.statusCode)
            })

        res.json({ message: "success" });

    } catch (error) {
        console.log(error);
        res.status(HTTPCode.SERVER_ERROR).json(error)
    }
})


router.post("/uploads/images", async (req, res) => {
    let allFiles: string[] = []
    const pass = new PassThrough()

    try {
        let form = formidable({ multiples: true, keepExtensions: true, uploadDir: path.resolve(__dirname + "/uploads/images/") });

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

        let fileMeta = { name: "", type: "" }
        form.onPart = part => {
            if (!part.originalFilename) {
                form._handlePart(part)
                return
            }
            fileMeta.name = part.originalFilename
            fileMeta.type = part.mimetype as string;
            part.on('data', function (buffer) {
                pass.write(buffer)
            })
            part.on('end', function () {
                pass.end()
            })
        }
        form.parse(req, err => {
            if (err) {
                console.log(err);
                // req.minio = { error: err }
            } else {
                console.log("uploading file")
                allFiles.push("https://eyekontact.com.ng/uploads/images/" + fileMeta.name);
                res.json({ default: allFiles[0] });

                uploadFile(pass, fileMeta.name)
                // handlePostStream(req, next, fileMeta, pass)
            }
        })



    } catch (error) {
        console.log(error);
        res.status(HTTPCode.SERVER_ERROR).json(error)
    }

    setTimeout(() => console.log(fs.existsSync(allFiles[0])), 5000);

})

router.get('/blogImages/:file', function (req, res) {
    try {
        let file = req.params.file;

        res.send("https://eyekontact.com.ng/uploads" + file);

    } catch (err) {
        res.status(HTTPCode.SERVER_ERROR).json({ error: err });
    }
});

router.get("/uploads/images/:file", (req, res) => {
    try {
        let file = req.params.file;
        res.send("https://eyekontact.com.ng/uploads/images/" + file);
    } catch (err) {
        res.status(HTTPCode.SERVER_ERROR).json({ error: err });
    }
});

router.get("/uploads/videos/:file", (req, res) => {
    try {
        let file = req.params.file;
        res.sendFile(path.join(__dirname, 'uploads/videos/' + file));
    } catch (err) {
        res.status(HTTPCode.SERVER_ERROR).json({ error: err });
    }
});

router.get("/uploads/icons/:file", (req, res) => {
    try {
        let file = req.params.file;
        res.sendFile(path.join(__dirname, 'uploads/images/' + file));
    } catch (err) {
        res.status(HTTPCode.SERVER_ERROR).json({ error: err });
    }
})

export default router;