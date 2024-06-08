import { Article } from "../model/article.model";
import { Comment } from "../model/comment.model";
import { catchAsyncError } from "../utils/catchAsyncError";
import sendResponse from "../utils/sendResponse";

export const createComment = catchAsyncError(async (req, res) => {
  // article id
  const id = req.params.id;
  const body = req.body;
  const isArticleExist = await Article.isArticleExist(id);
  if (!isArticleExist) {
    return sendResponse(res, {
      data: null,
      success: false,
      message: "article not found",
    });
  }
  const result = await Comment.create({
    ...body,
    articleId: isArticleExist.articleId,
  });

  await Article.findByIdAndUpdate(isArticleExist._id, {
    $push: { comments: result._id },
  });

  sendResponse(res, {
    data: result,
    success: false,
    message: "succsessfully comment added",
  });
});

export const updateCommentbyId = catchAsyncError(async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  ["articleId"].forEach((e) => delete body[e]);
  const isExistComment = await Comment.findById(id);
  if (!isExistComment) {
    return sendResponse(res, {
      message: "comment not found",
      data: null,
      success: false,
      statusCode: 400,
    });
  }

  const update = await Comment.findByIdAndUpdate(id, body);
  sendResponse(res, {
    message: "comment updated successfully",
    data: update,
    success: true,
    statusCode: 200,
  });
});

export const deleteCommentByid = catchAsyncError(async (req, res) => {
  const id = req.params.commentId;
  const isExist = await Comment.findById(id);
  if (!isExist) {
    return sendResponse(res, {
      data: null,
      success: false,
      message: "no comment found",
    });
  }

  await Comment.deleteOne({ _id: id });
  await Article.findOneAndUpdate(
    { articleId: isExist.articleId },
    { $pull: { comments: isExist._id } }
  );

  return sendResponse(res, {
    data: null,
    success: true,
    message: "Commemt delete successfully",
    statusCode: 200,
  });
});
