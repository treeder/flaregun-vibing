import { html } from 'rend'
import { getProducts, Product } from './data/products.js'

export async function onRequestGet(c) {
  let products = await c.data.d1.query(Product)
  console.log(products)
  products = await getProducts(c, {})
  console.log('products2:', products)
  return await c.data.rend.html({
    main: render,
    products,
  })
}

function render(d) {
  return html`
    <script type="module">
      import '/components/product-form.js'
    </script>

    <div class="flex col g20">
      <div class="card-modern">
        <div class="headline-medium mb20">Hello World!</div>
        <product-form></product-form>
      </div>

      <div class="card-modern">
        <div class="headline-medium mb20">Products</div>
        <div class="grid g12 w100" style="grid-template-columns: repeat(4, 1fr);">
          <div class="title-medium">Name</div>
          <div class="title-medium">Description</div>
          <div class="title-medium">Price</div>
          <div class="title-medium">Data</div>

          ${d.products.map(
            (p) => html`
              <div class="p8" style="border-bottom: 1px solid var(--md-sys-color-surface-variant);">${p.name}</div>
              <div class="p8" style="border-bottom: 1px solid var(--md-sys-color-surface-variant);">${p.description}</div>
              <div class="p8" style="border-bottom: 1px solid var(--md-sys-color-surface-variant);">${p.price}</div>
              <div class="p8" style="border-bottom: 1px solid var(--md-sys-color-surface-variant);">${p.data?.x}</div>
            `,
          )}
        </div>
      </div>
    </div>
  `
}
