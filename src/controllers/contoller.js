import passport from "passport"
import bcrypt from "bcryptjs"
import db from "./../db/queries.js"
import { checkAuthentication } from "../middlewares/auth.js"

const getPosts = async (req, res) => {
  console.log(req.user)
  const posts = await db.getPosts()
  const formatDate = (dateString) => {
    const diff = Date.now() - new Date(dateString)
    const s = Math.floor(diff / 1000)
    if (s < 60) return `${s} seconds ago`
    const m = Math.floor(s / 60)
    if (m < 60) return `${m} minutes ago`
    const h = Math.floor(m / 60)
    if (h < 24) return `${h} hours ago`
    const d = Math.floor(h / 24)
    return `${d} days ago`
  }

  res.render("index", {
    page: "posts",
    currentUser: req.user,
    posts,
    formatDate,
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

const getNewPost = [
  checkAuthentication,
  (req, res, next) => {
    res.render("index", {
      page: "newPost",
      currentUser: req.user,
    })
  },
]

const postNewPost = [
  checkAuthentication,
  async (req, res) => {
    await db.createPost(req.user.id, req.body.title, req.body.desc)
    res.redirect("/")
  },
]

const postConfirm = [
  checkAuthentication,
  async (req, res) => {
    if (req.body.secret === process.env.MEMBERSHIP_SECRET) {
      await db.updateUserStatus(req.user.id, true)

      res.json("Success!")
    } else {
      res.json("Secret is incorrect, try again")
    }
  },
]

export default {
  getPosts,
  getLogin,
  getRegister,
  getLogout,
  getNewPost,
  postLogin,
  postSignUp,
  postNewPost,
  postConfirm
}
