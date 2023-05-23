import { Request, Response } from "express";
import { customAlphabet } from "nanoid"
import moment from "moment";
import EyekontactDatabase, { HTTPCode, Product } from "../../database/Database";

export const addProduct = async (req: Request, res: Response) => {
    try {

        const generateProductId = customAlphabet("123456789abcdekontact", 8);
        let productid
        while (true) {
            productid = generateProductId()
            let isValid = await EyekontactDatabase.createProductId(productid)
            if (isValid) break;
        }

        const data = req.body;
        const product: Product = {
            productid: productid,
            productname: data.productname,
            productimage: data.productimage,
            productcategory: data.productcategory,
            productprice: data.productprice,
            productlocation: data.productlocation,
            productstatus: data.productstatus,
            addeddate: moment().format().toString()
        }

        // TODO return added product
        let responseData = await EyekontactDatabase.createProduct(product);
        res.json(responseData);

    } catch (error) {
        console.log("error at addProduc")
        res.status(HTTPCode.SERVER_ERROR).json(error);
    }
}

export const getProducts = async (req: Request, res: Response) => {
    try {
        const responseData = await EyekontactDatabase.getProducts();
        res.json(responseData);

    } catch (error) {
        res.status(HTTPCode.SERVER_ERROR).json(error);
    }
}

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const newProductData = req.body.product;
        const oldProductData = req.body.productOld;

        const product: Product = {
            productname: newProductData.productname,
            productimage: newProductData.productimage,
            productcategory: newProductData.productcategory,
            productprice: newProductData.productprice,
            productlocation: newProductData.productlocation,
            productstatus: newProductData.productstatus,
            addeddate: ""
        };

        const productOld: Product = {
            productname: oldProductData.productname,
            productimage: oldProductData.productimage,
            productcategory: oldProductData.productcategory,
            productprice: oldProductData.productprice,
            productlocation: oldProductData.productlocation,
            productstatus: oldProductData.productstatus,
            addeddate: ""
        };

        const responseData = await EyekontactDatabase.updateProduct(product, productOld);
        res.json(responseData);

    } catch (error) {
        res.status(HTTPCode.SERVER_ERROR).json(error);
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { productid } = req.params

        const product: Product = {
            productid: productid as string,
        }

        //TODO: send deleted product instead
        const responseData = await EyekontactDatabase.deleteProduct(product);
        responseData.data = productid;

        res.json(responseData);

    } catch (error) {
        console.log(error)
        res.status(HTTPCode.SERVER_ERROR).json(error);
    }
}