import express from "express";
import {
  getThemes,
  changeThemes,
  addTheme,
  deleteTheme,
} from "../controllers/themeController.js";
const router = express.Router();
router.post("/get", getThemes);
router.post("/change", changeThemes);
router.post("/add", addTheme);
router.post("/delete", deleteTheme);
export default router;
