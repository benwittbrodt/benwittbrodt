/**
 * One-shot migration: Strapi at $STRAPI_URL -> local Payload (SQLite).
 *
 * Run with: npm run migrate:strapi
 *
 * Idempotent: detects existing records by slug (categories/tags/posts) and by
 * original filename (media). Safe to re-run.
 */

import 'dotenv/config'
import { Buffer } from 'node:buffer'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { getPayload } from 'payload'
import config from '../src/payload.config'
import { strapiBlocksToLexical, type StrapiNode } from './strapi-to-lexical'

const STRAPI_URL = required('STRAPI_URL')
const STRAPI_TOKEN = required('STRAPI_TOKEN')

function required(name: string): string {
  const v = process.env[name]
  if (!v) throw new Error(`Missing required env var: ${name}`)
  return v
}

type StrapiMedia = {
  id: number
  url: string
  name?: string
  alternativeText?: string | null
  mime?: string
  hash?: string
  ext?: string
}

type StrapiCategory = { id: number; Title: string; Description?: string; slug: string }
type StrapiTag = { id: number; Title: string; Slug: string }
type StrapiPost = {
  id: number
  Title: string
  Slug: string | null
  Content: StrapiNode[] | null
  FeaturedImage: StrapiMedia | null
  PreviewText: string | null
  category: StrapiCategory | null
  tags: StrapiTag[]
  publishedAt: string
  createdAt: string
}
type StrapiRole = {
  id: number
  JobTitle: string
  JobDescription: StrapiNode[]
  StartDate: string
  EndDate: string | null
}
type StrapiExperience = { id: number; Company: string; Role: StrapiRole[]; CompanyLogo: StrapiMedia | null }
type StrapiBackground = {
  id: number
  ProfessionalSummary: StrapiNode[]
  Experience: StrapiExperience[]
}

async function strapiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${STRAPI_URL}${path}`, {
    headers: { Authorization: `Bearer ${STRAPI_TOKEN}` },
  })
  if (!res.ok) throw new Error(`Strapi ${res.status} ${path}: ${await res.text()}`)
  const json = (await res.json()) as { data: T }
  return json.data
}

async function strapiFetchAll<T>(base: string, populate: string): Promise<T[]> {
  const pageSize = 100
  let page = 1
  const out: T[] = []
  while (true) {
    const path = `${base}?pagination%5Bpage%5D=${page}&pagination%5BpageSize%5D=${pageSize}&${populate}`
    const res = await fetch(`${STRAPI_URL}${path}`, {
      headers: { Authorization: `Bearer ${STRAPI_TOKEN}` },
    })
    if (!res.ok) throw new Error(`Strapi ${res.status} ${path}: ${await res.text()}`)
    const json = (await res.json()) as {
      data: T[]
      meta?: { pagination?: { page: number; pageCount: number } }
    }
    out.push(...(json.data ?? []))
    const pc = json.meta?.pagination?.pageCount ?? 1
    if (page >= pc) break
    page++
  }
  return out
}

async function mediaUrl(rel: string): Promise<string> {
  return rel.startsWith('http') ? rel : `${STRAPI_URL}${rel}`
}

async function downloadBuffer(url: string): Promise<{ data: Buffer; mime: string }> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Download ${res.status}: ${url}`)
  const mime = res.headers.get('content-type') || 'application/octet-stream'
  const ab = await res.arrayBuffer()
  return { data: Buffer.from(ab), mime }
}

