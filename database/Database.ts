import sqlite3 from "sqlite3";
import { Database, open } from "sqlite";
import bcrypt from "bcrypt";
import { response } from "express";
import { pageDefaultState } from "./pageDefault";
import EyekontactCache from "../cache";
import readingTime from "reading-time"
import mysql from "mysql2/promise"
import { Client } from "pg";

export enum HTTPCode {
    OK = 200,
    CREATED = 201,
    ACCEPTED = 202,
    FOUND = 302,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    CONFLICT = 409,
    SERVER_ERROR = 500
}

declare interface ResponseData {
    code: HTTPCode;
    message: string;
    data?: string | User | User[] | Blog[] | Blog | Product | Product[] | Promise<User | Product> | Promise<User[] | Product[]> | Promise<undefined>
    dataOld?: string | User | User[] | Product | Product[] | Promise<User | Product> | Promise<User[] | Product[]> | Promise<undefined>

}

export declare interface User {
    userid?: string;
    firstname?: string;
    lastname?: string;
    email: string;
    role?: string;
    phone?: string;
    createddate?: string;
    password?: string;
    passwordhash?: string;
}
export declare interface Product {
    productid?: string;
    productname?: string;
    productimage?: string;
    productcategory?: string;
    productlocation?: string;
    productprice?: string;
    productstatus?: string;
    addeddate?: string;
}

export declare interface Order {
    orderid?: string;
    userid?: string;
    productid?: string;
    orderdate?: string;
    orderstatus?: string;
    paymentmethod?: string;
}

export declare interface Blog {
    blogid?: string;
    creatorid?: string;
    firstname?: string;
    lastname?: string;
    thumbnail?: string;
    title?: string;
    category?: string;
    createddate?: string;
    data?: string;
    blogstatus?: string;
    tags?: string;
    status?: string;
    comments?: string;
    readtime?: string;
}

export declare interface TransactionKey {
    id: string;
}

//FIXME: clean up code repetition

export default class EyekontactDatabase {
    private static database: Client;
    private static usersCache: EyekontactCache<User[]>;
    private static ordersCache: EyekontactCache<Order[]>;

    static async initDatabase() {
        this.database = new Client({
            connectionString: "postgres://khajzwlrqufzow:7e2276cb57b165a9047cb03d2f6af110cb71192b0fc165a92db10ec5a0ff0133@ec2-52-204-196-4.compute-1.amazonaws.com:5432/ddp6af1d0109ft",
            ssl: {
                rejectUnauthorized: false
            }
        });

        await this.database.connect();
        console.log("database connected");
        // this.database.on('trace', (data: any) => { console.log(data) });
        this.usersCache = new EyekontactCache;
        this.ordersCache = new EyekontactCache;
        await this._createTables();
    }

