import { People } from "../model/people.model";

export const generatePeopleId = async () => {
  const article = await People.findOne().sort({
    createdAt: -1,
  });

  if (!article) {
    return "PEOPLE-00000";
  }

  const lastId = article.id.toString().split("-");
  const newPeopleIdNumber = Number(lastId[1]) + 1;
  const newPeopleId = "PEOPLE-" + newPeopleIdNumber.toString().padStart(5, "0");
  return newPeopleId;
};
