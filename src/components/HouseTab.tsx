import React from 'react'
import { motion } from 'framer-motion'
import {
  Sun,
  Droplets,
  Recycle,
  Bug,
  Lock,
  Dog,
  AlertTriangle,
  House,
} from 'lucide-react'
import { WarningBox } from './WarningBox'

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
}

interface HouseCardProps {
  icon: React.ReactNode
  title: string
  cadence?: string
  accent: 'morning' | 'plants' | 'kitchen' | 'lockup' | 'safety'
  children: React.ReactNode
}

function HouseCard({ icon, title, cadence, accent, children }: HouseCardProps) {
  const accentBar =
    accent === 'morning'
      ? 'bg-[#d49a3a]'
      : accent === 'plants'
      ? 'bg-[#4a7a57]'
      : accent === 'kitchen'
      ? 'bg-[#c4704f]'
      : accent === 'lockup'
      ? 'bg-[#5a7caf]'
      : 'bg-[#8a6fb0]'
  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden flex">
      <div className={`w-1.5 shrink-0 ${accentBar}`} aria-hidden="true" />
      <div className="flex-1 p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-primary">{icon}</span>
          <h3 className="font-serif text-base font-semibold text-primary leading-tight">{title}</h3>
          {cadence ? (
            <span className="font-mono text-[10px] uppercase tracking-wide text-accent font-semibold ml-auto">
              {cadence}
            </span>
          ) : null}
        </div>
        <div className="font-sans text-sm text-text leading-relaxed space-y-2">{children}</div>
      </div>
    </div>
  )
}

export function HouseTab() {
  return (
    <div className="pb-32 pt-6 px-4 max-w-md mx-auto">
      <header className="mb-6 text-center">
        <House className="w-8 h-8 text-primary mx-auto mb-2" strokeWidth={1.75} />
        <h1 className="font-serif text-4xl font-bold text-primary">House Ops</h1>
        <p className="font-sans text-sm text-text-muted mt-1">The basics for keeping the house running</p>
      </header>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-3"
      >
        {/* MORNING — BLINDS */}
        <motion.div variants={itemVariants}>
          <HouseCard
            icon={<Sun className="w-5 h-5" />}
            title="Open the blinds in the morning"
            cadence="daily"
            accent="morning"
          >
            <p>
              First thing after letting the dogs out — open the blinds throughout the house so the
              indoor plants get a full day of light.
            </p>
            <p className="text-xs text-text-muted">
              Guest bedroom and the rooms with plant clusters are the priority. You can close them
              before you leave for the evening if you want.
            </p>
          </HouseCard>
        </motion.div>

        {/* INDOOR PLANTS */}
        <motion.div variants={itemVariants}>
          <HouseCard
            icon={<Droplets className="w-5 h-5" />}
            title="Water indoor plants"
            cadence="every 2–3 days"
            accent="plants"
          >
            <p>
              <strong>Much less water than outside</strong> — most indoor plants just need to be{' '}
              <strong>a bit wet</strong>, not soaked. Pour slowly until the topsoil darkens; stop
              before any drainage runs.
            </p>
            <p className="text-xs text-text-muted">
              Plants live in the living room / dining area, the office windowsill, and the guest
              bedroom near the window. The orchid and lucky bamboo are special cases — see the
              Today tab's "Water house plants" task for details.
            </p>
            <WarningBox type="info">
              When in doubt, underwater rather than overwater. Yellow leaves usually mean too much
              water, not too little.
            </WarningBox>
          </HouseCard>
        </motion.div>

        {/* KITCHEN — COMPOST + COUNTER / ANTS */}
        <motion.div variants={itemVariants}>
          <HouseCard
            icon={<Bug className="w-5 h-5" />}
            title="Kitchen — keep it clean"
            cadence="all day"
            accent="kitchen"
          >
            <div className="bg-warning-bg border border-accent/30 rounded-lg p-3">
              <p className="font-mono text-[10px] uppercase tracking-wider text-accent font-bold mb-1.5">
                ★ Ants will swarm
              </p>
              <p className="font-sans text-sm">
                <strong>Wipe the counter down</strong> after every meal and{' '}
                <strong>don't leave food out</strong> — even crumbs. Ants find them within hours
                and it's hard to recover once they've found a trail.
              </p>
            </div>
            <div className="flex items-start gap-2 mt-2">
              <Recycle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-sm">
                <strong>Compost bin</strong> — check it once a day. If it's overflowing, empty it
                into the green outdoor bin.
              </p>
            </div>
          </HouseCard>
        </motion.div>

        {/* LOCK UP */}
        <motion.div variants={itemVariants}>
          <HouseCard
            icon={<Lock className="w-5 h-5" />}
            title="Lock the door"
            cadence="every exit · night"
            accent="lockup"
          >
            <p>
              <strong>Lock behind you any time you leave the house</strong>, and{' '}
              <strong>before bed</strong>. Both the front and back doors.
            </p>
          </HouseCard>
        </motion.div>

        {/* CRATE LULU WHEN LEAVING */}
        <motion.div variants={itemVariants}>
          <HouseCard
            icon={<Dog className="w-5 h-5" />}
            title="Crate Lulu before you leave"
            cadence="any time you go out"
            accent="safety"
          >
            <div className="bg-warning-bg border border-accent/30 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                <p className="text-sm">
                  Any time you leave the house — even quickly — <strong>put Lulu in her crate</strong>.
                  She'll have an accident or chew something if she's loose without supervision.
                </p>
              </div>
            </div>
            <p className="text-xs text-text-muted mt-2">
              Kya can stay out. Lock the front and back doors on your way out.
            </p>
          </HouseCard>
        </motion.div>
      </motion.div>
    </div>
  )
}
