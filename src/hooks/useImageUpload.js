import { useCallback, useEffect, useState } from 'react'
import { loadImageFromFile } from '../utils/image'

/**
 * useImageUpload — shared state for tools that process a single image.
 *
 * Returns:
 *  - file         the selected File (or null)
 *  - previewUrl   object URL for previewing the original image
 *  - dimensions   { width, height } in pixels once the image is read
 *  - error        error message (or '')
 *  - setError     clear/set the error manually
 *  - selectFiles  pass this straight into <FileUploader onFiles={...}>
 */
export function useImageUpload() {
  const [file, setFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [dimensions, setDimensions] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  const selectFiles = useCallback((files) => {
    const selected = files && files[0]
    if (!selected) return

    if (!selected.type.startsWith('image/')) {
      setError('Please choose a valid image file (JPG, PNG or WebP).')
      return
    }

    setError('')
    setFile(selected)
    setDimensions(null)
    setPreviewUrl(URL.createObjectURL(selected))

    loadImageFromFile(selected)
      .then((img) => setDimensions({ width: img.width, height: img.height }))
      .catch(() => setError('Could not read the image dimensions from this file.'))
  }, [])

  return { file, previewUrl, dimensions, error, setError, selectFiles }
}
