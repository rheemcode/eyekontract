import { Request, Response } from "express";
import { customAlphabet } from "nanoid"
import moment from "moment";
import EyekontactDatabase, { HTTPCode, Order } from "../../database/Database";
import { getTransactionID } from "../../utils";

export const addOrder = async (req: Request, res: Response) => {
    try {

        let orderid = await getTransactionID();

        const data = req.body;
        const order: Order = {
            orderid: orderid,
            userid: data.userid,
            orderstatus: data.orderstatus,
            productid: data.productid,
            orderdate: moment().format().toString(),
            paymentmethod: data.paymentmethod,
        }

        // TODO return added product
        let responseData = await EyekontactDatabase.createOrder(order);
        res.json(responseData);

    } catch (error) {
        console.log("error at add order")
        res.status(HTTPCode.SERVER_ERROR).json(error);
    }
}

export const getOrders = async (req: Request, res: Response) => {
    try {
        const responseData = await EyekontactDatabase.getOrders();
        res.json(responseData);

    } catch (error) {
        res.status(HTTPCode.SERVER_ERROR).json(error);
    }
}


export const updateOrder = async (req: Request, res: Response) => {
    try {
        const orderData = req.body;

        const order: Order = {
            orderid: orderData.orderid,
            orderstatus: orderData.orderstatus,
            paymentmethod: orderData.paymentmethod,
            orderdate: orderData.orderdate,
        };

        const responseData = await EyekontactDatabase.updateOrder(order);
        res.json(responseData);

    } catch (error) {
        console.log(error)
        res.status(HTTPCode.SERVER_ERROR).json(error);
    }
}

export const deleteOrder = async (req: Request, res: Response) => {
    try {
        const { orderid } = req.query;

        const order: Order = {
            orderid: orderid as string,
        }

        //TODO: send deleted product instead
        const responseData = await EyekontactDatabase.deleteOrder(order);
        responseData.data = await (await EyekontactDatabase.getOrders()).data;

        res.json(responseData);

    } catch (error) {
        res.status(HTTPCode.SERVER_ERROR).json(error);
    }
}