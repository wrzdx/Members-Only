import "dotenv/config"
import express from "express"
import router from "./routes/router.js"
import authSession from "./auth/session-config.js"
import localStrategy from "./auth/strategy.js"
import passport from "passport"
import { deserializer, serializer } from "./auth/transformers.js"

const PORT = process.env.PORT || 8000

const app = express()
app.set("views", new URL("./views/pages", import.meta.url).pathname)
app.set("view engine", "ejs")
app.use(express.static("public"))

app.use(authSession)
app.use(passport.session())

app.use(express.urlencoded({ extended: true }))

passport.use(localStrategy)
passport.serializeUser(serializer)
passport.deserializeUser(deserializer)

app.use("/", router)

app.listen(PORT, (error) => {
  if (error) {
    throw error
  }
  console.log(`You can access site on http://localhost:${PORT}`)
})
