import { Router } from "express";
import { getPage, updatePage } from "../../controllers/webpage";

const router = Router();
;
router.post("/webpage", updatePage);
router.get("/webpage", getPage);

export default router;