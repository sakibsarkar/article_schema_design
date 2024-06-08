import { Router } from "express";
import {
  DeleteTag,
  createTag,
  getAllTags,
  getTagById,
  updateTag,
} from "../controller/tags.controller";
import { validSchema } from "../middleweres/validator";
import { tagSchema } from "../validation/article.validation";

const router = Router();

router.post("/create", validSchema(tagSchema), createTag);
router.put("/update/:id", updateTag);
router.delete("/delete/:id", DeleteTag);
router.get("/get", getAllTags);
router.get("/get/:id", getTagById);
export const tagsRoute = router;
