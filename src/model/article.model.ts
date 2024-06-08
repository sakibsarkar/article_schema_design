import mongoose, { Document, Model } from "mongoose";

interface IArticle extends Document {
  title: string;
  text: string;
  date: Date;
  people: mongoose.Types.ObjectId;
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
  },
});
interface IArticleModel extends Model<IArticle> {
  isArticleExist(id: string): Promise<IArticle | null>;
}

articleSchema.statics.isArticleExist = async function (id: string) {
  const objIdRegex = /^[0-9a-fA-F]{24}$/;
  if (!objIdRegex.test(id)) {
    throw new Error("Invalid object id");
  }
  const article = await this.findById(id);
  return article;
};

export const Article = mongoose.model<IArticle, IArticleModel>(
  "article",
  articleSchema
);
