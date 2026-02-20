import db from "./../db/queries.js"

const serializer = (user, done) => {
  done(null, user.id)
}

const deserializer = async (id, done) => {
  try {
    const user = await db.getUserById(id)
    done(null, user)
  } catch (err) {
    done(err)
  }
}

export { serializer, deserializer }
