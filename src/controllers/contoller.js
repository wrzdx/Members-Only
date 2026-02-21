import passport from "passport"
import bcrypt from "bcryptjs"
import db from "./../db/queries.js"
import { checkAuthentication, checkIsAdmin } from "../middlewares/auth.js"
import { validateMember, validatePost } from "../validators/validators.js"
import { matchedData, validationResult } from "express-validator"

const getPosts = async (req, res) => {
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
    title: "Members Only | Home",
    page: "posts",
    currentUser: req.user,
    posts,
    formatDate,
  })
}

const getLogin = (req, res, next) => {
  const errorMessages = req.session.messages
  req.session.messages = []
  res.render("index", {
    title: "Members Only | Login",
    page: "login",
    errorMessages,
  })
}

const getRegister = (req, res, next) => {
  res.render("index", {
    title: "Members Only | Register",
    page: "register",
  })
}

const postSignUp = [
  validateMember,
  async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const { username, fullname } = req.body
      return res.render("index", {
        title: "Members Only | Register",
        page: "register",
        errorMessages: errors.array().map((err) => err.msg),
        defaults: { username, fullname },
      })
    }
    const { password, username, fullname } = matchedData(req)
    const hashedPassword = await bcrypt.hash(password, 10)
    await db.createNewUser(username, hashedPassword, fullname)
    res.redirect("/login")
  },
]

const postLogin = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureMessage: true,
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
      title: "Members Only | New Post",
      page: "newPost",
      currentUser: req.user,
    })
  },
]

const postNewPost = [
  checkAuthentication,
  validatePost,
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const { title, desc } = req.body
      return res.render("index", {
        title: "Members Only | New Post",
        page: "newPost",
        errorMessages: errors.array().map((err) => err.msg),
        defaults: { title, desc },
        currentUser: req.user,
      })
    }
    const { title, desc } = matchedData(req)
    await db.createPost(req.user.id, title, desc)
    res.redirect("/")
  },
]

const postConfirm = [
  checkAuthentication,
  async (req, res) => {
    if (req.body.secret === process.env.MEMBERSHIP_SECRET) {
      console.log(req.user.id)
      await db.updateUserStatus(req.user.id, true, req.user.is_admin)

      res.json("Success!")
    } else {
      res.json("Secret is incorrect, try again")
    }
  },
]

const postMakeAdmin = [
  checkAuthentication,
  async (req, res) => {
    if (req.body.secret === process.env.ADMIN_SECRET) {
      await db.updateUserStatus(req.user.id, req.user.is_member, true)

      res.json("Success!")
    } else {
      res.json("Secret is incorrect, try again")
    }
  },
]

const deletePost = [
  checkAuthentication,
  checkIsAdmin,
  async (req, res) => {
    await db.deletePost(req.params.id)
    res.json({ success: true })
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
  postConfirm,
  postMakeAdmin,
  deletePost,
}
