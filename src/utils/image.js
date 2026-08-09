/**
 * image.js — browser-side image helpers built on the native Canvas API.
 * Every function runs locally; no file ever leaves the device.
 */

/** Load an image from a URL (object URL or data URL). */
export function loadImageFromUrl(url) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error('Could not load this image. It may be corrupted.'))
    img.src = url
  })
}

/** Load an image from a File/Blob, revoking the temporary object URL after load. */
export function loadImageFromFile(file) {
  const url = URL.createObjectURL(file)
  return loadImageFromUrl(url).finally(() => URL.revokeObjectURL(url))
}

/** Promise wrapper around canvas.toBlob. */
export function canvasToBlob(canvas, type = 'image/jpeg', quality) {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob)
        else reject(new Error('Could not export this image.'))
      },
      type,
      quality,
    )
  })
}

/** Draw an image into a new canvas at the given target size. */
export function drawImageToCanvas(img, targetWidth, targetHeight, backgroundColor) {
  const canvas = document.createElement('canvas')
  canvas.width = Math.max(1, Math.round(targetWidth))
  canvas.height = Math.max(1, Math.round(targetHeight))
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Canvas is not supported in this browser.')

  if (backgroundColor) {
    ctx.fillStyle = backgroundColor
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = 'high'
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
  return canvas
}

/** Crop a source image URL using pixel coordinates from a crop selector. */
export async function getCroppedBlob(imageSrc, pixelCrop, type = 'image/jpeg', quality = 0.92) {
  const image = await loadImageFromUrl(imageSrc)
  const { width, height } = pixelCrop

  const canvas = document.createElement('canvas')
  canvas.width = Math.max(1, Math.round(width))
  canvas.height = Math.max(1, Math.round(height))
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Canvas is not supported in this browser.')

  if (type === 'image/jpeg') {
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    canvas.width,
    canvas.height,
  )
  return canvasToBlob(canvas, type, quality)
}

/** Format name → MIME type. */
export function mimeFor(format) {
  if (format === 'png') return 'image/png'
  if (format === 'webp') return 'image/webp'
  return 'image/jpeg'
}

/** Format name → file extension. */
export function extFor(format) {
  if (format === 'png') return 'png'
  if (format === 'webp') return 'webp'
  return 'jpg'
}
