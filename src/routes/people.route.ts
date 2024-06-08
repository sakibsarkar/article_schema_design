import { Router } from "express";
import { validSchema } from "../middleweres/validator";
import peopleValidationSchema from "../validation/people.validation";
import { createPeople } from "../controller/people.controller";
const router = Router()
router.post("/create",validSchema(peopleValidationSchema),createPeople)
export const peopleRotue = router;