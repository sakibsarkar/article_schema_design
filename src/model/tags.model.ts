import mongoose from "mongoose";

const tagsSchema = new mongoose.Schema({
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
  article: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
});

export const Article = mongoose.model("tags", tagsSchema);
