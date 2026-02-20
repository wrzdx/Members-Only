import pool from "./pool.js"

async function getUserByUsername(username) {
  const { rows } = await pool.query("SELECT * FROM member WHERE username=$1", [
    username,
  ])
  return rows[0]
}

async function getUserById(id) {
  const { rows } = await pool.query("SELECT * FROM users WHERE id=$1", [id])
  return rows[0]
}

async function createNewUser(username, passwordHash) {
  const { rows } = await pool.query(
    "INSERT INTO member (username, password_hash) VALUES ($1, $2) RETURING *",
    [username, passwordHash],
  )

  return rows[0]
}

async function getPosts() {
  const { rows } = await pool.query("SELECT * FROM post")

  return rows
}

export default { getUserByUsername, getUserById, createNewUser, getPosts }
