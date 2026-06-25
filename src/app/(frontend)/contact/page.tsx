import Image from 'next/image'
import ContactForm from '../../../components/ContactForm'

export const metadata = { title: 'Contact' }

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-3xl mt-40 px-4 xl:px-0 mb-20">
      <div className="flex flex-col sm:flex-row gap-12 items-start">
        <div className="flex flex-col items-center sm:items-start gap-5 sm:w-80 shrink-0">
          <Image
            src="/headshot.jpg"
            alt="Ben Wittbrodt"
            width={288}
            height={288}
            className="w-72 h-72 object-cover rounded-2xl shadow-md"
          />
          <div>
            <h2 className="text-2xl font-bold">Ben Wittbrodt</h2>
            <p className="text-sm text-gray-500 mt-2 leading-relaxed">
              Have a question, collab idea, or just want to say hi? Fill out the form and I&apos;ll get
              back to you.
            </p>
            <div className="flex flex-col gap-1 mt-4 text-sm text-gray-500">
              <a href="mailto:ben@wittbrodt.me" className="hover:text-blue-700 transition-colors">
                ben@wittbrodt.me
              </a>
            </div>
          </div>
        </div>

        <div className="flex-1 w-full">
          <h2 className="text-3xl font-bold mb-6">
            Get in <span className="text-blue-700">Touch</span>
          </h2>
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