    private static async _createTables() {
        try {

            // await this.database.query("DELETE FROM Users WHERE email = 'eyekontact@admin.com'");
            //  await this.database.query("DROP TABLE IF EXISTS WebPage");

            // await this.database.query("DROP TABLE IF EXISTS Products");
            // await this.database.exec("DROP TABLE IF EXISTS Blogs");

            // await this.database.query("DROP TABLE IF EXISTS Blogs");

            await this.database.query("CREATE TABLE IF NOT EXISTS Users  (userid SERIAL PRIMARY KEY, createddate VARCHAR(600), firstname VARCHAR(600), lastname VARCHAR(600), email VARCHAR(600), phone VARCHAR(600), role VARCHAR(600), passwordhash TEXT)");
            await this.database.query("CREATE TABLE IF NOT EXISTS Products (productid SERIAL PRIMARY KEY, productname VARCHAR(600), productimage VARCHAR(600), productcategory VARCHAR(600), productprice VARCHAR(600), productlocation VARCHAR(600), productstatus VARCHAR(600), addeddate VARCHAR(600))");
            await this.database.query("CREATE TABLE IF NOT EXISTS Orders (orderid SERIAL PRIMARY KEY, userid INTEGER, productid INTEGER, orderdate VARCHAR(600), orderstatus VARCHAR(600), paymentmethod VARCHAR(600), FOREIGN KEY(productid) REFERENCES Products (productid), FOREIGN KEY(userid) REFERENCES Users (userid) ON UPDATE CASCADE ON DELETE CASCADE)");
            await this.database.query("CREATE TABLE IF NOT EXISTS Blogs (blogid SERIAL PRIMARY KEY, thumbnail VARCHAR(600), creatorid INTEGER, title VARCHAR(600), category VARCHAR(600), createddate VARCHAR(600), tags TEXT, blogstatus VARCHAR(600), comments VARCHAR(600), data VARCHAR(600), FOREIGN KEY(creatorid) REFERENCES Users (userid) ON UPDATE CASCADE ON DELETE CASCADE )");
            await this.database.query("CREATE TABLE IF NOT EXISTS WebPage (versionid VARCHAR(600), content TEXT) ");
            await this.database.query("CREATE TABLE IF NOT EXISTS Subscription (email VARCHAR(600)) ");


            // For checking id conflicts
            await this.database.query("CREATE TABLE IF NOT EXISTS TransactionKey (id VARCHAR(600))");
            await this.database.query("CREATE TABLE IF NOT EXISTS UserId (id VARCHAR(600))");
            await this.database.query("CREATE TABLE IF NOT EXISTS OrderId (id VARCHAR(600))");
            await this.database.query("CREATE TABLE IF NOT EXISTS BlogId (id VARCHAR(600))");
            await this.database.query("CREATE TABLE IF NOT EXISTS ProductId (id VARCHAR(600))");


            // this.database.exec("CREATE TABLE Blogs (CreatedDate TEXT, ProductName TEXT, ProductCategory TEXT, ProductPrice TEXT, ProductStatus TEXT");

            const userData: User = {
                createddate: (new Date()).toDateString(),
                userid: "1",
                firstname: "Eyekontact",
                lastname: "Admin",
                email: "eykontactadmin@admin.com",
                role: "admin",
                phone: "08023817414",
                password: "Eyekontact@101NG",
            }
            await EyekontactDatabase.createUser(userData);
            let r = ((await EyekontactDatabase.database.query("SELECT  * FROM Users")).rows as User[])[0]
            // console.log(r)

            const res = (await this.database.query("SELECT * FROM WebPage WHERE versionid = $1", ["v1"])).rows
            if (!res.length) {
                await this.database.query("INSERT INTO WebPage (versionid, content) VALUES ($1, $2)", ["v1", JSON.stringify(pageDefaultState)]);
            }

        }
        catch (e) {
            console.error(e)
        }
    }

    static async subscribeUser(email: string) {
        try {

            await EyekontactDatabase.database.query("INSERT INTO Subscription (email) VALUES($1)", [email])
        } catch (err) {

        }
    }

    static async getSubscribers() {
        try {


            let responseData: ResponseData = { code: HTTPCode.OK, message: "Subscriberss fetch successfully" };
            const res = (await this.database.query("SELECT * FROM Subscription")).rows
            responseData.data = res;
            return responseData;

        } catch (err) {

        }
    }


    static async createTransactionKey(key: TransactionKey) {
        try {


            const existingKey = (await EyekontactDatabase.database.query("SELECT id FROM TransactionKey WHERE id = $1", [key.id])).rowCount;
            if (existingKey) {
                return false;
            }

            await EyekontactDatabase.database.query("INSERT INTO TransactionKey (id) VALUES ($1)", [key.id]);
            return true;
        }
        catch (err) {
            console.log(err);
            return "error occured";
        }
    }

    static async createUserId(id: string) {
        try {


            const existingKey = ((await EyekontactDatabase.database.query("SELECT id FROM UserId WHERE id = $1", [id])).rows)[0];
            if (existingKey) {
                return false;
            }

            await EyekontactDatabase.database.query("INSERT INTO UserId (id) VALUES($1)", [id]);
            return true;
        }
        catch (err) {
            console.log(err);
            return "error occured";
        }
    }

    static async createOrderId(id: string) {
        try {


            const existingKey = (await EyekontactDatabase.database.query("SELECT id FROM OrderId WHERE id = $1", [id])).rows
            if (existingKey.length) {
                return false;
            }

            await EyekontactDatabase.database.query("INSERT INTO OrderId (id) VALUE($1)", [id]);
            return true;
        }
        catch (err) {
            console.log("error occured");
            console.log(err);
            return "error occured";

        }
    }


    static async createProductId(id: string) {
        try {


            const existingKey = (await EyekontactDatabase.database.query("SELECT id FROM ProductId WHERE id = $1", [id])).rows
            if (existingKey.length) {
                return false;
            }

            await EyekontactDatabase.database.query("INSERT INTO ProductId (id) VALUES ($1)", [id]);
            return true;
        }
        catch (err) {
            console.log(err);
            return "error occured";

        }
    }

