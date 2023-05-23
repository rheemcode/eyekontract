import { Request, Response } from "express";
import nanoid, { customAlphabet } from "nanoid";
import moment from "moment";
import EyekontactDatabase, { HTTPCode, User } from "../../database/Database";

export const subscribeUser = async (req: Request, res: Response) => {
    try {
        const { email } = req.params;
        EyekontactDatabase.subscribeUser(email);
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(500);

    }
}

export const getSubscribers = async (req: Request, res: Response) => {
    try {
        const responseData = await EyekontactDatabase.getSubscribers();
        console.log(responseData)
        res.json(responseData);
    } catch (error) {
        res.sendStatus(500);
    }
}

export const registerUser = async (req: Request, res: Response) => {
    try {

        const generateUserID = customAlphabet("123456789abcdekontact", 11);
        let userid
        while (true) {
            userid = generateUserID()
            console.log("generating user id");
            let isValid = await EyekontactDatabase.createUserId(userid)
            if (isValid) break
        }


        const data = req.body;
        const user: User = {
            userid: userid,
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            phone: data.phone,
            role: "user",
            createddate: moment().format().toString(),
            password: data.password
        }

        const responseData = await EyekontactDatabase.createUser(user);
        res.json(responseData)
    }
    catch (e) {
        console.log(e)
        res.status(HTTPCode.SERVER_ERROR).json(e);
    }
}

export const getUsers = async (req: Request, res: Response) => {
    try {
        const responseData = await EyekontactDatabase.getUsers();
        res.json(responseData);
    } catch (error) {
        res.status(HTTPCode.SERVER_ERROR).json(error);
    }
}

export const addUser = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const user: User = {
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            phone: data.phone,
            role: "user",
            createddate: moment().format().toString(),
            password: data.password
        }

        await EyekontactDatabase.createUser(user);
        const responseData = await EyekontactDatabase.getUsers();
        res.json(responseData)
    }
    catch (e) {
        res.status(HTTPCode.SERVER_ERROR).json(e);
    }
}

export const loginUser = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const user: User = {
            email: data.email,
            password: data.password
        }

        const responseData = await EyekontactDatabase.getUser(user);
        res.json(responseData);

    } catch (error) {
        res.status(HTTPCode.SERVER_ERROR).json(error);
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const user: User = {
            firstname: data.firstname,
            lastname: data.lastname,
            role: data.role,
            phone: data.phone,
            email: data.email,
            password: ""
        };

        const responseData = await EyekontactDatabase.updateUser(user);
        console.log(responseData)
        res.json(responseData);

    } catch (error) {
        res.status(HTTPCode.SERVER_ERROR).json(error);
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { email } = req.query;

        const user: User = {
            email: email as string
        };

        let responseData = await EyekontactDatabase.deleteUser(user);
        responseData.data = await (await EyekontactDatabase.getUsers()).data;
        res.json(responseData);

    } catch (error) {
        res.status(HTTPCode.SERVER_ERROR).json(error);
    }
}