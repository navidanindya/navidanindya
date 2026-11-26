<script>
import { webpPath } from '~/utils/images'

export default {
  functional: true,
  // Keep size, styling and accessible text on the fallback image.
  render (h, { data }) {
    const attrs = { decoding: 'async', ...data.attrs }
    const image = h('img', { ...data, attrs })
    const webp = process.env.NODE_ENV === 'production' && webpPath(attrs.src)
    if (!webp) { return image }
    return h('picture', { key: data.key, staticClass: 'contents' }, [
      h('source', { attrs: { type: 'image/webp', srcset: webp } }),
      image
    ])
  }
}
</script>