    static async createBlogId(id: string) {
        try {


            const existingKey = (await EyekontactDatabase.database.query("SELECT id FROM BlogId WHERE id = $1", [id])).rows
            if (existingKey.length) {
                return false;
            }

            await EyekontactDatabase.database.query("INSERT INTO BlogId (id) VALUES ($1)", [id]);
            return true;
        }
        catch (err) {
            console.log(err);
            return false;
        }
    }


    /* Table Rows Creation API */
    static async createUser(user: User) {
        try {


            const existingUser = (await EyekontactDatabase.database.query("SELECT * FROM Users WHERE Email = $1", [user.email])).rows
            let responseData: ResponseData = { code: 201, message: "user created!" };
            //   console.log(existingUser)
            if (existingUser[0]) {
                responseData.code = HTTPCode.CONFLICT;
                responseData.message = "Account already created with this email!";
                //     console.log(responseData);
                return responseData;
            }

            const hash = await bcrypt.hash(user?.password as string, 5);
            await EyekontactDatabase.database.query("INSERT INTO Users (createddate, firstname, lastname, email, role, phone, passwordhash) VALUES ($1, $2, $3, $4, $5, $6, $7)", [
                user.createddate,
                user.firstname,
                user.lastname,
                user.email,
                user.role,
                user.phone,
                hash
            ]);

            this.usersCache.isChanged = true;
            return responseData;
        }
        catch (e) {
            let responseData: ResponseData = { code: HTTPCode.SERVER_ERROR, message: "Oops something went wrong" };
            console.log("error at creating user")
            console.log(e)
            return responseData;
        }
    }

    static async createBlog(blog: Blog) {
        try {


            let responseData: ResponseData = { code: HTTPCode.OK, message: "Blog created successfully" };
            //   console.log("creating Blog");
            await EyekontactDatabase.database.query("INSERT INTO Blogs \
                 (blogstatus, creatorid, thumbnail, title, category, \
                createddate, data, tags, comments) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)\
                ", [
                blog.status,
                blog.creatorid,
                blog.thumbnail,
                blog.title,
                blog.category,
                blog.createddate,
                blog.data,
                blog.tags,
                "undefined"
            ]);

            if (responseData.code != HTTPCode.OK)
                return responseData;


            responseData.data = ((await EyekontactDatabase.database.query("SELECT Blogs.blogid, Users.firstname, Users.lastname, Blogs.thumbnail, \
            Blogs.title, Blogs.category, Blogs.createddate, Blogs.data, Blogs.tags, Blogs.comments\
               FROM Blogs \
               INNER JOIN Users ON Blogs.creatorid = Users.userid")).rows)[0];

            return responseData;

        } catch (err) {
            let responseData: ResponseData = { code: HTTPCode.SERVER_ERROR, message: "Oops something went wrong" };
            console.log(err);
            console.log("errro occured");
            return responseData
        }
    }

    static async createProduct(product: Product) {
        try {


            let responseData: ResponseData = { code: HTTPCode.OK, message: "Product added successfully!" };

            //TODO: check against product id instead
            const existingProduct = (await EyekontactDatabase.database.query("SELECT productname FROM Products \
            WHERE productname = $1 \
            AND productprice = $2 \
            AND productcategory = $3 \
            AND productlocation = $4", [
                product.productname,
                product.productprice,
                product.productcategory,
                product.productlocation
            ])).rows

            if (existingProduct.length) {
                responseData.code = HTTPCode.CONFLICT;
                responseData.message = "Product already exists";
                return responseData;
            }

            await EyekontactDatabase.database.query("INSERT INTO Products \
            (productname, productimage, \
            productcategory, productprice, \
            productlocation, productstatus, addeddate) VALUES ($1, $2, $3, $4, $5, $6, $7)", [
                product.productname,
                product.productimage,
                product.productcategory,
                product.productprice,
                product.productlocation,
                product.productstatus,
                product.addeddate
            ]);

            responseData.data = ((await EyekontactDatabase.database.query("SELECT productid, productname, productimage, productcategory, productprice, productlocation, productstatus, addeddate FROM Products \
            WHERE productname = $1 \
            AND productprice = $2 \
            AND productcategory = $3 AND productlocation = $4", [
                product.productname,
                product.productprice,
                product.productcategory,
                product.productlocation
            ])).rows)[0];
            return responseData;
        }

        catch (error) {
            let responseData: ResponseData = { code: HTTPCode.SERVER_ERROR, message: "Oops something went wrong" };
            console.log(error)
            return responseData
        }
    }

