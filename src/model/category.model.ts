import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  article: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
});

export const Category = mongoose.model("category", categorySchema);
