import mongoose, { Document, Model } from "mongoose";

interface IArticle extends Document {
  title: string;
  text: string;
  date: Date;
  people: mongoose.Types.ObjectId;
  tags: mongoose.Types.ObjectId[];
  categoies: mongoose.Types.ObjectId[];
  comments: mongoose.Types.ObjectId[] | [];
  articleId: String;
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
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tags" }],
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Categories" }],
  comments: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comments" }],
    required: false,
    default: [],
  },

  articleId: {
    type: String,
    required: true,
    unique: true,
  },
});
interface IArticleModel extends Model<IArticle> {
  isArticleExist(id: string): Promise<IArticle | null>;
}

articleSchema.statics.isArticleExist = async function (id: string) {
  const article = await this.findOne({
    $or: [
      {
        _id: id,
      },
      {
        articleId: id,
      },
    ],
  });
  return article;
};

export const Article = mongoose.model<IArticle, IArticleModel>(
  "Article",
  articleSchema
);
