import mongoose, { Schema } from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  articleId: {
    type: [{ type: Schema.Types.ObjectId, ref: "Article" }],
    required: false,
    default: [],
  },
});

export const Categories = mongoose.model("Categories", categorySchema);
