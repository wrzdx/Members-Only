import pool from "./pool.js"

async function getUserByUsername(username) {
  const { rows } = await pool.query("SELECT * FROM users WHERE username=$1", [
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
    "INSERT INTO users (username, password_hash) VALUES ($1, $2)",
    [username, passwordHash],
  )
}

export default { getUserByUsername, getUserById, createNewUser }
