import { getPayload, handleEndpoints } from 'payload'

import config from '../src/payload.config'

// Read-only: skip the portfolio onInit seed while testing the actual REST handler.
const payload = await getPayload({ config, disableOnInit: true })

try {
  const upload = payload.collections.media.config.upload
  if (!upload || upload.adapter !== 's3' || !upload.handlers?.length) {
    throw new Error('The S3 media handler is inactive. Check all five S3_* environment variables.')
  }

  const media = await payload.find({ collection: 'media', depth: 0, limit: 100 })
  let checked = 0
  for (const doc of media.docs) {
    const filenames = [
      doc.filename,
      ...Object.values(doc.sizes ?? {}).map((size) => size?.filename),
    ].filter((filename): filename is string => Boolean(filename))

    for (const filename of filenames) {
      const response = await handleEndpoints({
        config,
        request: new Request(`http://localhost/api/media/file/${encodeURIComponent(filename)}`),
      })
      const bytes = await response.arrayBuffer()
      if (response.status !== 200 || !bytes.byteLength) {
        throw new Error(`Media route failed for ${filename}: HTTP ${response.status}`)
      }
      console.log(`${response.status} ${filename} (${bytes.byteLength} bytes)`)
      checked++
    }
  }
  if (!checked) throw new Error('No media files found to verify.')
  console.log(`Verified ${checked} media files through Payload's anonymous REST file route.`)
} finally {
  await payload.destroy()
}
