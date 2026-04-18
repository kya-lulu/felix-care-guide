import React from 'react'
import { motion } from 'framer-motion'
import { DogCard } from './DogCard'

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export function DogsTab() {
  return (
    <div className="pb-32 pt-6 px-4 max-w-md mx-auto">
      <header className="mb-8">
        <h1 className="font-serif text-4xl font-bold text-primary text-center">The Dogs</h1>
      </header>
      <motion.div variants={containerVariants} initial="hidden" animate="show">
        <motion.div variants={itemVariants}>
          <DogCard
            name="Lulu"
            age={6}
            breed="Mini Dachshund"
            headerColor="primary"
            food="1/3 blue cup Purino kibble, 3x daily. Pumpkin probiotic (1/2 scoop, white tin orange cap) if not pooping well."
            schedule="8:30am potty, 9am breakfast, 12-2pm walk, 5pm potty, 10pm final potty"
            warning="Back health critical — no jumping on/off furniture. Always carry her on stairs. Support hind end when picking up."
            notes="Sleeps in crate ('come' command). Can be left 4-5 hours."
            vetInfo={{ name: 'Mercer Street Animal Hospital', phone: '206-285-0395' }}
            emergencyInfo={{ name: 'Veterinary Emergency Group', phone: '564-888-4898' }}
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <DogCard
            name="Kya"
            age={6}
            breed="Australian Shepherd Mix (Blue Merle)"
            headerColor="brown"
            food="1 full metal cup Call of the Wild kibble + probiotic from orange bag, 3x daily. Feed separately from Lulu."
            schedule="7-9am walk + breakfast, 12-2pm fetch or walk, 6pm dog park or walk, 9pm dinner + walk"
            notes="Use red harness. Avoid skate parks — reacts to skateboarders and squirrels. Walking with leash in mouth at start is normal. Can be left 5-6 hours. Trazodone available if very anxious."
            vetInfo={{ name: 'Fremont Animal Hospital', phone: '206-339-3301' }}
            emergencyInfo={{ name: 'Veterinary Emergency Group', phone: '564-888-4898' }}
          />
        </motion.div>
      </motion.div>
    </div>
  )
}
