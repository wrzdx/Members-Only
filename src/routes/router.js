import { Router } from "express"
import passport from "passport"
import bcrypt from "bcryptjs"
import db from "./../db/queries.js"
import contoller from "../controllers/contoller.js"

const router = Router()

router.get("/", contoller.getPosts)
router.get("/login", contoller.getLogin)
router.get("/register", contoller.getRegister)
router.get("/new-post", contoller.getNewPost)
router.post("/register", contoller.postSignUp)
router.post(
  "/login",
  contoller.postLogin
)
router.post("/new-post", contoller.postNewPost)
router.post("/confirm-membership", contoller.postConfirm)
router.get("/logout", contoller.getLogout)
export default router
