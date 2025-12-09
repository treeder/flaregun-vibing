import { html } from 'rend'
import { getPosts, Post } from '../data/posts.js'

export async function onRequestGet(c) {
  let posts = await getPosts(c, {})
  return await c.data.rend.html({
    main: render,
    posts,
  })
}

function render(d) {
  return html`
    <script type="module">
      import '/components/post-form.js'
    </script>

    <div class="flex col g20">
      <div>
        <div class="headline-medium">Blog Posts</div>
      </div>
      <div>
        <post-form></post-form>
      </div>
      <div>
        <div class="headline-small">Existing Posts</div>
      </div>
      <div class="grid g12 w100" style="grid-template-columns: repeat(1, 1fr);">
        ${d.posts.map(
          (p) => html`
            <div class="card p16">
              <div class="title-large">${p.title}</div>
              <div class="body-medium">/${p.slug}</div>
              <div class="body-medium">${p.content}</div>
            </div>
          `,
        )}
      </div>
    </div>
  `
}
