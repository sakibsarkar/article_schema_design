import { Router } from "express";
import {
  createComment,
  deleteCommentByid,
  updateCommentbyId,
} from "../controller/comment.controller";
import { validSchema } from "../middleweres/validator";
import commentValidatioin from "../validation/comment.validation";
const router = Router();
router.post("/create/:id", validSchema(commentValidatioin), createComment);
router.put("/update/:id", updateCommentbyId);
router.delete("/del/:commentId", deleteCommentByid);
export const commentRoute = router;
