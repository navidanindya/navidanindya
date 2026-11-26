<script>
import SiteImage from '~/components/global/SiteImage.vue'

export default {
  functional: true,
  props: {
    src: { type: String, required: true },
    alt: { type: String, required: true },
    size: { type: Number, required: true }
  },
  // Forward the size and styling so they apply directly to the fallback image.
  render (h, { props: { src, alt, size }, data }) {
    return h(SiteImage, {
      ...data,
      attrs: { ...data.attrs, src, alt, width: size, height: size },
      staticClass: [data.staticClass, '!m-0 aspect-square shrink-0 object-cover'].filter(Boolean).join(' '),
      style: [data.style, { width: size + 'px', height: size + 'px' }]
    })
  }
}
</script>
