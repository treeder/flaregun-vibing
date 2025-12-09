import { html } from 'rend'
import { getPost, Post } from '../data/posts.js'

export async function onRequestGet(c) {
  let id = c.params.id
  let post = await getPost(c, id)
  if (!post) {
    return new Response('Post not found', { status: 404 })
  }
  return await c.data.rend.html({
    main: render,
    post,
  }) 
}

function render(d) {
  return html`
    <script type="module">
      import '/components/post-form.js'
    </script>

    <div class="flex col g20">
      <div>
        <a href="/posts">Back to Posts</a>
      </div>
      <div>
        <div class="headline-medium">Edit Post</div>
      </div>
      <div>
        <post-form .post=${d.post}></post-form>
      </div>
    </div>
  `
}
