import express from "express";
import {
  editLinks,
  editProfile,
  editSocials,
} from "../controllers/editController.js";
const router = express.Router();
router.post("/profile", editProfile);
router.post("/links", editLinks);
router.post("/socials", editSocials);

export default router;
