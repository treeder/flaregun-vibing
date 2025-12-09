import { Post } from '../../data/posts.js'

export async function onRequestPut(c) {
  let id = c.params.id
  let input = await c.request.json()
  let post = input.post
  await c.data.d1.update(Post, id, post)
  return Response.json({ post })
}

export async function onRequestDelete(c) {
  let id = c.params.id
  await c.data.d1.delete(Post, id)
  return Response.json({ ok: true })
}
