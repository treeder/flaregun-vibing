import { ClassMigrations } from 'migrations'
import { Product } from './products.js'
import { User } from './users.js'
import { Post } from './posts.js'

export async function runMigrations(c) {
  let migrations = new ClassMigrations(c.env.D1, [User, Product, Post])
  await migrations.run()
}
