import { body } from "express-validator"
import db from "./../db/queries.js"

const validatePost = [
  body("title")
    .trim()
    .isLength({ min: 3, max: 255 })
    .withMessage(
      "Title must be at least 3 characters and at most 255 characters long",
    ),
  body("description")
    .trim()
    .isLength({ min: 50 })
    .withMessage("Description must be at least 50 characters long"),
]

const validateMember = [
  body("username")
    .trim()
    .isLength({ min: 3, max: 255 })
    .withMessage(
      "Username must be at least 3 characters and at most 255 characters long",
    )
    .custom(async (username) => {
      const isExisting = await db.getUserByUsername(username)
      if (isExisting) {
        throw new Error(`Username ${username} has already been taken`)
      }
      return true
    }),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be a at least 8 characters long")
    .custom((password, { req }) => {
      if (password !== req.body.confirmPassword) {
        throw new Error("Password fields do not match")
      }
      return true
    }),
  body("fullname")
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage(
      "Fullname must be at least 1 character and at most 255 characters long",
    ),
]
export { validatePost, validateMember }
