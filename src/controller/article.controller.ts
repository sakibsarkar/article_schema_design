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
