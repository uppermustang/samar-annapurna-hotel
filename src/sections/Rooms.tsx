import { motion } from 'framer-motion'

// Room types from images uploaded to public (names and captions from filenames)
const ROOMS = [
  {
    id: 1,
    name: 'Standard Room',
    caption: 'Standard Room',
    description: 'Cozy accommodation with traditional decor and warm interiors. Perfect for solo travellers or couples.',
    image: 'Standard Room.png',
    priceNote: 'Based on contact through reservation or phone',
    views: 'Garden / courtyard',
  },
  {
    id: 2,
    name: 'Double Bed with Mountain View',
    caption: 'Double Bed with Mountain View',
    description: 'Double bed with direct views of the Himalayan peaks. Warm, welcoming space for couples.',
    image: 'Double Bed with Mountain View.png',
    priceNote: 'Based on contact through reservation or phone',
    views: 'Mountain',
  },
  {
    id: 3,
    name: 'Mountain View Deluxe',
    caption: 'Mountain View Deluxe',
    description: 'Spacious room with direct views of Mt. Nilgiri and Annapurna massif. Private seating area.',
    image: 'Mountain View Deluxe.jpg',
    priceNote: 'Based on contact through reservation or phone',
    views: '7000m+ peaks',
  },
  {
    id: 4,
    name: 'Family Suite',
    caption: 'Family Suite',
    description: 'Two interconnected rooms, ideal for families. Traditional Tibetan-Nepali touches.',
    image: 'Family Suite.jpg',
    priceNote: 'Based on contact through reservation or phone',
    views: 'Mountain & courtyard',
  },
  {
    id: 5,
    name: 'Garden Camping with Mountain View',
    caption: 'Garden Camping with Mountain View',
    description: 'Camp under the stars with mountain vistas. Our garden camping spot combines comfort and nature.',
    image: 'Garden Camping with  Mountain View.jpg',
    priceNote: 'Based on contact through reservation or phone',
    views: 'Garden & mountain',
  },
  {
    id: 6,
    name: 'Superior Room with Balcony and Mountain View',
    caption: 'Superior Room with Balcony and Mountain View',
    description: 'Larger room with private balcony and sweeping mountain views. Extra seating and traditional rugs.',
    image: 'Superior Room with Balcony and Mountain View.jpg',
    priceNote: 'Based on contact through reservation or phone',
    views: 'Balcony, 7000m+ peaks',
  },
]

export function Rooms() {
  return (
    <section id="rooms" className="scroll-mt-20 py-16 sm:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-deepblue mb-3">Rooms</h2>
          <p className="text-deepblue/80 max-w-2xl mx-auto">
            Cozy accommodations across four traditional buildings. All rooms feature warm decor,
            clean linens, and a touch of Himalayan hospitality.
          </p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {ROOMS.map((room, i) => (
            <motion.article
              key={room.id}
              className="rounded-2xl overflow-hidden bg-beige-light/40 shadow-md hover:shadow-xl transition-shadow border border-beige-dark/10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <figure className="m-0">
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={`/${encodeURI(room.image)}`}
                    alt={room.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <figcaption className="absolute bottom-0 left-0 right-0 bg-deepblue/85 text-beige-light text-sm font-medium py-2 px-4 text-center">
                    {room.caption}
                  </figcaption>
                </div>
              </figure>
              <div className="p-5">
                <h3 className="font-display font-semibold text-xl text-deepblue mb-2">{room.name}</h3>
                <p className="text-deepblue/85 text-sm leading-relaxed mb-3">{room.description}</p>
                <p className="text-saffron-dark/90 text-xs mb-2">View: {room.views}</p>
                <p className="text-deepblue/70 text-xs italic">Price: {room.priceNote}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
