import { Router } from "express";
import {
  createPeople,
  deletePeople,
  updatePerson as updatePeople,
} from "../controller/people.controller";
import { validSchema } from "../middleweres/validator";
import peopleValidationSchema from "../validation/people.validation";
const router = Router();
router.post("/create", validSchema(peopleValidationSchema), createPeople);
router.put("/update/:id", updatePeople);
router.delete("/del/:id", deletePeople);
export const peopleRotue = router;
