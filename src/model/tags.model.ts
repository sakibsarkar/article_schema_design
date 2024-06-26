import mongoose, { Schema } from "mongoose";

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
  articleId: [
    {
      type: Schema.Types.ObjectId,
      ref: "Article",
      default: [],
    },
  ],
});

export const Tags = mongoose.model("Tags", tagsSchema);
