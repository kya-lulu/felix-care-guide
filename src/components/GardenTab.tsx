import React from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Droplets, Camera, TreeDeciduous, Flower2, Sun, Repeat, Sprout } from 'lucide-react'
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

function HoseFillSteps() {
  const steps = [
    'Take the black watering can to the hose splitter.',
    'Place the can under the open spout.',
    'Toggle the hose splitter ON — water runs from the open hose to fill it.',
    'When full, toggle the splitter OFF.',
  ]
  return (
    <div className="rounded-lg bg-primary/5 border border-border p-3 mb-4">
      <p className="font-sans text-xs uppercase tracking-wide text-primary font-semibold mb-2">How to fill the can</p>
      <ol className="space-y-1.5">
        {steps.map((s, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary text-card text-[10px] font-mono font-bold flex items-center justify-center mt-0.5">{i + 1}</span>
            <p className="font-sans text-sm text-text leading-snug">{s}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}

function CadenceCard({
  icon,
  cadence,
  title,
  accent,
  children,
}: {
  icon: React.ReactNode
  cadence: string
  title: string
  accent: 'sun' | 'every' | 'three' | 'two'
  children: React.ReactNode
}) {
  const accentBar =
    accent === 'sun'
      ? 'bg-[#d49a3a]'
      : accent === 'every'
      ? 'bg-[#4a7a57]'
      : accent === 'three'
      ? 'bg-[#5a7caf]'
      : 'bg-[#8a6fb0]'
  return (
    <div className="rounded-lg border border-border bg-background/40 overflow-hidden flex">
      <div className={`w-1.5 shrink-0 ${accentBar}`} aria-hidden="true" />
      <div className="flex-1 p-3">
        <div className="flex items-center gap-2 mb-1">
          {icon}
          <p className="font-serif text-sm font-semibold text-primary leading-tight">{title}</p>
          <span className="font-mono text-[10px] uppercase tracking-wide text-accent font-semibold ml-auto">{cadence}</span>
        </div>
        {children}
      </div>
    </div>
  )
}

function BedRow({ label, location, cans }: { label: string; location?: string; cans: string }) {
  return (
    <div className="flex items-baseline justify-between gap-2 py-0.5">
      <p className="font-sans text-sm text-text leading-snug">
        <span className="font-semibold">{label}</span>
        {location ? <span className="text-text-muted"> · {location}</span> : null}
      </p>
      <span className="font-mono text-xs text-accent font-semibold shrink-0">{cans}</span>
    </div>
  )
}

function BackyardSection() {
  return (
    <div className="bg-card rounded-xl border border-border p-4 mb-2">
      <div className="flex items-center gap-2 mb-3">
        <Sprout className="w-5 h-5 text-primary" />
        <h3 className="font-serif text-lg font-semibold text-primary">Backyard — Tamlin Farm</h3>
      </div>

      <p className="font-sans text-sm text-text leading-relaxed mb-3">
        This is the terraced garden ({' '}
        <a href="https://tamlinfarm.org" target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-2">tamlinfarm.org</a>
        ). Water at the roots, watch the same soil cue from the deck — surface turns dark and a thin liquid layer pools briefly before soaking in.
      </p>

      <div className="rounded-lg border border-border overflow-hidden mb-4">
        <TerraceDiagram />
      </div>

      <HoseFillSteps />

      <div className="space-y-2">
        <CadenceCard
          icon={<Sun className="w-4 h-4 text-[#d49a3a]" />}
          title="Sunny days — three beds"
          cadence="hot weather"
          accent="sun"
        >
          <div className="mt-1">
            <BedRow label="Leafy greens" location="T2 priority · kale, chard, arugula, bok choy" cans="water deeply" />
            <BedRow label="Brassicas / cauliflower" location="T2 right" cans="water deeply" />
            <BedRow label="Sunny edibles" location="T1 · snap peas, beans, starts" cans="water deeply" />
          </div>
          <p className="font-mono text-[10px] text-text-muted mt-1.5">If it's been raining heavily, skip these — rain handles it.</p>
        </CadenceCard>

        <CadenceCard
          icon={<Droplets className="w-4 h-4 text-[#4a7a57]" />}
          title="Every visit"
          cadence="always"
          accent="every"
        >
          <div className="mt-1">
            <BedRow label="Tulip-ring flower circle" location="water at roots" cans="~¼ can" />
            <BedRow label="Red currant + raspberry" location="at roots" cans="1 can" />
          </div>
        </CadenceCard>

        <CadenceCard
          icon={<Repeat className="w-4 h-4 text-[#5a7caf]" />}
          title="Blueberries — high effort"
          cadence="every 3 days"
          accent="three"
        >
          <p className="font-sans text-sm text-text leading-snug mt-1">
            <span className="font-semibold">One full can per blueberry plant</span>, poured at the root ball. Takes a while — this is the main repeat chore.
          </p>
        </CadenceCard>

        <CadenceCard
          icon={<Repeat className="w-4 h-4 text-[#8a6fb0]" />}
          title="Native pollinator bed"
          cadence="every 2–3 days"
          accent="two"
        >
          <p className="font-sans text-sm text-text leading-snug mt-1">
            About <span className="font-semibold">one can</span>, poured around the base of the pollinators.
          </p>
        </CadenceCard>
      </div>
    </div>
  )
}

function SoilCue() {
  return (
    <div className="grid grid-cols-2 gap-3 mt-3">
      <div className="rounded-lg overflow-hidden border border-border">
        <div className="h-16 bg-gradient-to-b from-[#c9a878] to-[#a8865a]" aria-hidden="true" />
        <p className="px-2 py-1.5 font-mono text-[10px] text-text-muted text-center bg-card">dry · light tan</p>
      </div>
      <div className="rounded-lg overflow-hidden border border-border">
        <div className="h-16 bg-gradient-to-b from-[#4a3424] to-[#1f1410] relative" aria-hidden="true">
          <div className="absolute inset-x-0 bottom-0 h-2 bg-[#0a0604] opacity-80" />
        </div>
        <p className="px-2 py-1.5 font-mono text-[10px] text-primary text-center bg-card font-semibold">soaked · black + liquid layer ✓</p>
      </div>
    </div>
  )
}

function MapleWoodCue() {
  return (
    <div className="grid grid-cols-2 gap-3 mt-3">
      <div className="rounded-lg overflow-hidden border border-border">
        <div className="h-16 bg-gradient-to-b from-[#b89070] to-[#9a7350]" aria-hidden="true" />
        <p className="px-2 py-1.5 font-mono text-[10px] text-text-muted text-center bg-card">warm · light brown</p>
      </div>
      <div className="rounded-lg overflow-hidden border border-border">
        <div className="h-16 bg-gradient-to-b from-[#5a3a22] to-[#2e1c10]" aria-hidden="true" />
        <p className="px-2 py-1.5 font-mono text-[10px] text-primary text-center bg-card font-semibold">cooled · darker brown ✓</p>
      </div>
    </div>
  )
}

function BackyardDeckSection() {
  return (
    <div className="bg-card rounded-xl border border-border p-4 mb-2">
      <div className="flex items-center gap-2 mb-3">
        <Droplets className="w-5 h-5 text-accent" />
        <h3 className="font-serif text-lg font-semibold text-primary">Backyard Deck — Potted Plants</h3>
      </div>

      <p className="font-sans text-sm text-text leading-relaxed mb-3">
        The deck mirrors what's on <a href="https://tamlinfarm.org" target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-2">tamlinfarm.org</a> — same species, just up here in pots. Everything you need to water should be visible on the deck (all potted).
      </p>

      <div className="rounded-lg bg-primary/5 border border-border p-3 mb-3">
        <p className="font-sans text-sm text-text leading-snug">
          <span className="font-semibold text-primary">Across-the-board rule:</span> pour about <span className="font-mono font-semibold">1 to 1.25</span> fills of the <span className="font-semibold">black watering can</span> directly at the <span className="font-semibold">roots</span> of each pot.
        </p>
      </div>

      <p className="font-sans text-xs uppercase tracking-wide text-text-muted font-semibold mb-1">Visual cue — how to know it's enough</p>
      <p className="font-sans text-sm text-text leading-snug">
        Watch the soil. When it's saturated, the surface <span className="font-semibold">changes color toward black</span> and a thin <span className="font-semibold">liquid layer</span> seeps in / pools briefly before soaking down. That's the signal to stop.
      </p>
      <SoilCue />

      <div className="border-t border-border my-4" />

      <div className="flex items-center gap-2 mb-2">
        <TreeDeciduous className="w-5 h-5" style={{ color: 'var(--color-brown)' }} />
        <h4 className="font-serif text-base font-semibold text-primary">Japanese Maple — specialty</h4>
      </div>
      <p className="font-sans text-sm text-text leading-relaxed">
        Just <span className="font-mono font-semibold">one</span> full black watering can — the goal here is to <span className="font-semibold">keep it cool</span>, not soak it.
      </p>
      <p className="font-sans text-xs uppercase tracking-wide text-text-muted font-semibold mt-3 mb-1">Visual cue — the wood</p>
      <p className="font-sans text-sm text-text leading-snug">
        Watch the trunk/branches. Properly cooled, the wood should look <span className="font-semibold">darker brown</span> (damp-looking) rather than its dry warm-tan shade.
      </p>
      <MapleWoodCue />
    </div>
  )
}

function FrontYardDiagram() {
  return (
    <svg viewBox="0 0 320 220" className="w-full max-w-xs mx-auto" aria-label="Front yard watering zones">
      {/* House at top */}
      <rect x="60" y="6" width="200" height="28" rx="4" fill="#2d4a35" />
      <text x="160" y="24" textAnchor="middle" fill="white" fontSize="11" fontFamily="serif" fontWeight="bold">HOUSE</text>

      {/* Walkway down the middle */}
      <rect x="148" y="40" width="24" height="140" fill="#e8e2d4" />
      <text x="160" y="115" textAnchor="middle" fill="#9a8d75" fontSize="8" fontFamily="monospace" transform="rotate(-90, 160, 115)">WALKWAY</text>

      {/* LEFT bed (strawberries / salvia / bergamot / fig) */}
      <rect x="10" y="40" width="132" height="92" rx="6" fill="#c4704f" opacity="0.85" />
      <rect x="10" y="40" width="4" height="92" rx="2" fill="#c4704f" />
      <text x="76" y="60" textAnchor="middle" fill="white" fontSize="11" fontFamily="serif" fontWeight="bold">LEFT</text>
      <text x="76" y="76" textAnchor="middle" fill="#fce8dc" fontSize="8" fontFamily="sans-serif">Strawberries · Salvia</text>
      <text x="76" y="88" textAnchor="middle" fill="#fce8dc" fontSize="8" fontFamily="sans-serif">Bergamot · Fig</text>
      <text x="76" y="100" textAnchor="middle" fill="#fce8dc" fontSize="8" fontFamily="sans-serif">3 small flowers</text>
      <text x="76" y="122" textAnchor="middle" fill="white" fontSize="10" fontFamily="monospace" fontWeight="bold">~2 cans</text>

      {/* RIGHT bed (lavender / mulberry / peppers / rhody) */}
      <rect x="178" y="40" width="132" height="92" rx="6" fill="#7a9c5c" opacity="0.9" />
      <rect x="306" y="40" width="4" height="92" rx="2" fill="#5a7c3c" />
      <text x="244" y="60" textAnchor="middle" fill="white" fontSize="11" fontFamily="serif" fontWeight="bold">RIGHT</text>
      <text x="244" y="76" textAnchor="middle" fill="#e8f2dc" fontSize="8" fontFamily="sans-serif">Lavender · Mulberry</text>
      <text x="244" y="88" textAnchor="middle" fill="#e8f2dc" fontSize="8" fontFamily="sans-serif">Peppers · Rhododendron</text>
      <text x="244" y="122" textAnchor="middle" fill="white" fontSize="10" fontFamily="monospace" fontWeight="bold">~2 to 2.5 cans</text>

      {/* Bottom island bed — delphinium / iris / lungwort */}
      <rect x="40" y="142" width="240" height="42" rx="6" fill="#8a6fb0" opacity="0.9" />
      <rect x="40" y="180" width="240" height="4" rx="2" fill="#6a4f90" />
      <text x="160" y="158" textAnchor="middle" fill="white" fontSize="11" fontFamily="serif" fontWeight="bold">Delphiniums · Irises · Lungwort</text>
      <text x="160" y="174" textAnchor="middle" fill="white" fontSize="10" fontFamily="monospace" fontWeight="bold">1 can</text>

      {/* Street label */}
      <rect x="10" y="192" width="300" height="22" rx="4" fill="#d4c8b8" />
      <text x="160" y="207" textAnchor="middle" fill="#6b5d4d" fontSize="10" fontFamily="sans-serif">Street (front)</text>
    </svg>
  )
}

function FrontYardZone({
  label,
  cans,
  plants,
  accent,
}: {
  label: string
  cans: string
  plants: string[]
  accent: 'right' | 'left' | 'center'
}) {
  const accentBar =
    accent === 'right'
      ? 'bg-[#7a9c5c]'
      : accent === 'left'
      ? 'bg-[#c4704f]'
      : 'bg-[#8a6fb0]'
  return (
    <div className="rounded-lg border border-border bg-background/40 overflow-hidden flex">
      <div className={`w-1.5 shrink-0 ${accentBar}`} aria-hidden="true" />
      <div className="flex-1 p-3">
        <div className="flex items-baseline justify-between gap-2 mb-1.5">
          <p className="font-serif text-sm font-semibold text-primary leading-tight">{label}</p>
          <span className="font-mono text-xs text-accent font-semibold shrink-0">{cans}</span>
        </div>
        <p className="font-sans text-xs text-text leading-snug">{plants.join(' · ')}</p>
      </div>
    </div>
  )
}

function FrontYardSection() {
  return (
    <div className="bg-card rounded-xl border border-border p-4 mb-2">
      <div className="flex items-center gap-2 mb-3">
        <Flower2 className="w-5 h-5 text-accent" />
        <h3 className="font-serif text-lg font-semibold text-primary">Front Yard — Watering Zones</h3>
      </div>

      <p className="font-sans text-sm text-text leading-relaxed mb-3">
        Three zones, same <span className="font-semibold">black watering can</span>, water at the roots. Same soil cue as the deck — stop when the surface turns dark and a thin liquid layer pools briefly before soaking in.
      </p>

      <div className="mb-4">
        <FrontYardDiagram />
        <p className="font-sans text-xs text-text-muted text-center mt-2">House at top · walkway down the middle · street at the bottom</p>
      </div>

      <div className="space-y-2">
        <FrontYardZone
          label="Right side"
          cans="~2 to 2.5 cans"
          plants={['Lavender', 'Mulberry', 'Peppers', 'Rhododendron']}
          accent="right"
        />
        <FrontYardZone
          label="Left side"
          cans="~2 cans"
          plants={['Strawberries', 'Salvia', 'Bergamot', 'Three small flowers', 'Fig']}
          accent="left"
        />
        <FrontYardZone
          label="Delphiniums / Irises / Lungwort"
          cans="1 can"
          plants={['Delphiniums', 'Irises', 'Lungwort']}
          accent="center"
        />
      </div>

      <p className="font-mono text-[11px] text-text-muted mt-3 text-center">≈ 5 to 5.5 cans total across the front yard</p>
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
          <BackyardSection />
        </motion.div>

        <motion.div variants={itemVariants}>
          <BackyardDeckSection />
        </motion.div>

        <motion.div variants={itemVariants}>
          <FrontYardSection />
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