    static async createOrder(order: Order) {
        try {


            let responseData: ResponseData = { code: HTTPCode.OK, message: "Order added successfully!" };

            await EyekontactDatabase.database.query("INSERT INTO Orders \
            (userid, productid, orderdate, \
            orderstatus, paymentmethod) VALUES ($1, $2, $3, $4, $5)\
            ", [
                order.userid,
                order.productid,
                order.orderdate,
                order.orderstatus,
                order.paymentmethod,
            ]);


            if (responseData.code != HTTPCode.OK)
                return responseData;

            return responseData;
        }

        catch (error) {
            let responseData: ResponseData = { code: HTTPCode.SERVER_ERROR, message: "Oops something went wrong" };
            console.log(error)
            return responseData
        }
    }

    /* Table Rows Retrieval API */

    static async getWebPage() {
        try {
            let responseData: ResponseData = { code: HTTPCode.OK, message: "Page fetch successfully" };
            const res = (await this.database.query("SELECT * FROM WebPage WHERE versionid = $1", ["v1"])).rows
            if (res.length) {
                responseData.data = res;
                return responseData;
            }

            responseData = { code: HTTPCode.SERVER_ERROR, message: "Oops something went wrong" };
            return responseData;
        } catch (error) {
            let responseData: ResponseData = { code: HTTPCode.SERVER_ERROR, message: "Oops something went wrong" };
            console.log(error)
            return responseData
        }
    }

    static async getBlogs() {
        try {


            let responseData: ResponseData = { code: HTTPCode.OK, message: "Blogs fetch successfully" };
            responseData.data = (await EyekontactDatabase.database.query("SELECT Blogs.blogid, Users.firstname, Users.lastname, Blogs.thumbnail, \
            Blogs.title, Blogs.category, Blogs.createddate, Blogs.data, Blogs.tags, Blogs.blogstatus, Blogs.comments\
               FROM Blogs \
               INNER JOIN Users ON Blogs.creatorid = Users.userid")).rows as Blog[];

            if (responseData.data.length) {
                for (let _data of responseData.data) {

                    _data.status = _data.blogstatus;
                    _data.readtime = readingTime(_data.data as string).text;
                }
                return responseData;
            }

            //  console.log(responseData.data)
            responseData = { code: HTTPCode.SERVER_ERROR, message: "Oops something went wrong" };
            return responseData;

        } catch (error) {
            let responseData: ResponseData = { code: HTTPCode.SERVER_ERROR, message: "Oops something went wrong" };
            console.log(error);
            console.log("error at blogs")
            return responseData
        }
    }

    static async getOrderById(id: string) {
        try {


            let responseData: ResponseData = { code: HTTPCode.OK, message: "Order added successfully!" };

            responseData.data = ((await EyekontactDatabase.database.query("SELECT Orders.orderid, Users.userid, Products.productid, Products.productname, Orders.orderdate, Products.productprice, Orders.orderstatus, Orders.paymentmethod\
            FROM Orders  \
            INNER JOIN Products ON Orders.productid = Products.productid \
            INNER JOIN Users ON Orders.userid = Users.userid WHERE Orders.orderid = $1\
            ", [id])).rows)[0];

            if (responseData.code == HTTPCode.OK) {
                return responseData;
            }

            responseData = { code: HTTPCode.SERVER_ERROR, message: "Oops something went wrong" };
            return responseData;

        }
        catch (error) {
            let responseData: ResponseData = { code: HTTPCode.SERVER_ERROR, message: "Oops something went wrong" };
            console.log(error)
            return responseData
        }
    }

    static async getOrders() {
        try {


            let responseData: ResponseData = { code: HTTPCode.OK, message: "Order fetch successfully!" };

            responseData.data = (await EyekontactDatabase.database.query("SELECT Orders.orderid, Users.userid, Products.productid, Products.productname, Orders.orderdate, Products.productprice, Orders.orderstatus, Orders.paymentmethod\
            FROM Orders \
            INNER JOIN Products ON Orders.productid = Products.productid \
            INNER JOIN Users ON Orders.userid = Users.userid\
            ")).rows as Order[]

            if (responseData.code == HTTPCode.OK) {
                return responseData;
            }

            responseData = { code: HTTPCode.SERVER_ERROR, message: "Oops something went wrong" };
            return responseData;

        }
        catch (error) {
            let responseData: ResponseData = { code: HTTPCode.SERVER_ERROR, message: "Oops something went wrong" };
            console.log(error)
            return responseData
        }
    }

