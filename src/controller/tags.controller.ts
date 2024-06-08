import { Article } from "../model/article.model";
import { Tags } from "../model/tags.model";
import { catchAsyncError } from "../utils/catchAsyncError";
import sendResponse from "../utils/sendResponse";

export const updateTagbyId = catchAsyncError(async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  ["articleId"].forEach((e) => delete body[e]);
  const isExistTag = await Tags.findById(id);
  if (!isExistTag) {
    return sendResponse(res, {
      message: "Tag not found",
      data: null,
      success: false,
      statusCode: 400,
    });
  }

  const update = await Tags.findByIdAndUpdate(id, body);
  sendResponse(res, {
    message: "Tag updated successfully",
    data: update,
    success: true,
    statusCode: 200,
  });
});

export const tagByArticleId = catchAsyncError(async (req, res) => {
  // article id
  const id = req.params.id;
  const { tags } = req.body;

  const isExistArticle = await Article.isArticleExist(id);
  if (!isExistArticle) {
    return sendResponse(res, {
      data: null,
      success: false,
      message: "now article found",
    });
  }

  [...tags].forEach(async (tag) => await Tags.findByIdAndUpdate(tag._id, tag));
  sendResponse(res, {
    data: null,
    message: "tags update successfull",
    success: true,
    statusCode: 200,
  });
});
export const createTag = catchAsyncError(async (req, res) => {
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
  const result = await Tags.create({
    ...body,
    articleId: isExistArticle.articleId,
  });
  await Article.findByIdAndUpdate(isExistArticle._id, {
    $push: { tags: result._id },
  });

  sendResponse(res, {
    message: "tags created successfully",
    data: result,
    success: true,
    statusCode: 200,
  });
});
export const geleteTagByid = catchAsyncError(async (req, res) => {
  const id = req.params.tagId;
  const isExist = await Tags.findById(id);
  if (!isExist) {
    return sendResponse(res, {
      data: null,
      success: false,
      message: "now tag found",
    });
  }

  await Tags.deleteOne({ _id: id });
  await Article.findOneAndUpdate(
    { articleId: isExist.articleId },
    { $pull: { tags: isExist._id } }
  );

  return sendResponse(res, {
    data: null,
    success: true,
    message: "tag delete successfully",
    statusCode: 200,
  });
});
