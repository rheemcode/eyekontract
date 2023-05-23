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
exports.HTTPCode = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const pageDefault_1 = require("./pageDefault");
const cache_1 = __importDefault(require("../cache"));
const reading_time_1 = __importDefault(require("reading-time"));
const pg_1 = require("pg");
var HTTPCode;
(function (HTTPCode) {
    HTTPCode[HTTPCode["OK"] = 200] = "OK";
    HTTPCode[HTTPCode["CREATED"] = 201] = "CREATED";
    HTTPCode[HTTPCode["ACCEPTED"] = 202] = "ACCEPTED";
    HTTPCode[HTTPCode["FOUND"] = 302] = "FOUND";
    HTTPCode[HTTPCode["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    HTTPCode[HTTPCode["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    HTTPCode[HTTPCode["FORBIDDEN"] = 403] = "FORBIDDEN";
    HTTPCode[HTTPCode["CONFLICT"] = 409] = "CONFLICT";
    HTTPCode[HTTPCode["SERVER_ERROR"] = 500] = "SERVER_ERROR";
})(HTTPCode = exports.HTTPCode || (exports.HTTPCode = {}));
//FIXME: clean up code repetition
class EyekontactDatabase {
    static initDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            this.database = new pg_1.Client({
                connectionString: "postgres://khajzwlrqufzow:7e2276cb57b165a9047cb03d2f6af110cb71192b0fc165a92db10ec5a0ff0133@ec2-52-204-196-4.compute-1.amazonaws.com:5432/ddp6af1d0109ft",
                ssl: {
                    rejectUnauthorized: false
                }
            });
            yield this.database.connect();
            console.log("database connected");
            // this.database.on('trace', (data: any) => { console.log(data) });
            this.usersCache = new cache_1.default;
            this.ordersCache = new cache_1.default;
            yield this._createTables();
        });
    }
    static _createTables() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // await this.database.query("DELETE FROM Users WHERE email = 'eyekontact@admin.com'");
                //  await this.database.query("DROP TABLE IF EXISTS WebPage");
                // await this.database.query("DROP TABLE IF EXISTS Products");
                // await this.database.exec("DROP TABLE IF EXISTS Blogs");
                // await this.database.query("DROP TABLE IF EXISTS Blogs");
                yield this.database.query("CREATE TABLE IF NOT EXISTS Users  (userid SERIAL PRIMARY KEY, createddate VARCHAR(600), firstname VARCHAR(600), lastname VARCHAR(600), email VARCHAR(600), phone VARCHAR(600), role VARCHAR(600), passwordhash TEXT)");
                yield this.database.query("CREATE TABLE IF NOT EXISTS Products (productid SERIAL PRIMARY KEY, productname VARCHAR(600), productimage VARCHAR(600), productcategory VARCHAR(600), productprice VARCHAR(600), productlocation VARCHAR(600), productstatus VARCHAR(600), addeddate VARCHAR(600))");
                yield this.database.query("CREATE TABLE IF NOT EXISTS Orders (orderid SERIAL PRIMARY KEY, userid INTEGER, productid INTEGER, orderdate VARCHAR(600), orderstatus VARCHAR(600), paymentmethod VARCHAR(600), FOREIGN KEY(productid) REFERENCES Products (productid), FOREIGN KEY(userid) REFERENCES Users (userid) ON UPDATE CASCADE ON DELETE CASCADE)");
                yield this.database.query("CREATE TABLE IF NOT EXISTS Blogs (blogid SERIAL PRIMARY KEY, thumbnail VARCHAR(600), creatorid INTEGER, title VARCHAR(600), category VARCHAR(600), createddate VARCHAR(600), tags TEXT, blogstatus VARCHAR(600), comments VARCHAR(600), data VARCHAR(600), FOREIGN KEY(creatorid) REFERENCES Users (userid) ON UPDATE CASCADE ON DELETE CASCADE )");
                yield this.database.query("CREATE TABLE IF NOT EXISTS WebPage (versionid VARCHAR(600), content TEXT) ");
                yield this.database.query("CREATE TABLE IF NOT EXISTS Subscription (email VARCHAR(600)) ");
                // For checking id conflicts
                yield this.database.query("CREATE TABLE IF NOT EXISTS TransactionKey (id VARCHAR(600))");
                yield this.database.query("CREATE TABLE IF NOT EXISTS UserId (id VARCHAR(600))");
                yield this.database.query("CREATE TABLE IF NOT EXISTS OrderId (id VARCHAR(600))");
                yield this.database.query("CREATE TABLE IF NOT EXISTS BlogId (id VARCHAR(600))");
                yield this.database.query("CREATE TABLE IF NOT EXISTS ProductId (id VARCHAR(600))");
                // this.database.exec("CREATE TABLE Blogs (CreatedDate TEXT, ProductName TEXT, ProductCategory TEXT, ProductPrice TEXT, ProductStatus TEXT");
                const userData = {
                    createddate: (new Date()).toDateString(),
                    userid: "1",
                    firstname: "Eyekontact",
                    lastname: "Admin",
                    email: "eykontactadmin@admin.com",
                    role: "admin",
                    phone: "08023817414",
                    password: "Eyekontact@101NG",
                };
                yield EyekontactDatabase.createUser(userData);
                let r = (yield EyekontactDatabase.database.query("SELECT  * FROM Users")).rows[0];
                // console.log(r)
                const res = (yield this.database.query("SELECT * FROM WebPage WHERE versionid = $1", ["v1"])).rows;
                if (!res.length) {
                    yield this.database.query("INSERT INTO WebPage (versionid, content) VALUES ($1, $2)", ["v1", JSON.stringify(pageDefault_1.pageDefaultState)]);
                }
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    static subscribeUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield EyekontactDatabase.database.query("INSERT INTO Subscription (email) VALUES($1)", [email]);
            }
            catch (err) {
            }
        });
    }
    static getSubscribers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let responseData = { code: HTTPCode.OK, message: "Subscriberss fetch successfully" };
                const res = (yield this.database.query("SELECT * FROM Subscription")).rows;
                responseData.data = res;
                return responseData;
            }
            catch (err) {
            }
        });
    }
    static createTransactionKey(key) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingKey = (yield EyekontactDatabase.database.query("SELECT id FROM TransactionKey WHERE id = $1", [key.id])).rowCount;
                if (existingKey) {
                    return false;
                }
                yield EyekontactDatabase.database.query("INSERT INTO TransactionKey (id) VALUES ($1)", [key.id]);
                return true;
            }
            catch (err) {
                console.log(err);
                return "error occured";
            }
        });
    }
    static createUserId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingKey = ((yield EyekontactDatabase.database.query("SELECT id FROM UserId WHERE id = $1", [id])).rows)[0];
                if (existingKey) {
                    return false;
                }
                yield EyekontactDatabase.database.query("INSERT INTO UserId (id) VALUES($1)", [id]);
                return true;
            }
            catch (err) {
                console.log(err);
                return "error occured";
            }
        });
    }
    static createOrderId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingKey = (yield EyekontactDatabase.database.query("SELECT id FROM OrderId WHERE id = $1", [id])).rows;
                if (existingKey.length) {
                    return false;
                }
                yield EyekontactDatabase.database.query("INSERT INTO OrderId (id) VALUE($1)", [id]);
                return true;
            }
            catch (err) {
                console.log("error occured");
                console.log(err);
                return "error occured";
            }
        });
    }
    static createProductId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingKey = (yield EyekontactDatabase.database.query("SELECT id FROM ProductId WHERE id = $1", [id])).rows;
                if (existingKey.length) {
                    return false;
                }
                yield EyekontactDatabase.database.query("INSERT INTO ProductId (id) VALUES ($1)", [id]);
                return true;
            }
            catch (err) {
                console.log(err);
                return "error occured";
            }
        });
    }
    static createBlogId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingKey = (yield EyekontactDatabase.database.query("SELECT id FROM BlogId WHERE id = $1", [id])).rows;
                if (existingKey.length) {
                    return false;
                }
                yield EyekontactDatabase.database.query("INSERT INTO BlogId (id) VALUES ($1)", [id]);
                return true;
            }
            catch (err) {
                console.log(err);
                return false;
            }
        });
    }
    /* Table Rows Creation API */
    static createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingUser = (yield EyekontactDatabase.database.query("SELECT * FROM Users WHERE Email = $1", [user.email])).rows;
                let responseData = { code: 201, message: "user created!" };
                //   console.log(existingUser)
                if (existingUser[0]) {
                    responseData.code = HTTPCode.CONFLICT;
                    responseData.message = "Account already created with this email!";
                    //     console.log(responseData);
                    return responseData;
                }
                const hash = yield bcrypt_1.default.hash(user === null || user === void 0 ? void 0 : user.password, 5);
                yield EyekontactDatabase.database.query("INSERT INTO Users (createddate, firstname, lastname, email, role, phone, passwordhash) VALUES ($1, $2, $3, $4, $5, $6, $7)", [
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
                let responseData = { code: HTTPCode.SERVER_ERROR, message: "Oops something went wrong" };
                console.log("error at creating user");
                console.log(e);
                return responseData;
            }
        });
    }
    static createBlog(blog) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let responseData = { code: HTTPCode.OK, message: "Blog created successfully" };
                //   console.log("creating Blog");
                yield EyekontactDatabase.database.query("INSERT INTO Blogs \
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
                responseData.data = ((yield EyekontactDatabase.database.query("SELECT Blogs.blogid, Users.firstname, Users.lastname, Blogs.thumbnail, \
            Blogs.title, Blogs.category, Blogs.createddate, Blogs.data, Blogs.tags, Blogs.comments\
               FROM Blogs \
               INNER JOIN Users ON Blogs.creatorid = Users.userid")).rows)[0];
                return responseData;
            }
            catch (err) {
                let responseData = { code: HTTPCode.SERVER_ERROR, message: "Oops something went wrong" };
                console.log(err);
                console.log("errro occured");
                return responseData;
            }
        });
    }
    static createProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let responseData = { code: HTTPCode.OK, message: "Product added successfully!" };
                //TODO: check against product id instead
                const existingProduct = (yield EyekontactDatabase.database.query("SELECT productname FROM Products \
            WHERE productname = $1 \
            AND productprice = $2 \
            AND productcategory = $3 \
            AND productlocation = $4", [
                    product.productname,
                    product.productprice,
                    product.productcategory,
                    product.productlocation
                ])).rows;
                if (existingProduct.length) {
                    responseData.code = HTTPCode.CONFLICT;
                    responseData.message = "Product already exists";
                    return responseData;
                }
                yield EyekontactDatabase.database.query("INSERT INTO Products \
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
                responseData.data = ((yield EyekontactDatabase.database.query("SELECT productid, productname, productimage, productcategory, productprice, productlocation, productstatus, addeddate FROM Products \
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
                let responseData = { code: HTTPCode.SERVER_ERROR, message: "Oops something went wrong" };
                console.log(error);
                return responseData;
            }
        });
    }
    static createOrder(order) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let responseData = { code: HTTPCode.OK, message: "Order added successfully!" };
                yield EyekontactDatabase.database.query("INSERT INTO Orders \
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
                let responseData = { code: HTTPCode.SERVER_ERROR, message: "Oops something went wrong" };
                console.log(error);
                return responseData;
            }
        });
    }
    /* Table Rows Retrieval API */
    static getWebPage() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let responseData = { code: HTTPCode.OK, message: "Page fetch successfully" };
                const res = (yield this.database.query("SELECT * FROM WebPage WHERE versionid = $1", ["v1"])).rows;
                if (res.length) {
                    responseData.data = res;
                    return responseData;
                }
                responseData = { code: HTTPCode.SERVER_ERROR, message: "Oops something went wrong" };
                return responseData;
            }
            catch (error) {
                let responseData = { code: HTTPCode.SERVER_ERROR, message: "Oops something went wrong" };
                console.log(error);
                return responseData;
            }
        });
    }
    static getBlogs() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let responseData = { code: HTTPCode.OK, message: "Blogs fetch successfully" };
                responseData.data = (yield EyekontactDatabase.database.query("SELECT Blogs.blogid, Users.firstname, Users.lastname, Blogs.thumbnail, \
            Blogs.title, Blogs.category, Blogs.createddate, Blogs.data, Blogs.tags, Blogs.blogstatus, Blogs.comments\
               FROM Blogs \
               INNER JOIN Users ON Blogs.creatorid = Users.userid")).rows;
                if (responseData.data.length) {
                    for (let _data of responseData.data) {
                        _data.status = _data.blogstatus;
                        _data.readtime = (0, reading_time_1.default)(_data.data).text;
                    }
                    return responseData;
                }
                //  console.log(responseData.data)
                responseData = { code: HTTPCode.SERVER_ERROR, message: "Oops something went wrong" };
                return responseData;
            }
            catch (error) {
                let responseData = { code: HTTPCode.SERVER_ERROR, message: "Oops something went wrong" };
                console.log(error);
                console.log("error at blogs");
                return responseData;
            }
        });
    }
    static getOrderById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let responseData = { code: HTTPCode.OK, message: "Order added successfully!" };
                responseData.data = ((yield EyekontactDatabase.database.query("SELECT Orders.orderid, Users.userid, Products.productid, Products.productname, Orders.orderdate, Products.productprice, Orders.orderstatus, Orders.paymentmethod\
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
                let responseData = { code: HTTPCode.SERVER_ERROR, message: "Oops something went wrong" };
                console.log(error);
                return responseData;
            }
        });
    }
    static getOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let responseData = { code: HTTPCode.OK, message: "Order fetch successfully!" };
                responseData.data = (yield EyekontactDatabase.database.query("SELECT Orders.orderid, Users.userid, Products.productid, Products.productname, Orders.orderdate, Products.productprice, Orders.orderstatus, Orders.paymentmethod\
            FROM Orders \
            INNER JOIN Products ON Orders.productid = Products.productid \
            INNER JOIN Users ON Orders.userid = Users.userid\
            ")).rows;
                if (responseData.code == HTTPCode.OK) {
                    return responseData;
                }
                responseData = { code: HTTPCode.SERVER_ERROR, message: "Oops something went wrong" };
                return responseData;
            }
            catch (error) {
                let responseData = { code: HTTPCode.SERVER_ERROR, message: "Oops something went wrong" };
                console.log(error);
                return responseData;
            }
        });
    }
    static getUserById(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let responseData = { code: HTTPCode.OK, message: "" };
                const userRes = (yield EyekontactDatabase.database.query("SELECT  userid,    \
            createddate, firstname,     \
            lastname, email,            \
            role, passwordhash,         \
            phone FROM Users            \
            WHERE email = $1 AND userid = $2", [user.email, user.userid])).rows[0];
                if (userRes) {
                    responseData.data = userRes;
                    return responseData;
                }
                responseData.code = HTTPCode.FORBIDDEN;
                responseData.message = "User not found!";
                return responseData;
            }
            catch (e) {
                let responseData = { code: HTTPCode.SERVER_ERROR, message: "Oops something went wrong" };
                console.log(e);
                return responseData;
            }
        });
    }
    static getUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let responseData = { code: HTTPCode.OK, message: "" };
                const userRes = (yield EyekontactDatabase.database.query("SELECT  userid,    \
            createddate, firstname,     \
            lastname, email,            \
            role, passwordhash,         \
            phone FROM Users            \
            WHERE email = $1", [user.email])).rows[0];
                let r = (yield EyekontactDatabase.database.query("SELECT  * FROM Users")).rows[0];
                //  console.log(r)
                //console.log(userRes);
                if (userRes) {
                    const match = yield bcrypt_1.default.compare(user.password, userRes.passwordhash);
                    if (match) {
                        userRes.passwordhash = "";
                        responseData.message = "User found";
                        responseData.data = userRes;
                        return responseData;
                    }
                    responseData.code = HTTPCode.FORBIDDEN;
                    responseData.message = "Email or password is incorrect!";
                    return responseData;
                }
                responseData.code = HTTPCode.FORBIDDEN;
                responseData.message = "Email or password is incorrect!";
                return responseData;
            }
            catch (e) {
                let responseData = { code: HTTPCode.SERVER_ERROR, message: "Oops something went wrong" };
                console.log(e);
                console.log("error at users");
                return responseData;
            }
        });
    }
    static getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            //TODO: handle get users error
            try {
                let responseData = { code: HTTPCode.OK, message: "User fetch successful!" };
                if (!this.usersCache.isChanged && this.usersCache.cacheData) {
                    responseData.data = this.usersCache.cacheData;
                    return responseData;
                }
                const data = (yield EyekontactDatabase.database.query("SELECT  userid, CreatedDate, firstname, lastname, email, role, phone FROM Users")).rows;
                responseData.data = data;
                this.usersCache.cacheData = data;
                this.usersCache.isChanged = false;
                return responseData;
            }
            catch (error) {
                let responseData = { code: HTTPCode.SERVER_ERROR, message: "Oops something went wrong" };
                console.log(error);
                return responseData;
            }
        });
    }
    static getProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let responseData = { code: HTTPCode.OK, message: "Products fetch successful!" };
                responseData.data = (yield EyekontactDatabase.database.query("SELECT productid, productname, productimage, productcategory, productprice, productlocation, productstatus, addeddate FROM Products")).rows;
                return responseData;
            }
            catch (error) {
                let responseData = { code: HTTPCode.SERVER_ERROR, message: "Oops something went wrong" };
                console.log(error);
                return responseData;
            }
        });
    }
    static getProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let responseData = { code: HTTPCode.OK, message: "Product fetch successful!" };
                responseData.data = (yield EyekontactDatabase.database.query("SELECT productid, productname, productimage, productcategory, productprice, productlocation, productstatus, addeddate FROM Products WHERE Products.productid = $1", [product.productid])).rows[0];
                if (responseData.data) {
                    return responseData;
                }
                return responseData = { code: HTTPCode.FORBIDDEN, message: "Product not found!" };
            }
            catch (error) {
                let responseData = { code: HTTPCode.SERVER_ERROR, message: "Oops something went wrong" };
                console.log(error);
                return responseData;
            }
        });
    }
    /* Table Rows Updating API */
    static updateUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(user);
                let responseData = { code: HTTPCode.OK, message: "User updated successfully" };
                const userRes = (yield EyekontactDatabase.database.query("UPDATE Users \
            SET firstname = $1, \
            lastname = $2, \
            phone = $3, \
            role = $4 \
            WHERE email = $5", [user.firstname, user.lastname, user.phone, user.role, user.email])).rowCount;
                if (userRes) {
                    responseData.data = (yield EyekontactDatabase.database.query("SELECT userid, CreatedDate, FirstName,\
                LastName, Email, Role, Phone FROM Users\
                WHERE email = $1", [user.email])).rows[0];
                    return responseData;
                }
                responseData.code = HTTPCode.FORBIDDEN;
                responseData.message = "Email is incorrect!";
                return responseData;
            }
            catch (error) {
                console.log(error);
                let responseData = { code: HTTPCode.SERVER_ERROR, message: "Oops something went wrong" };
                return responseData;
            }
        });
    }
    static UpdateWebpage(pageContent) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let responseData = { code: HTTPCode.OK, message: "updated content successfully" };
                let res = (yield this.database.query("UPDATE WebPage SET content = $1 WHERE versionid = $2", [pageContent, "v1"])).rowCount;
                if (res) {
                    responseData.data = (yield this.database.query("SELECT * from WebPage WHERE versionid = $1", ["v1"])).rows[0];
                    if (responseData.data) {
                        return responseData;
                    }
                    responseData.code = HTTPCode.BAD_REQUEST;
                }
            }
            catch (error) {
                console.log(error);
                let responseData = { code: HTTPCode.SERVER_ERROR, message: "Oops something went wrong" };
                return responseData;
            }
        });
    }
    static updateProduct(product, productOld) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let responseData = { code: HTTPCode.OK, message: "User updated successfully" };
                const productRes = (yield EyekontactDatabase.database.query("UPDATE Products \
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
                ])).rowCount;
                if (productRes) {
                    responseData.dataOld = productOld;
                    responseData.data = (yield EyekontactDatabase.database.query("SELECT productid, \
                productname, productimage, productcategory, productprice, productstatus, productlocation, addeddate FROM Products \
                WHERE productname = $1 \
                AND productprice = $2 \
                AND productcategory = $3", [
                        product.productname,
                        product.productprice,
                        product.productcategory
                    ])).rows[0];
                    return responseData;
                }
                responseData.code = HTTPCode.FORBIDDEN;
                responseData.message = "Product not found!";
                return responseData;
            }
            catch (error) {
                console.log(error);
                let responseData = { code: HTTPCode.SERVER_ERROR, message: "Oops something went wrong" };
                return responseData;
            }
        });
    }
    static updateBlog(blog) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let responseData = { code: HTTPCode.OK, message: "Blog updated successfully" };
                yield EyekontactDatabase.database.query("UPDATE Blogs \
            SET thumbnail = $1, title = $2, category = $3, createddate = $4, tags = $5, comments = $6, status = $7 WHERE blogid  = $8", [blog.thumbnail, blog.title, blog.category, blog.createddate, blog.tags, blog.comments, blog.status, blog.blogid]);
                if (responseData.code != HTTPCode.OK) {
                    return responseData;
                }
                responseData.data = (yield EyekontactDatabase.database.query("SELECT Blogs.blogid, Users.firstname, Users.lastname, Blogs.thumbnail, \
            Blogs.title, Blogs.category, Blogs.createddate, Blogs.data, Blogs.tags, Blogs.comments\
               FROM Blogs \
               INNER JOIN Users ON Blogs.creatorid = Users.userid WHERE Blogs.blogid = $1", [blog.blogid])).rows[0];
                if (responseData.data)
                    responseData.data.readtime = (0, reading_time_1.default)(responseData.data).text;
                return responseData;
            }
            catch (error) {
                let responseData = { code: HTTPCode.SERVER_ERROR, message: "Oops something went wrong" };
                console.log(error);
                return responseData;
            }
        });
    }
    /**
     * updates order table and returns updated order
     */
    static updateOrder(order) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //TODO: return updated order
                let responseData = { code: HTTPCode.OK, message: "Order updated successfully" };
                yield EyekontactDatabase.database.query("UPDATE Orders \
            SET orderstatus = $1, paymentmethod = $2, orderdate = $3\
            WHERE orderid = $4", [
                    order.orderstatus,
                    order.paymentmethod,
                    order.orderdate,
                    order.orderid
                ]);
                if (responseData.code == HTTPCode.OK) {
                    responseData.data = (yield EyekontactDatabase.database.query("SELECT Orders.orderid, Products.productid, Products.productname, Orders.orderdate, Products.productprice, Orders.orderstatus, Orders.paymentmethod\
                FROM Orders  \
                INNER JOIN Products ON Orders.productid = Products.productid WHERE Orders.orderid = $1", [order.orderid])).rows[0];
                    if (responseData.data) {
                        return responseData;
                    }
                }
                responseData = { code: HTTPCode.SERVER_ERROR, message: "Oops something went wrong" };
                return responseData;
            }
            catch (error) {
                console.log(error);
                let responseData = { code: HTTPCode.SERVER_ERROR, message: "Oops something went wrong" };
                return responseData;
            }
        });
    }
    /* Table Rows Deletion API */
    static deleteProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let responseData = { code: HTTPCode.OK, message: "" };
                yield EyekontactDatabase.database.query("DELETE FROM Products \
            WHERE productid = $1", [
                    product.productid,
                ]);
                responseData.code = HTTPCode.OK;
                responseData.message = "Product deleted successfully!";
                return responseData;
            }
            catch (error) {
                console.log(error);
                let responseData = { code: HTTPCode.SERVER_ERROR, message: "Oops something went wrong" };
                return responseData;
            }
        });
    }
    static deleteUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let responseData = { code: HTTPCode.OK, message: "User deleted successfully!" };
                yield EyekontactDatabase.database.query("DELETE FROM Users WHERE email = $1", [user.email]);
                this.usersCache.isChanged = true;
                if (responseData.code == HTTPCode.OK)
                    return responseData;
                responseData.code = HTTPCode.FORBIDDEN;
                responseData.message = "Oops Something went wrong!";
                return responseData;
            }
            catch (error) {
                let responseData = { code: HTTPCode.SERVER_ERROR, message: "Oops something went wrong" };
                console.log(error);
                return responseData;
            }
        });
    }
    static deleteBlog(blog) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let responseData = { code: HTTPCode.OK, message: "Blog deleted successfully!" };
                yield EyekontactDatabase.database.query("DELETE FROM Blogs WHERE blogid = $1", [blog.blogid]);
                return responseData;
            }
            catch (error) {
                console.log(error);
                let responseData = { code: HTTPCode.SERVER_ERROR, message: "Oops something went wrong" };
                return responseData;
            }
        });
    }
    static deleteOrder(order) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //TODO: return deleted order
                let responseData = { code: HTTPCode.OK, message: "Order deleted successfully" };
                yield EyekontactDatabase.database.query("DELETE FROM Orders \
            WHERE orderid = $1", [
                    order.orderid
                ]);
                responseData.code = HTTPCode.OK;
                return responseData;
            }
            catch (error) {
                console.log(error);
                let responseData = { code: HTTPCode.SERVER_ERROR, message: "Oops something went wrong" };
                return responseData;
            }
        });
    }
}
exports.default = EyekontactDatabase;
(() => __awaiter(void 0, void 0, void 0, function* () {
    // EyekontactDatabase.initDatabase();
}))();
