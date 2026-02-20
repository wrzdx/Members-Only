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

const getLogin = (req, res, next) => {
  res.render("index", {
    page: "login",
  })
}

const getRegister = (req, res, next) => {
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

const getNewPost = (req, res, next) => {
  res.render("index", {
    page: "newPost",
    currentUser: req.user,
  })
}

const postNewPost = async (req, res) => {
  await db.createPost(req.user.id, req.body.title, req.body.desc)
  res.redirect("/")
}

export default {
  getPosts,
  getLogin,
  getRegister,
  getLogout,
  getNewPost,
  postLogin,
  postSignUp,
  postNewPost
}