    static async getUserById(user: User): Promise<ResponseData> {
        try {


            let responseData: ResponseData = { code: HTTPCode.OK, message: "" };
            const userRes = ((await EyekontactDatabase.database.query("SELECT  userid,    \
            createddate, firstname,     \
            lastname, email,            \
            role, passwordhash,         \
            phone FROM Users            \
            WHERE email = $1 AND userid = $2", [user.email, user.userid])).rows as User[])[0];

            if (userRes) {
                responseData.data = userRes;
                return responseData;
            }

            responseData.code = HTTPCode.FORBIDDEN
            responseData.message = "User not found!";
            return responseData;

        }

        catch (e) {
            let responseData: ResponseData = { code: HTTPCode.SERVER_ERROR, message: "Oops something went wrong" };
            console.log(e);
            return responseData;
        }
    }

    static async getUser(user: User): Promise<ResponseData> {
        try {


            let responseData: ResponseData = { code: HTTPCode.OK, message: "" };
            const userRes = ((await EyekontactDatabase.database.query("SELECT  userid,    \
            createddate, firstname,     \
            lastname, email,            \
            role, passwordhash,         \
            phone FROM Users            \
            WHERE email = $1", [user.email])).rows as User[])[0]

            let r = ((await EyekontactDatabase.database.query("SELECT  * FROM Users")).rows as User[])[0]
            //  console.log(r)
            //console.log(userRes);

            if (userRes) {
                const match = await bcrypt.compare(user.password as string, userRes.passwordhash as string);
                if (match) {
                    userRes.passwordhash = "";
                    responseData.message = "User found";
                    responseData.data = userRes;
                    return responseData;
                }

                responseData.code = HTTPCode.FORBIDDEN
                responseData.message = "Email or password is incorrect!";
                return responseData;
            }

            responseData.code = HTTPCode.FORBIDDEN
            responseData.message = "Email or password is incorrect!";
            return responseData;
        }
        catch (e) {
            let responseData: ResponseData = { code: HTTPCode.SERVER_ERROR, message: "Oops something went wrong" };
            console.log(e);
            console.log("error at users")
            return responseData;
        }
    }

    static async getUsers(): Promise<ResponseData> {
        //TODO: handle get users error
        try {


            let responseData: ResponseData = { code: HTTPCode.OK, message: "User fetch successful!" };

            if (!this.usersCache.isChanged && this.usersCache.cacheData) {

                responseData.data = this.usersCache.cacheData;
                return responseData;
            }

            const data = (await EyekontactDatabase.database.query("SELECT  userid, CreatedDate, firstname, lastname, email, role, phone FROM Users")).rows as User[];
            responseData.data = data;
            this.usersCache.cacheData = data;
            this.usersCache.isChanged = false;
            return responseData;

        } catch (error) {
            let responseData: ResponseData = { code: HTTPCode.SERVER_ERROR, message: "Oops something went wrong" };
            console.log(error)
            return responseData;
        }
    }

    static async getProducts() {
        try {
            let responseData: ResponseData = { code: HTTPCode.OK, message: "Products fetch successful!" };
            responseData.data = (await EyekontactDatabase.database.query("SELECT productid, productname, productimage, productcategory, productprice, productlocation, productstatus, addeddate FROM Products")).rows as Product[];
            return responseData;

        } catch (error) {
            let responseData: ResponseData = { code: HTTPCode.SERVER_ERROR, message: "Oops something went wrong" };
            console.log(error)
            return responseData;
        }
    }

    static async getProduct(product: Product) {
        try {
            let responseData: ResponseData = { code: HTTPCode.OK, message: "Product fetch successful!" };
            responseData.data = ((await EyekontactDatabase.database.query("SELECT productid, productname, productimage, productcategory, productprice, productlocation, productstatus, addeddate FROM Products WHERE Products.productid = $1", [product.productid])).rows as Product[])[0]
            if (responseData.data) {
                return responseData;
            }

            return responseData = { code: HTTPCode.FORBIDDEN, message: "Product not found!" };

        } catch (error) {
            let responseData: ResponseData = { code: HTTPCode.SERVER_ERROR, message: "Oops something went wrong" };
            console.log(error)
            return responseData;
        }
    }

