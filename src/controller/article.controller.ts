import QueryBuilder from "../builder/QueryBuilder";
import { Article } from "../model/article.model";
import { Categories } from "../model/category.model";
import { Tags } from "../model/tags.model";
import { catchAsyncError } from "../utils/catchAsyncError";
import sendResponse from "../utils/sendResponse";

export const createArticle = catchAsyncError(async (req, res) => {
  const { category, tags, ...rest } = req.body;

  const tag = await Tags.create([...category]);
  const categories = await Categories.create(tags);

  let data = { ...rest };
  data.tags = tag.map((tag) => tag._id);
  data.categories = tag.map((tag) => tag._id);

  const article = await Article.create(data);

  sendResponse(res, {
    statusCode: 200,
    data: article,
    message: "article created successfully",
    success: true,
  });
});

export const getAllArticle = catchAsyncError(async (req, res, next) => {
  const { searchTerm, category, tag, limit, skip } = req.query;

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
  await Article.findByIdAndDelete(id);
  await Tags.deleteMany({ article: id });
  await Categories.deleteMany({ article: id });
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

  ["people", "date"].forEach((item) => delete body[item]);

  const result = await Article.findByIdAndUpdate(id, body);
  sendResponse(res, {
    data: result,
    message: `Article updated successfully id=${id}`,
    success: true,
    statusCode: 200,
  });
});
