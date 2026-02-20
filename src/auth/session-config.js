import session from "express-session"
import connectPgSimple from "connect-pg-simple"
import pool from "../db/pool.js"

const pgSession = connectPgSimple(session)

const authSession = session({
  store: new pgSession({
    pool,
    createTableIfMissing: true,
  }),
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000 },
})

export default authSession
