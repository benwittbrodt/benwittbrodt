export type ActivityEmbed = { provider: 'garmin' | 'strava'; id: string }

// Accepts whatever the "Share / Embed" dialogs hand out: a Garmin Connect iframe or activity link, or a
// Strava embed snippet or activity link. Only the numeric activity id is kept, so the page never renders pasted HTML.
export function parseActivityEmbed(input: unknown): ActivityEmbed | null {
  if (typeof input !== 'string') return null
  const text = input.trim()
  if (!text) return null

  const garmin = text.match(/connect\.garmin\.com\/(?:embed\/activity|modern\/activity)\/(\d+)/i)
  if (garmin) return { provider: 'garmin', id: garmin[1] }

  // Strava's snippet is a placeholder div: <div class="strava-embed-placeholder" data-embed-type="activity" data-embed-id="123">
  const embedType = text.match(/data-embed-type=["']([a-z]+)["']/i)?.[1]
  if (embedType && embedType !== 'activity') return null
  const strava =
    text.match(/data-embed-id=["'](\d+)["']/i) ??
    text.match(/strava-embeds\.com\/activity\/(\d+)/i) ??
    text.match(/strava\.com\/(?:activities|embed\/activity)\/(\d+)/i)
  if (strava) return { provider: 'strava', id: strava[1] }

  return null
}
