import express from "express";
import { linktreeController } from "../controllers/linktreeController.js";
const router = express.Router();
router.get("/:linktree", linktreeController);
export default router;
