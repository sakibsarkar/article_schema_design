import { Article } from "../model/article.model";
import { Category } from "../model/category.model";
import { Tags } from "../model/tags.model";
import { catchAsyncError } from "../utils/catchAsyncError";
import sendResponse from "../utils/sendResponse";

export const createArticle = catchAsyncError(async (req, res) => {
  const { category, tags, ...rest } = req.body;
  const article = await Article.create(rest);

  const tagData = tags.map((tag: Record<string, unknown>) => ({
    ...tag,
    article: article._id,
  }));

  const categoryData = category.map((cat: Record<string, unknown>) => ({
    ...cat,
    article: article._id,
  }));

  const tag = await Tags.create(tagData);
  const categories = await Category.create(categoryData);

  sendResponse(res, {
    statusCode: 200,
    data: article,
    message: "article created successfully",
    success: true,
  });
});
