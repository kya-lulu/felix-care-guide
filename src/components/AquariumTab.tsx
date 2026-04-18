import React from 'react'
import { motion } from 'framer-motion'
import { TankCard } from './TankCard'
import { WarningBox } from './WarningBox'

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
}

export function AquariumTab() {
  return (
    <div className="pb-32 pt-6 px-4 max-w-2xl mx-auto">
      <header className="mb-8 text-center">
        <h1 className="font-serif text-4xl font-bold text-primary">Fish Tanks</h1>
      </header>

      <motion.div variants={containerVariants} initial="hidden" animate="show">
        <motion.div variants={itemVariants} className="mb-6">
          <WarningBox type="warning">
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>2-minute rule:</strong> remove uneaten food after 2 minutes</li>
              <li><strong>Weekly fast:</strong> skip one day per week (e.g. Sunday)</li>
              <li>Always crush Tetra flakes before adding to 10g (CPD mouths are tiny)</li>
              <li>If anything looks wrong (gasping, white spots, clamped fins) → text Terry at 415-316-5586</li>
            </ul>
          </WarningBox>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <motion.div variants={itemVariants}>
            <TankCard size="10g" title="Peaceful Nano Community" inhabitants="CPDs, Tetras, Endlers" feeding="Feed daily — small pinch crushed Tetra flakes or small Bug Bites. Do not skip days." />
          </motion.div>
          <motion.div variants={itemVariants}>
            <TankCard size="9g" title="Betta Marginata (wild)" inhabitants="Solo tank" feeding="Feed every other day — 3-4 Bug Bites. Fast 1 day/week. Do not add other fish." />
          </motion.div>
          <motion.div variants={itemVariants}>
            <TankCard size="7g" title="Mixed Community" inhabitants="Guppies, Mollies, Betta, Shrimp" feeding="Feed daily — small pinch Tetra flakes. Shrimp scavenge naturally." />
          </motion.div>
          <motion.div variants={itemVariants}>
            <TankCard size="4g" title="Planted Betta" inhabitants="Solo Betta" feeding="Feed every other day — 2-3 Bug Bites. Fast 1 day/week." />
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
