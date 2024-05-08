import express from "express";
import { analyticsController } from "../controllers/analyticsController.js";
const router = express.Router();
router.post("/dashboard", analyticsController);

export default router;
