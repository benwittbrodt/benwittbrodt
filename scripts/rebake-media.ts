/**
 * One-off: re-save existing JPEGs through the Media upload hook.
 *
 * Photos uploaded before the EXIF-orientation hook shipped are stored unrotated, which makes the
 * crop/focal-point editor fail. This re-uploads each affected original through the local API so the
 * hook bakes the rotation, caps the size, and Payload regenerates every size. Filenames, ids and
 * post references stay the same.
 *
 * Dry run by default; pass --apply to change anything. Originals are copied to ./media-backup first.
 *
 *   npm run rebake:media             # report only
 *   npm run rebake:media -- --apply  # do it
 *   npm run rebake:media -- --ids=3,4 # limit to specific media ids
 */
import 'dotenv/config'
import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'
import { getPayload } from 'payload'
import config from '../src/payload.config'

const MAX_EDGE = 3000
const apply = process.argv.includes('--apply')
const idsArg = process.argv.find((a) => a.startsWith('--ids='))
const onlyIds = idsArg ? new Set(idsArg.slice(6).split(',').map(String)) : null

const payload = await getPayload({ config })
const staticDir = path.resolve(payload.collections.media.config.upload.staticDir ?? 'media')
const backupDir = path.resolve('media-backup')

let page = 1
let hasNext = true
const counts = { checked: 0, needsFix: 0, fixed: 0, failed: 0 }

while (hasNext) {
  const res = await payload.find({ collection: 'media', limit: 20, page, depth: 0, pagination: true })
  hasNext = res.hasNextPage
  page += 1

  for (const doc of res.docs) {
    if (onlyIds && !onlyIds.has(String(doc.id))) continue
    counts.checked += 1
    const label = `#${doc.id} ${doc.filename}`
    if (!doc.filename || doc.mimeType !== 'image/jpeg') {
      console.log(`skip   ${label} (${doc.mimeType ?? 'no file'})`)
      continue
    }

    const filePath = path.join(staticDir, doc.filename)
    try {
      const original = await fs.readFile(filePath)
      const meta = await sharp(original).metadata()
      const rotated = (meta.orientation ?? 1) > 1
      const oversized = Math.max(meta.width ?? 0, meta.height ?? 0) > MAX_EDGE
      if (!rotated && !oversized) {
        console.log(`ok     ${label} (${meta.width}x${meta.height})`)
        continue
      }

      counts.needsFix += 1
      const why = [rotated && `EXIF orientation ${meta.orientation}`, oversized && `${meta.width}x${meta.height} > ${MAX_EDGE}`]
        .filter(Boolean)
        .join(', ')
      if (!apply) {
        console.log(`WOULD  ${label} (${why})`)
        continue
      }

      await fs.mkdir(backupDir, { recursive: true })
      await fs.copyFile(filePath, path.join(backupDir, doc.filename))

      const updated = await payload.update({
        collection: 'media',
        id: doc.id,
        data: {},
        file: { data: original, mimetype: 'image/jpeg', name: doc.filename, size: original.length },
        overwriteExistingFiles: true,
      })
      console.log(`FIXED  ${label}: ${doc.width}x${doc.height} -> ${updated.width}x${updated.height}`)
      counts.fixed += 1
    } catch (err) {
      counts.failed += 1
      console.error(`FAILED ${label}:`, err instanceof Error ? err.message : err)
    }
  }
}

console.log(
  `\n${apply ? 'Applied' : 'Dry run'}: ${counts.checked} checked, ${counts.needsFix} need a fix` +
    (apply ? `, ${counts.fixed} fixed, ${counts.failed} failed. Originals are in ${backupDir}` : ' (run with --apply to fix)'),
)
process.exit(counts.failed ? 1 : 0)