async function main() {
  const payload = await getPayload({ config })

  // ---- 1. MEDIA --------------------------------------------------------
  const mediaIdMap = new Map<number, number>() // strapi id -> payload id

  // Strapi exposes uploads via /api/upload/files (plain REST, not the data API)
  const strapiMedia = (await fetch(`${STRAPI_URL}/api/upload/files`, {
    headers: { Authorization: `Bearer ${STRAPI_TOKEN}` },
  }).then(async (r) => {
    if (!r.ok) throw new Error(`Upload list ${r.status}: ${await r.text()}`)
    return (await r.json()) as StrapiMedia[]
  })) ?? []

  console.log(`[media] Strapi has ${strapiMedia.length} files`)

  for (const m of strapiMedia) {
    const filename = m.name ?? path.basename(m.url)
    const existing = await payload.find({
      collection: 'media',
      where: { filename: { equals: filename } },
      limit: 1,
    })
    if (existing.totalDocs > 0) {
      mediaIdMap.set(m.id, existing.docs[0].id as number)
      console.log(`[media] skip existing ${filename}`)
      continue
    }
    const url = await mediaUrl(m.url)
    const { data, mime } = await downloadBuffer(url)
    const created = await payload.create({
      collection: 'media',
      data: { alt: m.alternativeText ?? '' },
      file: { data, mimetype: m.mime ?? mime, name: filename, size: data.byteLength },
    })
    mediaIdMap.set(m.id, created.id as number)
    console.log(`[media] uploaded ${filename} -> ${created.id}`)
  }

  // ---- 2. CATEGORIES ----------------------------------------------------
  const categoryIdMap = new Map<number, number>()
  const strapiCategories = await strapiFetchAll<StrapiCategory>('/api/categories', '')
  for (const c of strapiCategories) {
    const existing = await payload.find({
      collection: 'categories',
      where: { slug: { equals: c.slug } },
      limit: 1,
    })
    if (existing.totalDocs > 0) {
      categoryIdMap.set(c.id, existing.docs[0].id as number)
      continue
    }
    const created = await payload.create({
      collection: 'categories',
      data: { title: c.Title, slug: c.slug, description: c.Description },
    })
    categoryIdMap.set(c.id, created.id as number)
    console.log(`[cat]   created ${c.slug}`)
  }

  // ---- 3. TAGS ----------------------------------------------------------
  const tagIdMap = new Map<number, number>()
  const strapiTags = await strapiFetchAll<StrapiTag>('/api/tags', '')
  for (const t of strapiTags) {
    const existing = await payload.find({
      collection: 'tags',
      where: { slug: { equals: t.Slug } },
      limit: 1,
    })
    if (existing.totalDocs > 0) {
      tagIdMap.set(t.id, existing.docs[0].id as number)
      continue
    }
    const created = await payload.create({
      collection: 'tags',
      data: { title: t.Title, slug: t.Slug },
    })
    tagIdMap.set(t.id, created.id as number)
    console.log(`[tag]   created ${t.Slug}`)
  }

  // ---- 4. POSTS ---------------------------------------------------------
  const strapiPosts = await strapiFetchAll<StrapiPost>(
    '/api/posts',
    'populate%5B0%5D=FeaturedImage&populate%5B1%5D=category&populate%5B2%5D=tags',
  )
  for (const p of strapiPosts) {
    const slug = p.Slug ?? `post-${p.id}`
    const existing = await payload.find({
      collection: 'posts',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    if (existing.totalDocs > 0) {
      console.log(`[post]  skip existing ${slug}`)
      continue
    }
    const created = await payload.create({
      collection: 'posts',
      data: {
        title: p.Title,
        slug,
        previewText: p.PreviewText ?? undefined,
        featuredImage: p.FeaturedImage ? mediaIdMap.get(p.FeaturedImage.id) ?? undefined : undefined,
        category: p.category ? categoryIdMap.get(p.category.id) ?? undefined : undefined,
        tags: (p.tags ?? []).map((t) => tagIdMap.get(t.id)).filter((v): v is number => typeof v === 'number'),
        content: strapiBlocksToLexical(p.Content),
        publishedAt: p.publishedAt,
        _status: 'published',
      } as any,
    })
    console.log(`[post]  created ${slug} -> ${created.id}`)
  }

  // ---- 5. BACKGROUND (global) ------------------------------------------
  const background = await strapiGet<StrapiBackground>(
    '/api/background?populate%5BExperience%5D%5Bpopulate%5D=%2A',
  )
  await payload.updateGlobal({
    slug: 'background',
    data: {
      professionalSummary: strapiBlocksToLexical(background.ProfessionalSummary),
      experience: background.Experience.map((e) => ({
        company: e.Company,
        companyLogo: e.CompanyLogo ? mediaIdMap.get(e.CompanyLogo.id) ?? undefined : undefined,
        roles: (e.Role ?? []).map((r) => ({
          jobTitle: r.JobTitle,
          jobDescription: strapiBlocksToLexical(r.JobDescription),
          startDate: r.StartDate,
          endDate: r.EndDate ?? undefined,
        })),
      })),
    } as any,
  })
  console.log(`[bg]    updated background global`)

  console.log('\nMigration complete.')
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
