import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'

const ROOM_OPTIONS = [
  'Standard Room',
  'Mountain View Deluxe',
  'Family Suite',
  'Twin Cozy',
  'Superior Double',
  'Heritage Room',
]

const schema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    phone: z.string().min(1, 'Phone / WhatsApp is required'),
    checkIn: z.string().min(1, 'Check-in date is required'),
    checkOut: z.string().min(1, 'Check-out date is required'),
    adults: z.coerce.number().min(1, 'At least 1 adult'),
    children: z.coerce.number().min(0).default(0),
    roomType: z.string().min(1, 'Choose a room type'),
    rooms: z.coerce.number().min(1, 'At least 1 room'),
    specialRequests: z.string().optional(),
  })
  .refine((d) => !d.checkIn || !d.checkOut || new Date(d.checkOut) > new Date(d.checkIn), {
    message: 'Check-out must be after check-in',
    path: ['checkOut'],
  })

type FormData = z.infer<typeof schema>

const getApiBase = () => {
  if (import.meta.env.DEV) return ''
  return window.location.origin
}

export function ReservationForm() {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { children: 0, adults: 1, rooms: 1 },
  })

  const onSubmit = async (data: FormData) => {
    setError(null)
    try {
      const url = `${getApiBase()}/api/reserve`
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          checkIn: data.checkIn,
          checkOut: data.checkOut,
          adults: data.adults,
          children: data.children,
          roomType: data.roomType,
          rooms: data.rooms,
          specialRequests: data.specialRequests ?? '',
        }),
      })
      const json = (await res.json().catch(() => ({}))) as { success?: boolean; error?: string }
      if (!res.ok || !json.success) throw new Error(json.error || 'Request failed')
      setSubmitted(true)
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Something went wrong.'
      const isDev = import.meta.env.DEV
      const looksLikeNoApi =
        msg.includes('fetch') ||
        msg.includes('Failed to fetch') ||
        msg.includes('NetworkError') ||
        msg.includes('Load failed')
      if (isDev && looksLikeNoApi) {
        setError(
          'Reservation API is not running. For local testing, run: npx vercel dev — then open the URL it shows and try again. Or test on the live site. Ensure Vercel env vars (SMTP_*, RECEIVER_EMAIL) are set for production.'
        )
      } else {
        setError(msg === 'Request failed' ? 'Something went wrong. Please try again or contact us directly.' : msg)
      }
    }
  }

  if (submitted) {
    return (
      <section id="reserve" className="scroll-mt-20 py-16 sm:py-24 bg-beige/20">
        <div className="max-w-xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl bg-white border border-terracotta/30 shadow-lg p-8"
          >
            <div className="text-4xl mb-4">✓</div>
            <h2 className="font-display font-bold text-2xl text-deepblue mb-2">Reservation request sent!</h2>
            <p className="text-deepblue/90 mb-4">
              We&apos;ll confirm soon – limited capacity. Direct family confirmation; we reply within 24h.
            </p>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section id="reserve" className="scroll-mt-20 py-16 sm:py-24 bg-beige/20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-deepblue mb-3">Reserve</h2>
          <p className="text-deepblue/80 mb-1">
            Send your reservation request. We reply within 24h – small lodge, family-run.
          </p>
          <p className="text-deepblue/70 text-sm italic">Direct family confirmation – limited capacity.</p>
        </motion.div>
        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-2xl bg-white border border-beige-dark/20 shadow-lg p-6 sm:p-8 space-y-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          {error && (
            <div className="rounded-lg bg-red-50 border border-red-200 text-red-800 text-sm p-3">
              {error}
            </div>
          )}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-deepblue mb-1">
                Name *
              </label>
              <input
                id="name"
                type="text"
                {...register('name')}
                className="w-full rounded-lg border border-beige-dark/30 px-3 py-2 text-deepblue focus:ring-2 focus:ring-terracotta/50 focus:border-terracotta"
              />
              {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-deepblue mb-1">
                Email *
              </label>
              <input
                id="email"
                type="email"
                {...register('email')}
                className="w-full rounded-lg border border-beige-dark/30 px-3 py-2 text-deepblue focus:ring-2 focus:ring-terracotta/50 focus:border-terracotta"
              />
              {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>}
            </div>
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-deepblue mb-1">
              Phone / WhatsApp *
            </label>
            <input
              id="phone"
              type="tel"
              {...register('phone')}
              placeholder="+977-98xxxxxxxx"
              className="w-full rounded-lg border border-beige-dark/30 px-3 py-2 text-deepblue focus:ring-2 focus:ring-terracotta/50 focus:border-terracotta"
            />
            {errors.phone && <p className="text-red-600 text-xs mt-1">{errors.phone.message}</p>}
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="checkIn" className="block text-sm font-medium text-deepblue mb-1">
                Check-in *
              </label>
              <input
                id="checkIn"
                type="date"
                {...register('checkIn')}
                className="w-full rounded-lg border border-beige-dark/30 px-3 py-2 text-deepblue focus:ring-2 focus:ring-terracotta/50 focus:border-terracotta"
              />
              {errors.checkIn && <p className="text-red-600 text-xs mt-1">{errors.checkIn.message}</p>}
            </div>
            <div>
              <label htmlFor="checkOut" className="block text-sm font-medium text-deepblue mb-1">
                Check-out *
              </label>
              <input
                id="checkOut"
                type="date"
                {...register('checkOut')}
                className="w-full rounded-lg border border-beige-dark/30 px-3 py-2 text-deepblue focus:ring-2 focus:ring-terracotta/50 focus:border-terracotta"
              />
              {errors.checkOut && <p className="text-red-600 text-xs mt-1">{errors.checkOut.message}</p>}
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="adults" className="block text-sm font-medium text-deepblue mb-1">
                Adults *
              </label>
              <input
                id="adults"
                type="number"
                min={1}
                {...register('adults')}
                className="w-full rounded-lg border border-beige-dark/30 px-3 py-2 text-deepblue focus:ring-2 focus:ring-terracotta/50 focus:border-terracotta"
              />
              {errors.adults && <p className="text-red-600 text-xs mt-1">{errors.adults.message}</p>}
            </div>
            <div>
              <label htmlFor="children" className="block text-sm font-medium text-deepblue mb-1">
                Children
              </label>
              <input
                id="children"
                type="number"
                min={0}
                {...register('children')}
                className="w-full rounded-lg border border-beige-dark/30 px-3 py-2 text-deepblue focus:ring-2 focus:ring-terracotta/50 focus:border-terracotta"
              />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="roomType" className="block text-sm font-medium text-deepblue mb-1">
                Room type *
              </label>
              <select
                id="roomType"
                {...register('roomType')}
                className="w-full rounded-lg border border-beige-dark/30 px-3 py-2 text-deepblue focus:ring-2 focus:ring-terracotta/50 focus:border-terracotta bg-white"
              >
                <option value="">Select</option>
                {ROOM_OPTIONS.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
              {errors.roomType && <p className="text-red-600 text-xs mt-1">{errors.roomType.message}</p>}
            </div>
            <div>
              <label htmlFor="rooms" className="block text-sm font-medium text-deepblue mb-1">
                Rooms needed *
              </label>
              <input
                id="rooms"
                type="number"
                min={1}
                {...register('rooms')}
                className="w-full rounded-lg border border-beige-dark/30 px-3 py-2 text-deepblue focus:ring-2 focus:ring-terracotta/50 focus:border-terracotta"
              />
              {errors.rooms && <p className="text-red-600 text-xs mt-1">{errors.rooms.message}</p>}
            </div>
          </div>
          <div>
            <label htmlFor="specialRequests" className="block text-sm font-medium text-deepblue mb-1">
              Special requests
            </label>
            <textarea
              id="specialRequests"
              rows={3}
              {...register('specialRequests')}
              className="w-full rounded-lg border border-beige-dark/30 px-3 py-2 text-deepblue focus:ring-2 focus:ring-terracotta/50 focus:border-terracotta resize-none"
              placeholder="Diet, accessibility, early check-in, etc."
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-terracotta hover:bg-terracotta-dark text-white font-medium py-3 px-4 disabled:opacity-60 transition-colors"
          >
            {isSubmitting ? 'Sending…' : 'Send reservation request'}
          </button>
          <p className="text-deepblue/70 text-xs text-center">
            Direct family confirmation – small lodge, we reply within 24h.
          </p>
        </motion.form>
      </div>
    </section>
  )
}
