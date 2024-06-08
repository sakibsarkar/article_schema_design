import { Article } from "../model/article.model";

export const generateArticleId = async () => {
  const article = await Article.findOne().sort({
    createdAt: -1,
  });

  if (!article) {
    return "ART-00000";
  }

  const lastId = article.articleId.toString().split("-");
  const newArticleIdNumber = Number(lastId[1]) + 1;
  const newArticleId = "ART-" + newArticleIdNumber.toString().padStart(5, "0");
  return newArticleId;
};
