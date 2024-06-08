import { Router } from "express";
import {
  createTag as createTagByShopid,
  geleteTagByid,
  tagByArticleId,
} from "../controller/tags.controller";
const router = Router();
router.put("/update/article/:id", tagByArticleId);
router.post("/create/article/:id", createTagByShopid);
router.delete("/del/:tagId", geleteTagByid);
export const tagsRoute = router;
