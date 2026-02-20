import passport from "passport"
import bcrypt from "bcryptjs"
import db from "./../db/queries.js"

const getPosts = async (req, res, next) => {
  const posts = await db.getPosts()

  res.render("index", {
    page: "posts",
    currentUser: req.user,
    posts,
  })
}

const postSignUp = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    db.createNewUser(req.body.username, hashedPassword)
    res.redirect("/")
  } catch (error) {
    console.error(error)
    next(error)
  }
}

const postLogin = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/",
})

const getLogout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err)
    }
    res.redirect("/")
  })
}

export default { getPosts, getLogout, postLogin, postSignUp }
