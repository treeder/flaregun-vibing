import { LitElement, html, css } from 'lit'
import 'material/text-field/text-field.js'
import 'material/buttons/button.js'
import { styles } from '/css/styles.js'
import { api } from 'api'

export class PostForm extends LitElement {
  static styles = [
    styles,
    css`
      :host {
        display: block;
      }
    `,
  ]

  static properties = {
    post: { type: Object },
  }

  constructor() {
    super()
    this.post = {}
  }

  render() {
    return html`
      <form id="post-form">
        <div class="flex col g16">
          <div class="headline-medium">Post Form</div>
          <div>Create or edit a blog post.</div>
          <md-text-field id="title" label="Title" value="${this.post.title || ''}" required></md-text-field>
          <md-text-field id="slug" label="Slug" value="${this.post.slug || ''}" required></md-text-field>
          <md-text-field
            id="content"
            label="Content"
            value="${this.post.content || ''}"
            required
            type="textarea"
            rows="5"
          ></md-text-field>
          <div class="flex row g16">
            <md-button type="button" @click=${this.submit}>Save</md-button>
            ${this.post.id
              ? html`<md-button type="button" class="error" @click=${this.delete}>Delete</md-button>`
              : ''}
          </div>
        </div>
      </form>
    `
  }

  async submit() {
    let f = this.renderRoot.getElementById('post-form')
    if (!f.reportValidity()) return
    let newPost = {
      title: this.renderRoot.getElementById('title').value,
      slug: this.renderRoot.getElementById('slug').value,
      content: this.renderRoot.getElementById('content').value,
    }

    if (this.post.id) {
       console.log('updating post', this.post.id, newPost)
       let r = await api(`/v1/posts/${this.post.id}`, {
        method: 'PUT',
        body: {
          post: newPost,
        },
      })
      this.post = r.post
    } else {
      console.log('creating post', newPost)
      let r = await api('/v1/posts', {
        method: 'POST',
        body: {
          post: newPost,
        },
      })
      this.post = r.post
    }

    // redirect to list
    window.location.href = '/posts'
  }

  async delete() {
    if (!confirm('Are you sure you want to delete this post?')) return
    await api(`/v1/posts/${this.post.id}`, {
      method: 'DELETE',
    })
    window.location.href = '/posts'
  }
}

customElements.define('post-form', PostForm)
