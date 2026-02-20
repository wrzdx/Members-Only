#! /usr/bin/env node

import { Client } from "pg"
import "dotenv/config"

const SQL = ``

const connectionString = process.env.DATABASE_URL

async function main() {
  console.log("seeding...")
  const client = new Client({
    connectionString,
  })
  await client.connect()
  await client.query(SQL)
  await client.end()
  console.log("done")
}

main()
