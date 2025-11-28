import { body } from "express-validator";

export const userRegistrationValidator = () => {
  return [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email").trim().isEmail().withMessage("Valid email is required"),
    body("username").notEmpty().withMessage("Username is required"),
    body("password")
      .notEmpty()
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ];
};
