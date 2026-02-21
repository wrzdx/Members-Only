import pool from "./pool.js"

async function getUserByUsername(username) {
  const { rows } = await pool.query("SELECT * FROM member WHERE username=$1", [
    username,
  ])
  return rows[0]
}

async function getUserById(id) {
  const { rows } = await pool.query("SELECT * FROM member  WHERE id=$1", [id])
  return rows[0]
}

async function createNewUser(username, passwordHash, fullname) {
  const { rows } = await pool.query(
    "INSERT INTO member (username, password_hash, fullname) VALUES ($1, $2, $3) RETURNING *",
    [username, passwordHash, fullname],
  )

  return rows[0]
}

async function updateUserStatus(id, isMember) {
  const { rows } = await pool.query(
    "UPDATE member SET is_member=$1 WHERE id=$2 RETURNING *",
    [isMember, id],
  )
  return rows[0]
}

async function getPosts() {
  const { rows } = await pool.query(
    "SELECT post.*, member.fullname, member.username FROM post JOIN member ON member.id=post.user_id ORDER BY post.created_at DESC",
  )

  return rows
}

async function createPost(userId, title, desc) {
  const { rows } = await pool.query(
    "INSERT INTO post (title, description, user_id) VALUES ($1, $2, $3)",
    [title, desc, userId],
  )
}

export default {
  getUserByUsername,
  getUserById,
  createNewUser,
  getPosts,
  createPost,
  updateUserStatus,
}
