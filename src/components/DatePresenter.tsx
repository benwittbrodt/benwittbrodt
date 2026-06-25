export default function DatePresenter({ date }: { date: string | Date | null | undefined }) {
  if (!date) return null
  const d = date instanceof Date ? date : new Date(date)
  return (
    <time dateTime={d.toISOString()}>
      {d.toLocaleDateString('en-CA', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        timeZone: 'utc',
      })}
    </time>
  )
}
