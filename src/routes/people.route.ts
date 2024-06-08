import { Router } from "express";
import { validSchema } from "../middleweres/validator";
import peopleValidationSchema from "../validation/people.validation";
const router = Router()
router.post("/create",validSchema(peopleValidationSchema))