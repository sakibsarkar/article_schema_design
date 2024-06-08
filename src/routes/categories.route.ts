import { Router } from "express";
import {
  createCategory,
  DeleteCategory as deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from "../controller/category.controller";
import { validSchema } from "../middleweres/validator";
import { categorySchema } from "../validation/article.validation";

const router = Router();
router.post("/create", validSchema(categorySchema), createCategory);
router.put("/update/:id", updateCategory);
router.delete("/delete/:id", deleteCategory);
router.get("/get", getAllCategories);
router.get("/get/:id", getCategoryById);
export const categoryRoute = router;
