import { Router } from "express"
import passport from "passport"
import bcrypt from "bcryptjs"
import db from "./../db/queries.js"

const router = Router()

router.get("/", (req, res, next) => {
  res.send("Homepage " + req.user + " " + req?.session?.messages)
})

router.post("/sign-up", async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    db.createNewUser(req.body.username, hashedPassword)
    res.redirect("/")
  } catch (error) {
    console.error(error)
    next(error)
  }
})
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
    failureMessage: true,
    successMessage: true,
  }),
)

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err)
    }
    res.redirect("/")
  })
})
export default router
