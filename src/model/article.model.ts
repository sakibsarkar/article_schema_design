import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: new Date(),
  },
  people: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  tags: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  category: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
});

export const Article = mongoose.model("article", articleSchema);
