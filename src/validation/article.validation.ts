import { z } from "zod";

export const tagSchema = z.object({
  name: z.string({ message: "Tag name is required as string" }),
  url: z.string().url("Invalid URL"),
});
export const categorySchema = z.object({
  name: z.string({ message: "Tag name is required as string" }),
  url: z.string().url("Invalid URL"),
});

const articleSchema = z.object({
  title: z.string({ message: "title  is required as string" }),
  text: z.string({ message: "text is required as string" }),
  date: z.string().date(),
  people: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId"),
});

const articleUpdateSchema = z.object({
  title: z.string({ message: "title  is required as string" }).optional(),
  text: z.string({ message: "text is required as string" }).optional(),
});

export default articleSchema;
