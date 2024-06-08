import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
    default: new Date(),
  },
  people: {
    type: mongoose.Types.ObjectId,
    required: true,
  },

  articleId: {
    type: String,
    required: true,
  },
});

export const Comment = mongoose.model("Comment", commentSchema);
