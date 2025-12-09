export class Post {
  static properties = {
    id: {
      type: String,
      primaryKey: true,
    },
    createdAt: {
      type: Date,
    },
    updatedAt: {
      type: Date,
    },
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    slug: {
      type: String,
    },
  }
}

export async function getPosts(c, q = {}) {
  return await c.data.d1.query(Post, q)
}

export async function getPost(c, id) {
  return await c.data.d1.get(Post, id)
}
