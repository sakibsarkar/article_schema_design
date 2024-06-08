import mongoose, { Document, Model } from "mongoose";

interface IArticle extends Document {
  title: string;
  text: string;
  date: Date;
  people: mongoose.Types.ObjectId;
  tags: mongoose.Types.ObjectId[] | [];
  categoies: mongoose.Types.ObjectId[] | [];
  comments: mongoose.Types.ObjectId[] | [];
}

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
    ref: "People",
  },
  tags: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tags" }],
    required: false,
    default: [],
  },
  categories: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Categories" }],
    required: false,
    default: [],
  },
  comments: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comments" }],
    required: false,
    default: [],
  },
});
interface IArticleModel extends Model<IArticle> {
  isArticleExist(id: string): Promise<IArticle | null>;
}

articleSchema.statics.isArticleExist = async function (id: string) {

  const article = await Article.findById(id);
  return article;
};

export const Article = mongoose.model<IArticle, IArticleModel>(
  "Article",
  articleSchema
);
