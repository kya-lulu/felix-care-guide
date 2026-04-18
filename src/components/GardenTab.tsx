import React from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Droplets, Camera } from 'lucide-react'
import { WarningBox } from './WarningBox'

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
}

function TerraceDiagram() {
  return (
    <svg viewBox="0 0 320 420" className="w-full max-w-xs mx-auto" aria-label="Tamlin Farm terrace layout diagram">
      <rect x="80" y="8" width="160" height="44" rx="6" fill="#2d4a35" />
      <text x="160" y="28" textAnchor="middle" fill="white" fontSize="11" fontFamily="serif" fontWeight="bold">HOUSE</text>
      <text x="160" y="44" textAnchor="middle" fill="#a8c4b0" fontSize="9" fontFamily="monospace">(northwest / uphill)</text>
      <line x1="10" y1="60" x2="310" y2="60" stroke="#2d4a35" strokeWidth="2" strokeDasharray="4 2" />
      <rect x="10" y="64" width="230" height="56" rx="4" fill="#3d6b4a" />
      <text x="20" y="84" fill="white" fontSize="12" fontFamily="serif" fontWeight="bold">T1</text>
      <text x="20" y="99" fill="#c8e0ce" fontSize="9" fontFamily="sans-serif">Snap peas · beans · borage</text>
      <text x="20" y="112" fill="#c8e0ce" fontSize="9" fontFamily="sans-serif">strawberries · chamomile · rosemary</text>
      <rect x="248" y="64" width="62" height="196" rx="4" fill="#1e3a28" />
      <text x="279" y="120" textAnchor="middle" fill="#7bc8a4" fontSize="8" fontFamily="sans-serif" transform="rotate(-90, 279, 120)">NE FENCE — NEW BLUEBERRIES ★</text>
      <line x1="10" y1="122" x2="245" y2="122" stroke="#2d4a35" strokeWidth="2" strokeDasharray="4 2" />
      <rect x="10" y="126" width="230" height="60" rx="4" fill="#4a7a57" />
      <rect x="10" y="126" width="4" height="60" rx="2" fill="#c4704f" />
      <text x="22" y="147" fill="white" fontSize="12" fontFamily="serif" fontWeight="bold">T2 ★ Priority</text>
      <text x="22" y="162" fill="#d4ead9" fontSize="9" fontFamily="sans-serif">Kale · chard · arugula · bok choy</text>
      <text x="22" y="176" fill="#d4ead9" fontSize="9" fontFamily="sans-serif">raspberry · lavender · brassicas</text>
      <line x1="10" y1="188" x2="245" y2="188" stroke="#2d4a35" strokeWidth="2" strokeDasharray="4 2" />
      <rect x="10" y="192" width="230" height="54" rx="4" fill="#5a8a67" />
      <text x="20" y="212" fill="white" fontSize="12" fontFamily="serif" fontWeight="bold">T3</text>
      <text x="20" y="227" fill="#d4ead9" fontSize="9" fontFamily="sans-serif">Native pollinators · Toro blueberry</text>
      <text x="20" y="240" fill="#d4ead9" fontSize="9" fontFamily="sans-serif">goldenrod · yarrow · plum trees</text>
      <line x1="10" y1="248" x2="245" y2="248" stroke="#2d4a35" strokeWidth="2" strokeDasharray="4 2" />
      <rect x="10" y="252" width="230" height="56" rx="4" fill="#6a9a77" />
      <text x="20" y="272" fill="white" fontSize="12" fontFamily="serif" fontWeight="bold">T4 — Photo Zone</text>
      <text x="20" y="287" fill="#d4ead9" fontSize="9" fontFamily="sans-serif">Bok choy · lavender · chamomile · mint</text>
      <text x="20" y="300" fill="#f0c4b0" fontSize="9" fontFamily="sans-serif">Send photo from here each morning</text>
      <rect x="10" y="316" width="300" height="28" rx="4" fill="#e8f0e8" />
      <text x="160" y="333" textAnchor="middle" fill="#4a7a57" fontSize="10" fontFamily="sans-serif">Lawn</text>
      <rect x="10" y="352" width="300" height="28" rx="4" fill="#d4c8b8" />
      <text x="160" y="368" textAnchor="middle" fill="#6b5d4d" fontSize="10" fontFamily="sans-serif">Street (southeast / downhill)</text>
      <text x="290" y="16" fill="#2d4a35" fontSize="9" fontFamily="monospace">NW</text>
      <text x="290" y="378" fill="#2d4a35" fontSize="9" fontFamily="monospace">SE</text>
    </svg>
  )
}

function WateringSteps() {
  const steps = [
    { n: 1, text: 'Fill the gallon watering can at the outdoor tap' },
    { n: 2, text: 'Water T2 greens bed — priority (kale, chard, arugula, bok choy)' },
    { n: 3, text: 'Water T2 right veg bed (brassicas, cauliflower)' },
    { n: 4, text: 'Water T4 center bed (bok choy, lavender)' },
    { n: 5, text: 'If water remains → T1 sunny edibles (snap peas, beans, new starts)' },
    { n: 6, text: 'Refill can if needed — you may need 2 fills total' },
    { n: 7, text: 'Separately: water NE fence blueberries at root ball — daily, regardless of rain (critical)' },
  ]
  return (
    <div className="bg-card rounded-xl border border-border p-4 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Droplets className="w-5 h-5 text-primary" />
        <h3 className="font-serif text-lg font-semibold text-primary">How to Water</h3>
        <span className="font-mono text-xs text-text-muted ml-auto">skip if it rained</span>
      </div>
      <ol className="space-y-3">
        {steps.map((s) => (
          <li key={s.n} className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-card text-xs font-mono font-bold flex items-center justify-center mt-0.5">{s.n}</span>
            <p className="font-sans text-sm text-text leading-snug">{s.text}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}

export function GardenTab() {
  return (
    <div className="pb-32 pt-6 px-4 max-w-md mx-auto">
      <header className="mb-6 text-center flex flex-col items-center">
        <h1 className="font-serif text-4xl font-bold text-primary mb-4">Tamlin Farm Garden</h1>
        <a
          href="https://tamlinfarm.org"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-accent text-white px-5 py-2.5 rounded-full font-sans font-medium hover:bg-accent/90 transition-colors min-h-[44px]"
        >
          Open tamlinfarm.org <ExternalLink className="w-4 h-4" />
        </a>
      </header>

      <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-4">
        <motion.div variants={itemVariants}>
          <div className="bg-card rounded-xl border border-border p-4">
            <h3 className="font-serif text-lg font-semibold text-primary mb-3 text-center">Farm Layout</h3>
            <TerraceDiagram />
            <p className="font-sans text-xs text-text-muted text-center mt-3">House at top (uphill) → Street at bottom (downhill)</p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <WateringSteps />
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="bg-card rounded-xl border border-border p-4">
            <div className="flex items-center gap-2 mb-3">
              <Camera className="w-5 h-5 text-accent" />
              <h3 className="font-serif text-lg font-semibold text-primary">Photo Check-In</h3>
            </div>
            <p className="font-sans text-sm text-text leading-relaxed">Each morning, send Terry a photo from <strong>T4</strong> — the bottom terrace near the street.</p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <WarningBox type="warning">Japanese knotweed at lawn edge — cut every 2–3 weeks, NEVER dig (King County noxious weed)</WarningBox>
        </motion.div>

        <motion.div variants={itemVariants}>
          <WarningBox type="info">tamlinfarm.org is always the source of truth for current plant locations</WarningBox>
        </motion.div>
      </motion.div>
    </div>
  )
}
