import { Router } from "express";
import {
  categoryByArticleId,
  createCategory,
  deleteCategoryByid,
} from "../controller/category.controller";
const router = Router();
router.put("/update/article/:id", categoryByArticleId);
router.post("/create/article/:id", createCategory);
router.delete("/del/:categoryId", deleteCategoryByid);
export const categoryRoute = router;
