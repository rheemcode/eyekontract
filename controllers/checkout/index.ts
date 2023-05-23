import { Request, Response } from "express";
import axios from "axios";
import { ChargePayload, FlutterWave } from "flutterwave-node-v3";
import moment from "moment";
import { customAlphabet } from "nanoid";
import EyekontactDatabase, { HTTPCode, Order, Product, User } from "../../database/Database";
import { getTransactionID } from "../../utils";
import { mailjet } from "../..";


export const recieveEvents = async (req: Request, res: Response) => {
    try {

        let hash = req.headers["verif-hash"];
        if (hash) {
            if (hash == process.env.SEC_HASH) {
                console.log(req.body);
                res.send(200);
            }
        }

        res.send(400);

    } catch (error) {
        res.send(405);
    }

}

const checkoutProduct = async (req: Request, res: Response) => {
    try {


        let user = req.body.userData;
        let product: Product = req.body.productData as Product;
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
            })
        request
            .then(async (info: any) => {
                let transactionID = await getTransactionID();
                let orderid = transactionID;

                const order: Order = {
                    orderid,
                    orderstatus: "pending",
                    userid: user.userid,
                    productid: product.productid,
                    orderdate: moment().format().toString(),
                    paymentmethod: "card"
                };

                await EyekontactDatabase.createOrder(order);
                res.json({ message: "created successfully", status: "success" });
            }).catch((err: any) => {
                console.log("error occured")
                res.json({ message: "order book failed", status: "error" });
            });



    } catch (error) {
        console.log(error);
        res.status(HTTPCode.SERVER_ERROR).json(error)
    }
}



export default checkoutProduct

// app.post("/checkout", 