import { Router } from "express";
import { addBlog, deleteBlog, getBlogs, updateBlog } from "../../controllers/blogs";

const router = Router();

//FIXME: fix route paths;

router.post("/add-blog", addBlog);
router.get("/get-blogs", getBlogs);
router.delete("/delete-blog", deleteBlog);
router.patch("/update-blog", updateBlog)

export default router;