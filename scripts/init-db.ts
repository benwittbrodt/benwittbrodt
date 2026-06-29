/**
 * Initialize the Payload database schema.
 *
 * Run as `prebuild` so `next build` finds the tables it needs when
 * collecting page data. Idempotent — safe to run every build.
 *
 * With `push: true` in the SQLite adapter, calling getPayload() syncs the
 * schema on connect. We do it once here, synchronously, then exit so the
 * parallel build workers don't race to do the same.
 */
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

await getPayload({ config })
console.log('Payload DB schema synced.')
process.exit(0)
