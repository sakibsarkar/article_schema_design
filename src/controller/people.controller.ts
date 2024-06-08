import { Article } from "../model/article.model";
import { Comment } from "../model/comment.model";
import { People } from "../model/people.model";
import { catchAsyncError } from "../utils/catchAsyncError";
import { generatePeopleId } from "../utils/generatePeopleId";
import sendResponse from "../utils/sendResponse";

export const createPeople = catchAsyncError(async (req, res) => {
  const body = req.body;
  const id = await generatePeopleId();
  const person = await People.create({ ...body, id });
  sendResponse(res, {
    data: person,
    success: true,
    message: "successfully created people",
  });
});
export const updatePerson = catchAsyncError(async (req, res) => {
  const { id } = req.params;
  const objIdRegex = /^[0-9a-fA-F]{24}$/;
  if (!objIdRegex.test(id)) {
    return sendResponse(res, {
      data: null,
      success: false,
      message: "invalid object id",
      statusCode: 400,
    });
  }
  const isExist = await People.findById(id);
  if (!isExist) {
    return sendResponse(res, {
      data: null,
      success: false,
      message: "people not found",
      statusCode: 400,
    });
  }
  const updatedPerson = await People.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!updatedPerson) {
    return sendResponse(res, {
      data: null,
      success: false,
      message: "can't updated people",
    });
  }
  sendResponse(res, {
    data: updatedPerson,
    success: true,
    message: "successfully updated people",
  });
});
export const deletePeople = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const people = await People.findById(id);
  if (!people) {
    return sendResponse(res, {
      message: "people not foud",
      data: null,
      success: false,
      statusCode: 400,
    });
  }

  const peopleId = people._id;

  //   delete oparation
  await People.deleteOne({ _id: peopleId });
  await Comment.deleteMany({ people: peopleId });
  await Article.deleteMany({ people: peopleId });

  sendResponse(res, {
    data: null,
    message: "people delete successfully",
    success: true,
    statusCode: 200,
  });
});
