// Social profiles shown on the home page. A link with an empty url is hidden, so add the Strava profile URL below.
export type Social = { id: 'linkedin' | 'instagram' | 'strava' | 'github'; label: string; url: string }

export const socials: Social[] = [
  { id: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/in/benwittbrodt/' },
  { id: 'instagram', label: 'Instagram', url: 'https://instagram.com/benwittbrodt' },
  { id: 'strava', label: 'Strava', url: 'https://www.strava.com/athletes/16771798' },
  { id: 'github', label: 'GitHub', url: 'https://github.com/benwittbrodt' },
]
