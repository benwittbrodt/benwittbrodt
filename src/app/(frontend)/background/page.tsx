import { RichText } from '@payloadcms/richtext-lexical/react'
import { getPayload } from '../../../lib/payload'
import { mediaUrl } from '../../../lib/media'
import type { Media } from '../../../payload-types'

export const metadata = { title: 'Background' }

function formatMonthYear(d: string | null | undefined): string {
  if (!d) return 'Present'
  return new Date(d).toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'utc' })
}

export default async function BackgroundPage() {
  const payload = await getPayload()
  const bg = await payload.findGlobal({ slug: 'background', depth: 2 })

  return (
    <section className="mx-auto max-w-5xl mt-40 px-4 xl:px-0 mb-20">
      <h2 className="text-4xl font-bold mb-10">
        My <span className="text-blue-700">Background</span>
      </h2>

      {bg.professionalSummary && (
        <div className="prose prose-lg max-w-none text-gray-600 mb-10">
          <RichText data={bg.professionalSummary as any} />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-xl font-semibold text-gray-500 uppercase tracking-wide mb-4">
            Professional Experience
          </h3>

          {(bg.experience ?? []).map((exp, i) => {
            const logo = exp.companyLogo as Media | number | null | undefined
            const logoUrl = logo && typeof logo === 'object' ? mediaUrl(logo, 'small') : null
            return (
              <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                {logoUrl && (
                  <div className="flex justify-center items-center px-6 py-5 border-b border-gray-100 bg-white">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={logoUrl}
                      alt={exp.company}
                      className="max-h-14 max-w-xs object-contain"
                    />
                  </div>
                )}
                <div className="divide-y divide-gray-100">
                  {(exp.roles ?? []).map((role, j) => (
                    <div key={j} className={`px-6 py-5 ${j % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-3">
                        <h4 className="text-lg font-semibold">{role.jobTitle}</h4>
                        <span className="text-sm text-gray-500 whitespace-nowrap">
                          {formatMonthYear(role.startDate)} – {formatMonthYear(role.endDate)}
                        </span>
                      </div>
                      {role.jobDescription && (
                        <div className="prose prose-sm max-w-none text-gray-600">
                          <RichText data={role.jobDescription as any} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-500 uppercase tracking-wide mb-4">Education</h3>

          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <div className="flex justify-center items-center px-6 py-5 border-b border-gray-100 bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Michigan_tech_univ_husky_logo.png/500px-Michigan_tech_univ_husky_logo.png"
                alt="Michigan Tech"
                className="max-h-14 object-contain"
              />
            </div>
            <div className="px-6 py-5 bg-white border-b border-gray-100">
              <div className="flex flex-col gap-1 mb-3">
                <h4 className="text-base font-semibold">M.S. Material Science &amp; Engineering</h4>
                <span className="text-sm text-gray-500">December 2014</span>
              </div>
              <p className="text-sm text-gray-600">Michigan Technological University</p>
            </div>
            <div className="px-6 py-5 bg-gray-50">
              <div className="flex flex-col gap-1 mb-3">
                <h4 className="text-base font-semibold">B.S. Material Science &amp; Engineering</h4>
                <span className="text-sm text-gray-500">May 2013</span>
              </div>
              <p className="text-sm text-gray-600">Michigan Technological University</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
