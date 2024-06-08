import mongoose from "mongoose";
import QueryBuilder from "../builder/QueryBuilder";
import { Article } from "../model/article.model";
import { Categories } from "../model/category.model";
import { Tags } from "../model/tags.model";
import { catchAsyncError } from "../utils/catchAsyncError";
import sendResponse from "../utils/sendResponse";

export const createArticle = catchAsyncError(async (req, res) => {
  const { ...rest } = req.body;

  const article = await Article.create({ ...rest });

  sendResponse(res, {
    statusCode: 200,
    data: article,
    message: "article created successfully",
    success: true,
  });
});

export const getAllArticle = catchAsyncError(async (req, res, next) => {
  const article = Article.find()
    .populate("tags")
    .populate("categories")
    .populate("people");
  const query = new QueryBuilder(article, req.query)
    .filter()
    .search(["title", "text"])
    .paginate()
    .sort()
    .fields();
  const result = await query.modelQuery;
  sendResponse(res, {
    data: result,
    message: "successfully get all article ",
    success: true,
    statusCode: 200,
  });
});

export const getSingleArticle = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const isExist = await Article.isArticleExist(id);
  if (!isExist) {
    return sendResponse(res, {
      data: null,
      success: false,
      message: "Article no found",
    });
  }

  const result = await Article.find()
    .populate("tags")
    .populate("categories")
    .populate("people");

  sendResponse(res, {
    data: result,
    message: `successfully get article for id ${id}`,
    success: true,
    statusCode: 200,
  });
});

export const deletArticleByid = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const isExist = await Article.isArticleExist(id);
  if (!isExist) {
    return sendResponse(res, {
      data: null,
      success: false,
      message: "Article no found",
    });
  }

  // delte operations
  await Article.findByIdAndDelete(isExist._id);
  await Tags.deleteMany({ articleId: isExist._id });
  await Categories.deleteMany({ articleId: isExist._id });
  sendResponse(res, {
    data: null,
    success: true,
    message: `Article deleted successfully id=${id}`,
  });
});

export const updateArticleById = catchAsyncError(async (req, res) => {
  const id = req.params.id;
  const { tags, categories, ...rest } = req.body;
  const isExist = await Article.isArticleExist(id);
  if (!isExist) {
    return sendResponse(res, {
      data: null,
      success: false,
      message: "Article not found",
    });
  }

  ["people", "date", "comments"].forEach((item) => delete rest[item]);

  let updateData: Record<string, unknown> = { ...rest }; // Spread rest, not res
  if (tags && tags.length > 0) {
    updateData["$addToSet"] = {
      ...(updateData["$addToSet"] || {}),
      tags: {
        $each: tags.map((tag: string) => new mongoose.Types.ObjectId(tag)),
      },
    };
  }
  if (categories && categories.length > 0) {
    updateData["$addToSet"] = {
      ...(updateData["$addToSet"] || {}),
      categories: {
        $each: categories.map(
          (cat: string) => new mongoose.Types.ObjectId(cat)
        ),
      },
    };
  }
  console.log(updateData);

  const result = await Article.findByIdAndUpdate(id, updateData);
  sendResponse(res, {
    data: result,
    message: `Article updated successfully id=${id}`,
    success: true,
    statusCode: 200,
  });
});
