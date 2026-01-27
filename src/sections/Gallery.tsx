import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const GALLERY_FILES = [
  'Gallery (1).JPG',
  'Gallery (1).PNG',
  'Gallery (2).PNG',
  'Gallery (3).PNG',
  'Gallery (4).PNG',
  'Gallery (5).PNG',
  'Gallery (6).PNG',
  'Gallery (7).PNG',
  'Gallery (8).PNG',
  'Gallery (9).PNG',
  'Gallery (10).JPG',
  'Gallery (11).PNG',
  'Gallery (12).PNG',
]

const GALLERY_IMAGES = GALLERY_FILES.map((file, i) => ({
  id: i + 1,
  src: encodeURI(`/${file}`),
  alt: `Samar Annapurna Hotel gallery`,
}))

export function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null)

  return (
    <section id="gallery" className="scroll-mt-20 py-16 sm:py-24 bg-beige/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-deepblue mb-3">Gallery</h2>
          <p className="text-deepblue/80 max-w-2xl mx-auto">
            Rooms, streams, peaks, and the warmth of our family-run lodge in Mustang.
          </p>
        </motion.div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {GALLERY_IMAGES.map((img, i) => (
            <motion.button
              key={img.id}
              type="button"
              className="relative aspect-square rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-terracotta focus:ring-offset-2"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.02 }}
              onClick={() => setLightbox(img.id)}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </motion.button>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            key={lightbox}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <button
              type="button"
              aria-label="Close"
              className="absolute top-4 right-4 z-10 text-white p-2 hover:bg-white/10 rounded-full"
              onClick={() => setLightbox(null)}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <motion.img
              src={GALLERY_IMAGES.find((x) => x.id === lightbox)?.src}
              alt={GALLERY_IMAGES.find((x) => x.id === lightbox)?.alt ?? 'Gallery'}
              className="max-w-full max-h-[90vh] object-contain rounded"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
