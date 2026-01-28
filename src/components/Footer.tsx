import { Link } from 'react-router-dom'

const QUICK_LINKS = [
  { to: '/#about', label: 'About' },
  { to: '/#testimonials', label: 'Reviews' },
  { to: '/#rooms', label: 'Rooms' },
  { to: '/#location', label: 'Location' },
  { to: '/#reserve', label: 'Reserve' },
  { to: '/#contact', label: 'Contact' },
]

export function Footer() {
  return (
    <footer id="contact" className="relative mt-auto text-beige-light overflow-hidden bg-deepblue scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12 py-14 sm:py-16 text-center sm:text-left">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1 flex flex-col items-center sm:items-start">
            <h3 className="font-display font-semibold text-lg text-beige tracking-tight mb-4 transition-colors duration-300">
              Samar Annapurna Hotel
            </h3>
            <p className="text-beige-light/90 text-sm leading-relaxed max-w-xs transition-colors duration-300">
              Since the 90s, family-run with heart in Mustang, Nepal. Annapurna Guest House, Samar – where Himalayan warmth meets genuine hospitality.
            </p>
          </div>

          {/* Quick links */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="font-display font-semibold text-lg text-beige tracking-tight mb-4 transition-colors duration-300">
              Quick links
            </h3>
            <ul className="flex flex-col gap-3 items-center sm:items-start">
              {QUICK_LINKS.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-beige-light/90 hover:text-saffron text-sm transition-colors duration-300 ease-out inline-block"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="font-display font-semibold text-lg text-beige tracking-tight mb-4 transition-colors duration-300">
              Contact
            </h3>
            <address className="not-italic flex flex-col gap-3 text-beige-light/90 text-sm leading-relaxed items-center sm:items-start">
              <span className="transition-colors duration-300">Samar, Chhusang 33100, Nepal</span>
              <a
                href="mailto:samarannapurnahotel@gmail.com"
                className="hover:text-saffron transition-colors duration-300 ease-out"
              >
                samarannapurnahotel@gmail.com
              </a>
              <span className="flex flex-col gap-0.5">
                <span className="text-beige-light/70 text-xs">WhatsApp / Phone (same number)</span>
                <a
                  href="tel:+9779841345621"
                  className="hover:text-saffron transition-colors duration-300 ease-out w-fit"
                >
                  +977-9841345621
                </a>
              </span>
            </address>
          </div>
        </div>

        <div
          className="border-t border-beige/20 py-5 text-center text-beige-light/60 text-sm transition-colors duration-300 space-y-1"
          role="contentinfo"
        >
          <p>© {new Date().getFullYear()} Samar Annapurna Hotel. Family-run with heart in Mustang, Nepal.</p>
          <p>
            Designed and developed by{' '}
            <a
              href="https://yartung.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-beige-light/95 hover:text-saffron transition-colors duration-300 ease-out"
            >
              Yartung
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
