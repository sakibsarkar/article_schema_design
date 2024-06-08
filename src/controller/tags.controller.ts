import { Article } from "../model/article.model";
import { Tags } from "../model/tags.model";
import { catchAsyncError } from "../utils/catchAsyncError";
import sendResponse from "../utils/sendResponse";

export const createTag = catchAsyncError(async (req, res) => {
  const { body } = req;
  const result = await Tags.create(body);
  sendResponse(res, {
    statusCode: 200,
    message: "successfully created tag",
    data: result,
    success: true,
  });
});
export const updateTag = catchAsyncError(async (req, res) => {
  const { body } = req;
  const id = req.params.id;
  const result = await Tags.findByIdAndUpdate(id, body, {
    runValidators: true,
    new: true,
  });
  sendResponse(res, {
    statusCode: 200,
    message: "successfully updated tag",
    data: result,
    success: true,
  });
});
export const DeleteTag = catchAsyncError(async (req, res) => {
  const id = req.params.id;
  const tag = await Tags.findById(id);
  if (!tag) {
    return sendResponse(res, {
      statusCode: 400,
      message: "tag not found",
      data: null,
      success: false,
    });
  }
  const result = await Tags.findByIdAndDelete(id);
  const article = await Article.updateMany(
    { tags: id },
    { $pull: { tags: id } }
  );
  sendResponse(res, {
    statusCode: 200,
    message: "successfully deleted successfully tag",
    data: article,
    success: true,
  });
});

export const getAllTags = catchAsyncError(async (req, res) => {
  const tag = await Tags.find();

  if (tag.length === 0) {
    return res.status(400).json({
      success: false,
      msg: "NO tag found",
    });
  }

  return sendResponse(res, {
    message: "Successfully get all tags",
    data: tag,
    success: true,
  });
});
export const getTagById = catchAsyncError(async (req, res) => {
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
