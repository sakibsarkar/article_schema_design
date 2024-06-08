import { Router } from "express";
import {
  createArticle,
  getAllArticle,
  getSingleArticle,
} from "../controller/article.controller";
import { validSchema } from "../middleweres/validator";
import articleSchema from "../validation/article.validation";
const router = Router();
router.post("/create", validSchema(articleSchema), createArticle);
router.get("/get", getAllArticle);
router.get("/get/:id", getSingleArticle);
export const arcticleRoute = router;
