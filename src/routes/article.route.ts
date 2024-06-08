import { Router } from "express";
import { createArticle } from "../controller/article.controller";
import { validSchema } from "../middleweres/validator";
import articleSchema from "../validation/article.validation";
const router = Router();
router.post("/create", validSchema(articleSchema), createArticle);
export const arcticleRoute = router;
