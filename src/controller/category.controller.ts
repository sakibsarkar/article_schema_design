import { Article } from "../model/article.model";
import { Categories } from "../model/category.model";
import { catchAsyncError } from "../utils/catchAsyncError";
import sendResponse from "../utils/sendResponse";

export const updateCategorybyId = catchAsyncError(async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  ["articleId"].forEach((e) => delete body[e]);
  const isExistCategory = await Categories.findById(id);
  if (!isExistCategory) {
    return sendResponse(res, {
      message: "Category not found",
      data: null,
      success: false,
      statusCode: 400,
    });
  }

  const update = await Categories.findByIdAndUpdate(id, body);
  sendResponse(res, {
    message: "Category updated successfully",
    data: update,
    success: true,
    statusCode: 200,
  });
});

export const categoryByArticleId = catchAsyncError(async (req, res) => {
  // article id
  const id = req.params.id;
  const { categories } = req.body;

  const isExistArticle = await Article.isArticleExist(id);
  if (!isExistArticle) {
    return sendResponse(res, {
      data: null,
      success: false,
      message: "now article found",
    });
  }

  [...categories].forEach(
    async (cat) => await Categories.findByIdAndUpdate(cat._id, cat)
  );
  sendResponse(res, {
    data: null,
    message: "Category update successfull",
    success: true,
    statusCode: 200,
  });
});
export const createCategory = catchAsyncError(async (req, res) => {
  const body = req.body;
  const id = req.params.id;
  const isExistArticle = await Article.isArticleExist(id);
  if (!isExistArticle) {
    return sendResponse(res, {
      message: "no article found",
      data: null,
      success: false,
      statusCode: 400,
    });
  }
  const result = await Categories.create({
    ...body,
    articleId: isExistArticle.articleId,
  });
  await Article.findByIdAndUpdate(isExistArticle._id, {
    $push: { categoies: result._id },
  });

  sendResponse(res, {
    message: "Category created successfully",
    data: result,
    success: true,
    statusCode: 200,
  });
});
export const deleteCategoryByid = catchAsyncError(async (req, res) => {
  const id = req.params.categoryId;
  const isExist = await Categories.findById(id);
  if (!isExist) {
    return sendResponse(res, {
      data: null,
      success: false,
      message: "now Category found",
    });
  }

  await Categories.deleteOne({ _id: id });
  await Article.findOneAndUpdate(
    { articleId: isExist.articleId },
    { $pull: { categoies: isExist._id } }
  );

  return sendResponse(res, {
    data: null,
    success: true,
    message: "Category delete successfully",
    statusCode: 200,
  });
});
