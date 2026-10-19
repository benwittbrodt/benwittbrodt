'use client'

import { RefreshRouteOnSave } from '@payloadcms/live-preview-react'
import { useRouter } from 'next/navigation'

// Re-renders the draft preview whenever the admin saves a draft or publishes (Live Preview iframe or the Preview tab).
export default function PreviewRefresh() {
  const router = useRouter()
  return (
    <RefreshRouteOnSave
      refresh={() => router.refresh()}
      serverURL={typeof window === 'undefined' ? '' : window.location.origin}
    />
  )
}
