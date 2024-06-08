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
    type: Date,
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
    unique: true,
  },
});

export const Article = mongoose.model("Comment", commentSchema);
