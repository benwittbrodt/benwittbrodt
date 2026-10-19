import { FaGithub, FaInstagram, FaLinkedin, FaStrava } from 'react-icons/fa6'
import { socials, type Social } from '../lib/socials'

const icons: Record<Social['id'], React.ComponentType<{ className?: string; 'aria-hidden'?: boolean }>> = {
  linkedin: FaLinkedin,
  instagram: FaInstagram,
  strava: FaStrava,
  github: FaGithub,
}

export default function SocialLinks({ className = '' }: { className?: string }) {
  const visible = socials.filter((s) => s.url)
  if (visible.length === 0) return null
  return (
    <ul className={`flex items-center gap-4 ${className}`}>
      {visible.map(({ id, label, url }) => {
        const Icon = icons[id]
        return (
          <li key={id}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              title={label}
              className="block text-gray-500 hover:text-blue-700 transition-colors"
            >
              <Icon className="w-6 h-6" aria-hidden />
            </a>
          </li>
        )
      })}
    </ul>
  )
}
