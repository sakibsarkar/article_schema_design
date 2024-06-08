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
