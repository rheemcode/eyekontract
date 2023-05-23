import { Request, Response } from "express";
import EyekontactDatabase, { HTTPCode, Order } from "../../database/Database";

export const getPage = async (req: Request, res: Response) => {
    try {
        const responseData = await EyekontactDatabase.getWebPage();
        res.json(responseData);

    } catch (error) {
        res.status(HTTPCode.SERVER_ERROR).json(error);
    }
}


export const updatePage= async (req: Request, res: Response) => {
    try {
        const pageContent = req.body.content;

        const responseData = await EyekontactDatabase.UpdateWebpage(pageContent);
        res.json(responseData);

    } catch (error) {
        console.log(error)
        res.status(HTTPCode.SERVER_ERROR).json(error);
    }
}