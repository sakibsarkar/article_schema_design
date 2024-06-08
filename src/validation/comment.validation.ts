import { z } from "zod";

const commentValidatioin = z.object({
  name: z.string(),
  url: z.string().url(),
  text: z.string(),
  people: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, { message: "invalid object id for people" }),
});
export default commentValidatioin;
