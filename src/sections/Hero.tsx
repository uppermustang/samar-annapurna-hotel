import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const HERO_IMAGE = '/SamarAnnapurnaHotel.jpg'

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.12,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={HERO_IMAGE}
          alt="Samar Annapurna Hotel, Himalayan lodge in Mustang Nepal"
          className="w-full h-full object-cover object-center will-change-transform"
          fetchpriority="high"
          decoding="async"
          loading="eager"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-deepblue/40 via-deepblue/58 to-deepblue/75"
          aria-hidden
        />
      </div>
      <div className="relative z-10 w-full max-w-4xl mx-auto px-5 sm:px-8 md:px-10 py-12 sm:py-16 text-center">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          <motion.h1
            variants={item}
            className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.1] mb-4 sm:mb-5 drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]"
          >
            Escape to Serenity
          </motion.h1>
          <motion.p
            variants={item}
            className="text-lg sm:text-xl md:text-2xl text-beige-light font-medium mb-3 max-w-2xl mx-auto drop-shadow-[0_1px_8px_rgba(0,0,0,0.3)]"
          >
            Since the 90s – Family-Run Samar Annapurna Hotel in Mustang, Nepal
          </motion.p>
          <motion.p
            variants={item}
            className="text-base sm:text-lg text-beige-light/95 max-w-2xl mx-auto mb-10 sm:mb-12 leading-relaxed drop-shadow-[0_1px_6px_rgba(0,0,0,0.25)]"
          >
            Backyard streams, a green camping area in the garden, and epic views of Mt. Nilgiri, Thorang La Himal, Annapurna, the Mosaic Hills, and other peaks. Authentic hospitality in the heart of Upper Mustang.
          </motion.p>
          <motion.div
            variants={item}
            className="flex flex-wrap gap-4 sm:gap-5 justify-center items-center"
          >
            <Link
              to="/#reserve"
              onClick={(e) => {
                e.preventDefault()
                scrollToId('reserve')
                window.history.pushState(null, '', '/#reserve')
              }}
              className="inline-flex items-center justify-center min-w-[160px] sm:min-w-[180px] px-7 sm:px-8 py-3.5 sm:py-4 text-base font-semibold rounded-xl bg-terracotta hover:bg-terracotta-dark text-white shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 ease-out"
            >
              Reserve Now
            </Link>
            <Link
              to="/#about"
              onClick={(e) => {
                e.preventDefault()
                scrollToId('about')
                window.history.pushState(null, '', '/#about')
              }}
              className="inline-flex items-center justify-center min-w-[160px] sm:min-w-[180px] px-7 sm:px-8 py-3.5 sm:py-4 text-base font-semibold rounded-xl bg-white/12 hover:bg-white/22 text-white border-2 border-white/35 hover:border-white/50 backdrop-blur-sm hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 ease-out shadow-[0_2px_12px_rgba(0,0,0,0.15)]"
            >
              Discover More
            </Link>
          </motion.div>
        </motion.div>
      </div>
      <motion.a
        href="#about"
        aria-label="Scroll down"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-white/90 hover:text-white transition-colors duration-300"
        initial={{ opacity: 0, y: -8 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { delay: 0.8, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
        }}
        whileHover={{ y: 4 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex justify-center drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.span>
      </motion.a>
    </section>
  )
}
