import { motion } from 'framer-motion'

const OUR_STORY_IMG = '/NilgiriSamar.jpg'

export function About() {
  return (
    <section id="about" className="scroll-mt-20 py-16 sm:py-24 bg-beige-light/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.figure
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3] max-h-[400px]"
          >
            <img
              src={OUR_STORY_IMG}
              alt="Mt. Nilgiri view from Samar Annapurna Hotel"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <figcaption className="absolute bottom-0 left-0 right-0 bg-deepblue/85 text-beige-light text-sm font-medium py-2 px-4 text-center">
              Mt. Nilgiri view from Samar Annapurna Hotel
            </figcaption>
          </motion.figure>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-deepblue mb-4">
              Our story
            </h2>
            <p className="text-deepblue/90 mb-4 leading-relaxed">
              Samar Annapurna Hotel – also known to past and present guests as Annapurna Guest House,
              Samar – was officially started by our family in the 90s and is one of the oldest
              lodges in Upper Mustang. For decades we have welcomed trekkers and travelers with warm
              hospitality, backyard streams, and uninterrupted views of 7000m+ peaks including Mt.
              Nilgiri and Annapurna. We are a small, family-run lodge at the heart of the region,
              and our loyal guests keep coming back.
            </p>
            <p className="text-deepblue/90 mb-4 leading-relaxed">
              We believe in sustainable, intimate hospitality and pride ourselves on serving our
              guests with the finest care – homestyle meals, a peaceful setting, and a place where
              every visitor becomes part of the family. In growing season, fresh organic apples and
              vegetables from our family garden go straight into our dishes. We run this lodge with
              heart, culture, and respect for the land we call home. Our high Google ratings and
              the many travel blogs that have featured us reflect the trust and warmth that
              generations of guests have found here.
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-terracotta/15 text-terracotta-dark font-medium">
                Since the 90s
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-saffron/15 text-saffron-dark font-medium">
                Family-run
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-deepblue/10 text-deepblue font-medium">
                One of the oldest in Upper Mustang
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-terracotta/15 text-terracotta-dark font-medium">
                Warm hospitality
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
