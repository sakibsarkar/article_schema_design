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
  articleId: [
    {
      type: Schema.Types.ObjectId,
      ref: "Article",
      default: [],
    },
  ],
});

export const Categories = mongoose.model("Categories", categorySchema);
