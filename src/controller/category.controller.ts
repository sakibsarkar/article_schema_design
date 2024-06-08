import { Article } from "../model/article.model";
import { Categories } from "../model/category.model";
import { Tags } from "../model/tags.model";
import { catchAsyncError } from "../utils/catchAsyncError";
import sendResponse from "../utils/sendResponse";

export const createCategory = catchAsyncError(async (req, res) => {
  const { body } = req;
  const result = await Categories.create(body);
  sendResponse(res, {
    statusCode: 200,
    message: "successfully created category",
    data: result,
    success: true,
  });
});
export const updateCategory = catchAsyncError(async (req, res) => {
  const { body } = req;
  const id = req.params.id;
  const result = await Categories.findByIdAndUpdate(id, body, {
    runValidators: true,
    new: true,
  });
  sendResponse(res, {
    statusCode: 200,
    message: "successfully updated category",
    data: result,
    success: true,
  });
});
export const DeleteCategory = catchAsyncError(async (req, res) => {
  const id = req.params.id;
  const tag = await Categories.findById(id);
  if (!tag) {
    return sendResponse(res, {
      statusCode: 400,
      message: "Category not found",
      data: null,
      success: false,
    });
  }
  const result = await Categories.findByIdAndDelete(id);
  await Article.updateMany({ categoies: id }, { $pull: { tags: id } });
  sendResponse(res, {
    statusCode: 200,
    message: "successfully updated tag",
    data: result,
    success: true,
  });
});

export const getAllCategories = catchAsyncError(async (req, res) => {
  const categories = await Categories.find();

  if (categories.length === 0) {
    return res.status(400).json({
      success: false,
      msg: "NO tag found",
    });
  }

  return sendResponse(res, {
    message: "Successfully get all tags",
    data: categories,
    success: true,
  });
});
export const getCategoryById = catchAsyncError(async (req, res) => {
  const { id } = req.params;
  const tag = await Tags.findById(id);

  if (!tag) {
    return res.status(400).json({
      success: false,
      msg: `tag not found for ${id} `,
    });
  }

  return sendResponse(res, {
    message: `Successfully get  tag for id ${id}`,
    data: tag,
    success: true,
  });
});
