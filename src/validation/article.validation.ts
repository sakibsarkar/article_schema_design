import { z } from "zod";

const tagSchema = z.object({
  name: z.string({ message: "Tag name is required as string" }),
  url: z.string().url("Invalid URL"),
});
const categorySchema = z.object({
  name: z.string({ message: "Tag name is required as string" }),
  url: z.string().url("Invalid URL"),
});

const articleSchema = z.object({
  title: z.string({ message: "title  is required as string" }),
  text: z.string({ message: "text is required as string" }),
  date: z.string().date(),
  people: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId"),
  tags: z.array(tagSchema).nonempty("Tags are required"),
  category: z.array(categorySchema).nonempty("Tags are required"),
});

const articleUpdateSchema = z.object({
  title: z.string({ message: "title  is required as string" }).optional(),
  text: z.string({ message: "text is required as string" }).optional(),
});

export default articleSchema;
