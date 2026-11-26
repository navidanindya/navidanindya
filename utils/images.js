// Serve the matching build-time WebP for a local PNG.
export const webpPath = src => /^\/(?!\/)[^?#]+\.png(?=[?#]|$)/i.test(src) ? src.replace(/\.png(?=[?#]|$)/i, '.webp') : null