    /* Table Rows Updating API */
    static async updateUser(user: User) {
        try {

            console.log(user);
            let responseData: ResponseData = { code: HTTPCode.OK, message: "User updated successfully" };
            const userRes = (await EyekontactDatabase.database.query("UPDATE Users \
            SET firstname = $1, \
            lastname = $2, \
            phone = $3, \
            role = $4 \
            WHERE email = $5", [user.firstname, user.lastname, user.phone, user.role, user.email])).rowCount

            if (userRes) {
                responseData.data = ((await EyekontactDatabase.database.query("SELECT userid, CreatedDate, FirstName,\
                LastName, Email, Role, Phone FROM Users\
                WHERE email = $1", [user.email])).rows as User[])[0];
                return responseData;
            }

            responseData.code = HTTPCode.FORBIDDEN
            responseData.message = "Email is incorrect!";
            return responseData;

        } catch (error) {
            console.log(error)
            let responseData: ResponseData = { code: HTTPCode.SERVER_ERROR, message: "Oops something went wrong" };
            return responseData;
        }
    }

    static async UpdateWebpage(pageContent: string) {
        try {


            let responseData: ResponseData = { code: HTTPCode.OK, message: "updated content successfully" };
            let res = (await this.database.query("UPDATE WebPage SET content = $1 WHERE versionid = $2", [pageContent, "v1"])).rowCount
            if (res) {
                responseData.data = ((await this.database.query("SELECT * from WebPage WHERE versionid = $1", ["v1"])).rows as any)[0];
                if (responseData.data) {
                    return responseData;
                }
                responseData.code = HTTPCode.BAD_REQUEST;

            }
        } catch (error) {
            console.log(error)
            let responseData: ResponseData = { code: HTTPCode.SERVER_ERROR, message: "Oops something went wrong" };
            return responseData;
        }
    }


    static async updateProduct(product: Product, productOld: Product) {
        try {


            let responseData: ResponseData = { code: HTTPCode.OK, message: "User updated successfully" };
            const productRes = (await EyekontactDatabase.database.query("UPDATE Products \
            SET productname = $1, \
            productimage = $2, \
            productcategory = $3, \
            productprice = $4, \
            productstatus = $5, \
            productlocation = $6 \
            WHERE productname = $7 \
            AND productprice = $8 \
            AND productlocation = $9\
            AND productcategory = $10 \
            ", [
                product.productname,
                product.productimage,
                product.productcategory,
                product.productprice,
                product.productstatus,
                product.productlocation,
                productOld.productname,
                productOld.productprice,
                productOld.productlocation,
                productOld.productcategory
            ])).rowCount

            if (productRes) {
                responseData.dataOld = productOld;
                responseData.data = ((await EyekontactDatabase.database.query("SELECT productid, \
                productname, productimage, productcategory, productprice, productstatus, productlocation, addeddate FROM Products \
                WHERE productname = $1 \
                AND productprice = $2 \
                AND productcategory = $3", [
                    product.productname,
                    product.productprice,
                    product.productcategory
                ])).rows as Product[])[0];
                return responseData;
            }

            responseData.code = HTTPCode.FORBIDDEN
            responseData.message = "Product not found!";
            return responseData;

        } catch (error) {
            console.log(error)
            let responseData: ResponseData = { code: HTTPCode.SERVER_ERROR, message: "Oops something went wrong" };
            return responseData;
        }
    }

    static async updateBlog(blog: Blog) {
        try {


            let responseData: ResponseData = { code: HTTPCode.OK, message: "Blog updated successfully" };

            await EyekontactDatabase.database.query("UPDATE Blogs \
            SET thumbnail = $1, title = $2, category = $3, createddate = $4, tags = $5, comments = $6, status = $7 WHERE blogid  = $8", [blog.thumbnail, blog.title, blog.category, blog.createddate, blog.tags, blog.comments, blog.status, blog.blogid]);

            if (responseData.code != HTTPCode.OK) {
                return responseData;
            }

            responseData.data = ((await EyekontactDatabase.database.query("SELECT Blogs.blogid, Users.firstname, Users.lastname, Blogs.thumbnail, \
            Blogs.title, Blogs.category, Blogs.createddate, Blogs.data, Blogs.tags, Blogs.comments\
               FROM Blogs \
               INNER JOIN Users ON Blogs.creatorid = Users.userid WHERE Blogs.blogid = $1", [blog.blogid])).rows as Blog[])[0]

            if (responseData.data)
                responseData.data.readtime = readingTime(responseData.data as string).text;

            return responseData;

        } catch (error) {
            let responseData: ResponseData = { code: HTTPCode.SERVER_ERROR, message: "Oops something went wrong" };
            console.log(error)
            return responseData
        }
    }

