import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import L from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup, Tooltip, useMap } from 'react-leaflet'
import 'leaflet-defaulticon-compatibility'

const HOTEL_POSITION: [number, number] = [28.961689, 83.801398]
const DEFAULT_ZOOM = 11

const hotelPinIcon = L.divIcon({
  html: `<div style="display:flex;flex-direction:column;align-items:center;transform:translateY(-100%);">
    <span style="background:#2c3e50;color:#f5efe6;font-family:Georgia,serif;font-weight:600;font-size:12px;padding:4px 8px;border-radius:6px;white-space:nowrap;box-shadow:0 2px 8px rgba(0,0,0,0.25);margin-bottom:4px;">Samar Annapurna Hotel</span>
    <span style="width:0;height:0;border-left:10px solid transparent;border-right:10px solid transparent;border-top:14px solid #2c3e50;"></span>
  </div>`,
  className: 'hotel-marker-pin',
  iconSize: [80, 44],
  iconAnchor: [40, 44],
})

function MapContent() {
  const map = useMap()
  const didCenter = useRef(false)
  useEffect(() => {
    if (didCenter.current) return
    didCenter.current = true
    map.setView(HOTEL_POSITION, DEFAULT_ZOOM)
  }, [map])
  useEffect(() => {
    const onZoomEnd = () => {
      map.setView(HOTEL_POSITION, map.getZoom(), { animate: true })
    }
    map.on('zoomend', onZoomEnd)
    return () => {
      map.off('zoomend', onZoomEnd)
    }
  }, [map])
  return null
}

export function LocationMap() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section id="location" className="scroll-mt-20 py-16 sm:py-24 bg-beige-light/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-deepblue mb-3">Location</h2>
          <p className="text-deepblue/80 max-w-2xl mx-auto">
            Samar Annapurna Hotel, Samar Village, Mustang Nepal
          </p>
        </motion.div>
        <motion.div
          className="rounded-2xl overflow-hidden border border-beige-dark/20 shadow-lg h-[400px] sm:h-[500px] min-h-[300px]"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          {mounted && (
            <MapContainer
              center={HOTEL_POSITION}
              zoom={DEFAULT_ZOOM}
              scrollWheelZoom
              dragging
              className="w-full h-full"
              style={{ height: '100%', width: '100%' }}
            >
              <MapContent />
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={HOTEL_POSITION} icon={hotelPinIcon}>
                <Popup>
                  <strong>Samar Annapurna Hotel</strong>
                  <br />
                  Annapurna Guest House, Samar
                  <br />
                  Samar, Chhusang 33100, Nepal
                  <br />
                  <small>Family-run Himalayan lodge in Mustang</small>
                </Popup>
              </Marker>
            </MapContainer>
          )}
        </motion.div>
      </div>
    </section>
  )
}
