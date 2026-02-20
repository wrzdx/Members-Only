import passport from "passport"
import bcrypt from "bcryptjs"
import db from "./../db/queries.js"

const getPosts = async (req, res) => {
  const posts = await db.getPosts()
  res.render("index", {
    page: "posts",
    currentUser: req.user,
    posts,
  })
}

const getLogin = async (req, res, next) => {
  res.render("index", {
    page: "login",
  })
}

const getRegister = async (req, res, next) => {
  res.render("index", {
    page: "register",
  })
}

const postSignUp = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    await db.createNewUser(req.body.username, hashedPassword, req.body.fullname)
    res.redirect("/login")
  } catch (error) {
    console.error(error)
    next(error)
  }
}

const postLogin = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
})

const getLogout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err)
    }
    res.redirect("/")
  })
}

export default {
  getPosts,
  getLogin,
  getRegister,
  getLogout,
  postLogin,
  postSignUp,
}
