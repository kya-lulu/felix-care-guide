import React from 'react'
import { motion } from 'framer-motion'
import { Fish, AlertTriangle } from 'lucide-react'
import { TankCard } from './TankCard'
import { WarningBox } from './WarningBox'

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
}

function FlakeIllustration() {
  return (
    <svg viewBox="0 0 200 80" className="w-full max-w-[200px] mx-auto" aria-label="Pinch of flakes — about the same amount as a pinch of salt">
      {/* Fingertips */}
      <ellipse cx="70" cy="22" rx="20" ry="10" fill="#f4c895" stroke="#2d4a35" strokeWidth="1" />
      <ellipse cx="130" cy="22" rx="20" ry="10" fill="#f4c895" stroke="#2d4a35" strokeWidth="1" />
      {/* Pinch gap between fingers */}
      <path d="M 88 30 L 100 36 L 112 30" stroke="#2d4a35" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      {/* Flakes falling */}
      <circle cx="98" cy="44" r="1.5" fill="#8B6F47" />
      <circle cx="102" cy="48" r="1.8" fill="#a8865a" />
      <circle cx="96" cy="52" r="1.3" fill="#8B6F47" />
      <circle cx="104" cy="56" r="1.5" fill="#a8865a" />
      <circle cx="100" cy="60" r="1.2" fill="#8B6F47" />
      <circle cx="98" cy="64" r="1.4" fill="#a8865a" />
      <circle cx="102" cy="68" r="1.3" fill="#8B6F47" />
      <text x="100" y="78" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#6b6b6b">≈ a pinch of salt</text>
    </svg>
  )
}

export function AquariumTab() {
  return (
    <div className="pb-32 pt-6 px-4 max-w-md mx-auto">
      <header className="mb-6 text-center">
        <Fish className="w-8 h-8 text-primary mx-auto mb-2" strokeWidth={1.75} />
        <h1 className="font-serif text-4xl font-bold text-primary">Fish Tanks</h1>
        <p className="font-sans text-sm text-text-muted mt-1">Three tanks in the living room — flakes only</p>
      </header>

      <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-4">
        {/* THE RULE */}
        <motion.div variants={itemVariants}>
          <div className="bg-card rounded-xl border border-border p-5">
            <p className="font-mono text-[10px] uppercase tracking-wider text-text-muted font-semibold mb-2 text-center">
              The whole job
            </p>
            <p className="font-serif text-xl text-primary text-center leading-snug mb-4">
              A pinch of flakes,<br />sprinkled across each tank,<br />every <strong>2–3 days</strong>.
            </p>
            <div className="bg-primary/5 border border-border rounded-lg p-3">
              <FlakeIllustration />
            </div>
            <p className="font-sans text-sm text-text-muted text-center mt-3 leading-snug">
              Not a heaped scoop — just a <strong>pinch</strong>, the kind you'd grab to season food.
              Sprinkle across the surface so it spreads out.
            </p>
          </div>
        </motion.div>

        {/* TANK LINEUP */}
        <motion.div variants={itemVariants}>
          <p className="font-mono text-[11px] uppercase tracking-wide text-text-muted font-semibold mb-2 px-1">
            The three living-room tanks
          </p>
          <div className="space-y-3">
            <TankCard
              size="10g"
              title="Peaceful Nano Community"
              inhabitants="CPDs · Tetras · Endlers"
              feeding="Pinch of flakes, every 2–3 days."
            />
            <TankCard
              size="9g"
              title="Betta Marginata (wild)"
              inhabitants="Solo betta"
              feeding="Pinch of flakes, every 2–3 days."
            />
            <TankCard
              size="7g"
              title="Mixed Community"
              inhabitants="Guppies · Mollies · Betta · Shrimp"
              feeding="Pinch of flakes, every 2–3 days."
            />
          </div>
        </motion.div>

        {/* OUT OF SCOPE */}
        <motion.div variants={itemVariants}>
          <WarningBox type="info">
            <strong>4g Planted Betta:</strong> not on your list. Terry handles that one — don't feed it.
          </WarningBox>
        </motion.div>

        {/* EMERGENCY */}
        <motion.div variants={itemVariants}>
          <div className="bg-warning-bg border border-accent/30 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-accent" />
              <h3 className="font-serif text-base font-semibold text-accent">If something looks wrong</h3>
            </div>
            <p className="font-sans text-sm text-text leading-snug">
              Gasping at the surface, white spots, clamped fins, or any dead fish → <strong>text Terry immediately</strong>. Don't try to treat it yourself.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
