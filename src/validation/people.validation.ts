import { z } from "zod";

const peopleValidationSchema = z.object({
  name: z.string({message:"name is required as string"}),
  home_phone: z.string({message:"home_phone is required as string"}),
  work_phone: z.string({message:"work_phone is required as string"}),
});
export default peopleValidationSchema;
