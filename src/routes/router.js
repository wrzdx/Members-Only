import { Router } from "express"
import passport from "passport"
import bcrypt from "bcryptjs"
import db from "./../db/queries.js"
import contoller from "../controllers/contoller.js"

const router = Router()

router.get("/", contoller.getPosts)
router.get("/login", contoller.getLogin)
router.get("/register", contoller.getRegister)
// router.post("/sign-up", contoller.postSignUp)
// router.post(
//   "/login",
//   contoller.postLogin
// )

router.get("/logout", contoller.getLogout)
export default router
