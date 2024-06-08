import mongoose from "mongoose";
import AggregationBuilder from "../builder/QueryBuilderAgreegation";
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
    data: { ...article.toObject(), categroy: categories, tags: tag },
    message: "article created successfully",
    success: true,
  });
});

export const getAllArticle = catchAsyncError(async (req, res, next) => {
  const { searchTerm, category, tag, limit, skip } = req.query;

  const builder = new AggregationBuilder(Article.aggregate(), req.query);
  builder.lookup("tags", "_id", "article", "tags");
  builder.lookup("categories", "_id", "article", "category");
  if (limit) {
    builder.limit(parseInt(limit as string));
  }
  if (skip) {
    builder.skip(parseInt(limit as string));
  }
  if (tag) {
    builder.aggregation.match({
      tags: {
        $elemMatch: {
          name: tag,
        },
      },
    });
  }
  if (category) {
    builder.aggregation.match({
      category: {
        $elemMatch: {
          name: category,
        },
      },
    });
  }

  if (searchTerm) {
    builder.match(["title", "text"]);
  }
  const result = await builder.aggregation;
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

  const builder = new AggregationBuilder(Article.aggregate(), req.query);
  builder.lookup("tags", "_id", "article", "tags");
  builder.lookup("categories", "_id", "article", "category");
  builder.aggregation.match({ _id: new mongoose.Types.ObjectId(id) });
  const result = await builder.aggregation;

  if (result.length == 0) {
    return sendResponse(res, {
      data: null,
      message: `no article found for this id=${id}`,
      success: true,
      statusCode: 200,
    });
  }

  sendResponse(res, {
    data: result[0],
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
  await Article.findByIdAndDelete(id);
  await Tags.deleteMany({ article: id });
  await Category.deleteMany({ article: id });
  sendResponse(res, {
    data: null,
    success: true,
    message: `Article deleted successfully id=${id}`,
  });
});

export const updateArticleById = catchAsyncError(async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const isExist = await Article.isArticleExist(id);
  if (!isExist) {
    return sendResponse(res, {
      data: null,
      success: false,
      message: "Article no found",
    });
  }

  ["people", "date"].forEach((item, i, arr) => delete body[item]);

  console.log(body);

  const result = await Article.findByIdAndUpdate(id, body);
  sendResponse(res, {
    data: null,
    message: `Article updated successfully id=${id}`,
    success: true,
    statusCode: 200,
  });
});
