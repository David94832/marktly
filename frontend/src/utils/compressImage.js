// Comprimeert een foto client-side naar JPEG (max ~1920px, max ~1MB) zodat uploads klein en snel blijven.
const MAX_DIMENSION = 1920
const MAX_SIZE_BYTES = 1_000_000
const MIN_QUALITY = 0.4

function loadImage(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.onload = () => {
      URL.revokeObjectURL(url)
      resolve(img)
    }
    img.onerror = (error) => {
      URL.revokeObjectURL(url)
      reject(error)
    }
    img.src = url
  })
}

function canvasToBlob(canvas, quality) {
  return new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', quality))
}

export async function compressImage(file) {
  const img = await loadImage(file)

  let { width, height } = img
  if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
    const scale = MAX_DIMENSION / Math.max(width, height)
    width = Math.round(width * scale)
    height = Math.round(height * scale)
  }

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  canvas.getContext('2d').drawImage(img, 0, 0, width, height)

  let quality = 0.8
  let blob = await canvasToBlob(canvas, quality)

  while (blob.size > MAX_SIZE_BYTES && quality > MIN_QUALITY) {
    quality -= 0.1
    blob = await canvasToBlob(canvas, quality)
  }

  const name = file.name.replace(/\.\w+$/, '') || 'foto'
  return new File([blob], `${name}.jpg`, { type: 'image/jpeg' })
}
