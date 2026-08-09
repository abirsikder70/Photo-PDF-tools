import JSZip from 'jszip'

/**
 * createZip — bundle a list of files into a ZIP blob (download helper).
 * @param {Array<{name: string, data: Blob|Uint8Array|string}>} files
 */
export async function createZip(files) {
  const zip = new JSZip()
  for (const file of files) {
    zip.file(file.name, file.data)
  }
  return zip.generateAsync({ type: 'blob', compression: 'DEFLATE' })
}
