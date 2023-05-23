"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const webpage_1 = require("../../controllers/webpage");
const router = (0, express_1.Router)();
;
router.post("/webpage", webpage_1.updatePage);
router.get("/webpage", webpage_1.getPage);
exports.default = router;