    /**
     * updates order table and returns updated order
     */
    static async updateOrder(order: Order) {
        try {


            //TODO: return updated order
            let responseData: ResponseData = { code: HTTPCode.OK, message: "Order updated successfully" };

            await EyekontactDatabase.database.query("UPDATE Orders \
            SET orderstatus = $1, paymentmethod = $2, orderdate = $3\
            WHERE orderid = $4", [
                order.orderstatus,
                order.paymentmethod,
                order.orderdate,
                order.orderid
            ]);

            if (responseData.code == HTTPCode.OK) {
                responseData.data = ((await EyekontactDatabase.database.query("SELECT Orders.orderid, Products.productid, Products.productname, Orders.orderdate, Products.productprice, Orders.orderstatus, Orders.paymentmethod\
                FROM Orders  \
                INNER JOIN Products ON Orders.productid = Products.productid WHERE Orders.orderid = $1", [order.orderid])).rows as Order[])[0]

                if (responseData.data) {
                    return responseData;
                }
            }

            responseData = { code: HTTPCode.SERVER_ERROR, message: "Oops something went wrong" };
            return responseData;

        } catch (error) {
            console.log(error)
            let responseData: ResponseData = { code: HTTPCode.SERVER_ERROR, message: "Oops something went wrong" };
            return responseData;
        }
    }

    /* Table Rows Deletion API */
    static async deleteProduct(product: Product) {
        try {


            let responseData: ResponseData = { code: HTTPCode.OK, message: "" };

            await EyekontactDatabase.database.query("DELETE FROM Products \
            WHERE productid = $1", [
                product.productid,
            ]);

            responseData.code = HTTPCode.OK
            responseData.message = "Product deleted successfully!";
            return responseData;

        } catch (error) {
            console.log(error)
            let responseData: ResponseData = { code: HTTPCode.SERVER_ERROR, message: "Oops something went wrong" };
            return responseData;
        }
    }

    static async deleteUser(user: User) {
        try {


            let responseData: ResponseData = { code: HTTPCode.OK, message: "User deleted successfully!" };
            await EyekontactDatabase.database.query("DELETE FROM Users WHERE email = $1", [user.email]);

            this.usersCache.isChanged = true;

            if (responseData.code == HTTPCode.OK)
                return responseData;


            responseData.code = HTTPCode.FORBIDDEN;
            responseData.message = "Oops Something went wrong!"
            return responseData;

        } catch (error) {
            let responseData: ResponseData = { code: HTTPCode.SERVER_ERROR, message: "Oops something went wrong" };
            console.log(error);
            return responseData;
        }
    }

    static async deleteBlog(blog: Blog) {
        try {


            let responseData: ResponseData = { code: HTTPCode.OK, message: "Blog deleted successfully!" };

            await EyekontactDatabase.database.query("DELETE FROM Blogs WHERE blogid = $1", [blog.blogid]);

            return responseData;
        }
        catch (error) {
            console.log(error)
            let responseData: ResponseData = { code: HTTPCode.SERVER_ERROR, message: "Oops something went wrong" };
            return responseData;
        }
    }

    static async deleteOrder(order: Order) {
        try {


            //TODO: return deleted order
            let responseData: ResponseData = { code: HTTPCode.OK, message: "Order deleted successfully" };

            await EyekontactDatabase.database.query("DELETE FROM Orders \
            WHERE orderid = $1", [
                order.orderid
            ]);

            responseData.code = HTTPCode.OK
            return responseData;

        } catch (error) {
            console.log(error)
            let responseData: ResponseData = { code: HTTPCode.SERVER_ERROR, message: "Oops something went wrong" };
            return responseData;
        }
    }

}

(async () => {
    // EyekontactDatabase.initDatabase();
})();
