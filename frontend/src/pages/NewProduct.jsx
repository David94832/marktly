// Scherm "Nieuw product": foto's maken (camera) of uploaden (galerij), comprimeren, bekijken en verwijderen.
// De "Volgende" knop krijgt pas functionaliteit in Fase 3.
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { compressImage } from '../utils/compressImage.js'

const MAX_PHOTOS = 6

function NewProduct() {
  const [photos, setPhotos] = useState([])
  const [isProcessing, setIsProcessing] = useState(false)
  const cameraInputRef = useRef(null)
  const galleryInputRef = useRef(null)

  const canAddMore = photos.length < MAX_PHOTOS

  async function addFiles(fileList) {
    const remainingSlots = MAX_PHOTOS - photos.length
    const files = Array.from(fileList).slice(0, remainingSlots)
    if (files.length === 0) return

    setIsProcessing(true)
    try {
      const compressed = await Promise.all(files.map(compressImage))
      setPhotos((current) => [
        ...current,
        ...compressed.map((file) => ({
          id: crypto.randomUUID(),
          file,
          previewUrl: URL.createObjectURL(file),
        })),
      ])
    } finally {
      setIsProcessing(false)
    }
  }

  function removePhoto(id) {
    setPhotos((current) => {
      const target = current.find((photo) => photo.id === id)
      if (target) URL.revokeObjectURL(target.previewUrl)
      return current.filter((photo) => photo.id !== id)
    })
  }

  function handleInputChange(event) {
    addFiles(event.target.files)
    event.target.value = '' // dezelfde foto opnieuw kunnen kiezen
  }

  return (
    <div className="flex min-h-svh flex-col bg-gray-50">
      <header className="flex items-center gap-3 border-b border-gray-200 bg-white px-4 py-3">
        <Link to="/" className="text-sm text-gray-500">
          ← Terug
        </Link>
        <h1 className="text-lg font-semibold text-gray-900">Nieuw product</h1>
      </header>

      <main className="flex-1 px-4 py-4">
        <p className="mb-3 text-sm text-gray-500">
          {photos.length}/{MAX_PHOTOS} foto's
        </p>

        <div className="grid grid-cols-3 gap-2">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="relative aspect-square overflow-hidden rounded-lg bg-gray-200"
            >
              <img src={photo.previewUrl} alt="" className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => removePhoto(photo.id)}
                aria-label="Foto verwijderen"
                className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-sm text-white"
              >
                ×
              </button>
            </div>
          ))}

          {canAddMore && (
            <>
              <button
                type="button"
                onClick={() => cameraInputRef.current?.click()}
                disabled={isProcessing}
                className="flex aspect-square flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-gray-300 text-gray-500 disabled:opacity-50"
              >
                <span className="text-xl">📷</span>
                <span className="text-xs">Camera</span>
              </button>
              <button
                type="button"
                onClick={() => galleryInputRef.current?.click()}
                disabled={isProcessing}
                className="flex aspect-square flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-gray-300 text-gray-500 disabled:opacity-50"
              >
                <span className="text-xl">🖼️</span>
                <span className="text-xs">Galerij</span>
              </button>
            </>
          )}
        </div>

        {isProcessing && <p className="mt-3 text-sm text-gray-500">Foto's comprimeren...</p>}

        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={handleInputChange}
        />
        <input
          ref={galleryInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleInputChange}
        />
      </main>

      <footer className="border-t border-gray-200 bg-white px-4 py-3">
        <button
          type="button"
          disabled={photos.length === 0}
          className="w-full rounded-full bg-gray-900 py-3 text-base font-medium text-white disabled:bg-gray-300"
        >
          Volgende
        </button>
      </footer>
    </div>
  )
}

export default NewProduct
