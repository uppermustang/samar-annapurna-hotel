import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/#about', label: 'About' },
  { to: '/#testimonials', label: 'Reviews' },
  { to: '/#rooms', label: 'Rooms' },
  { to: '/#gallery', label: 'Gallery' },
  { to: '/#experiences', label: 'Experiences' },
  { to: '/#location', label: 'Location' },
  { to: '/#reserve', label: 'Reserve' },
  { to: '/#contact', label: 'Contact' },
]

const SCROLL_THRESHOLD = 8

function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > SCROLL_THRESHOLD)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, to: string) => {
    setMobileOpen(false)
    if (to === '/') {
      scrollToTop()
      return
    }
    const match = to.match(/^\/#(.+)$/)
    if (match) {
      e.preventDefault()
      scrollToSection(match[1])
      window.history.pushState(null, '', to)
    }
  }

  const linkBase =
    'transition-colors duration-300 ease-out text-sm font-medium'
  const linkScrolled = 'text-deepblue/90 hover:text-terracotta'
  const linkOverHero =
    'text-white/95 hover:text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]'

  const logoScrolled = 'font-display font-semibold text-deepblue text-lg md:text-xl'
  const logoOverHero =
    'font-display font-semibold text-white text-lg md:text-xl drop-shadow-[0_1px_6px_rgba(0,0,0,0.45)]'

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color] duration-300 ease-out ${
        isScrolled
          ? 'bg-beige/95 backdrop-blur-sm border-b border-beige-dark/20'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 md:h-18">
        <Link
          to="/"
          onClick={() => {
            setMobileOpen(false)
            scrollToTop()
          }}
          className={`transition-colors duration-300 ease-out ${isScrolled ? logoScrolled : logoOverHero} cursor-pointer`}
        >
          Samar Annapurna Hotel
        </Link>
        <ul className="hidden md:flex items-center gap-6 lg:gap-8">
          {NAV_LINKS.map(({ to, label }) => (
            <li key={to}>
              <Link
                to={to}
                onClick={(e) => handleLinkClick(e, to)}
                className={`${linkBase} ${isScrolled ? linkScrolled : linkOverHero} cursor-pointer`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          className={`md:hidden p-2.5 rounded-lg transition-colors duration-300 ease-out ${
            isScrolled ? 'text-deepblue hover:bg-beige-dark/20' : 'text-white hover:bg-white/10 drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]'
          }`}
          onClick={() => setMobileOpen((o) => !o)}
        >
          {mobileOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="md:hidden overflow-hidden bg-deepblue border-t border-beige/30 shadow-lg"
          >
            <ul className="px-4 py-4 flex flex-col gap-1">
              {NAV_LINKS.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    onClick={(e) => handleLinkClick(e, to)}
                    className="block py-3 px-3 text-beige-light hover:text-white font-medium rounded-lg hover:bg-white/10 transition-colors duration-200 cursor-pointer"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
