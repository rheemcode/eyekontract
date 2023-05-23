import { Request, Response } from "express";
import { customAlphabet } from "nanoid"
import EyekontactDatabase, { Blog, HTTPCode } from "../../database/Database";
import readingTime from "reading-time";

export const addBlog = async (req: Request, res: Response) => {
    try {
        const generateBlogID = customAlphabet("123456789abcdekontact", 8);
        let blogid
        while (true) {
            blogid = generateBlogID()
            let isValid = await EyekontactDatabase.createBlogId(blogid)
            if (isValid) break;
        }


        const data = req.body;
        const blog: Blog = {
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
        }

        console.log(blog);
        // TODO return added product
        let responseData = await EyekontactDatabase.createBlog(blog);
        res.json(responseData);

    } catch (error) {
        console.log(error)
        res.status(HTTPCode.SERVER_ERROR).json(error);
    }
}

export const getBlogs = async (req: Request, res: Response) => {
    try {
        const responseData = await EyekontactDatabase.getBlogs();
        res.json(responseData);

    } catch (error) {
        res.status(HTTPCode.SERVER_ERROR).json(error);
    }
}


export const updateBlog = async (req: Request, res: Response) => {
    try {
        const data = req.body;

        const blog: Blog = {
            blogid: data.blogid,
            thumbnail: data.thumbnail,
            title: data.title,
            category: data.category,
            createddate: data.createddate,
            data: data.data,
            tags: data.tags,
            status: data.status,
            comments: data.comments == "" ? data.comments : "undefined",
            readtime: readingTime(data.data).text
        };

        const responseData = await EyekontactDatabase.updateBlog(blog);
        res.json(responseData);

    } catch (error) {
        console.log(error)
        res.status(HTTPCode.SERVER_ERROR).json(error);
    }
}

export const deleteBlog = async (req: Request, res: Response) => {
    try {
        const { blogid } = req.query;

        const blog: Blog = {
            blogid: blogid as string,
        }

        //TODO: send deleted product instead
        const responseData = await EyekontactDatabase.deleteBlog(blog);
        responseData.data = await (await EyekontactDatabase.getBlogs()).data;

        res.json(responseData);

    } catch (error) {
        res.status(HTTPCode.SERVER_ERROR).json(error);
    }
}