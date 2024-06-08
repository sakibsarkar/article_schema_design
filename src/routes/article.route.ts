import { Router } from "express";
import {
  createArticle,
  deletArticleByid,
  getAllArticle,
  getSingleArticle,
  updateArticleById,
} from "../controller/article.controller";
import { validSchema } from "../middleweres/validator";
import articleSchema from "../validation/article.validation";
const router = Router();
router.post("/create", validSchema(articleSchema), createArticle);
router.get("/get", getAllArticle);
router.get("/get/:id", getSingleArticle);
router.delete("/del/:id", deletArticleByid);
router.put("/update/:id", updateArticleById);
export const arcticleRoute = router;
