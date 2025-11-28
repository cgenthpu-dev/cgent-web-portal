import { registerUser } from "../controllers/auth.controller.js";
import { Router } from "express";
import { userRegistrationValidator } from "../validators/index.validator.js";
import { validate } from "../middlewares/validator.middleware.js";

const router = Router();

router
  .route("/register")
  .post(userRegistrationValidator(), validate, registerUser);

export default router;
