import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BottomTabBar, TabId } from './components/BottomTabBar'
import { ContactsBar } from './components/ContactsBar'
import { TodayTab } from './components/TodayTab'
import { DogsTab } from './components/DogsTab'
import { GardenTab } from './components/GardenTab'
import { AquariumTab } from './components/AquariumTab'

export function App() {
  const [activeTab, setActiveTab] = useState<TabId>('today')
  const renderTab = () => {
    switch (activeTab) {
      case 'today': return <TodayTab />
      case 'dogs': return <DogsTab />
      case 'garden': return <GardenTab />
      case 'aquarium': return <AquariumTab />
      default: return <TodayTab />
    }
  }
  return (
    <div className="min-h-screen bg-background w-full overflow-x-hidden">
      <AnimatePresence mode="wait">
        <motion.main
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="w-full h-full"
        >
          {renderTab()}
        </motion.main>
      </AnimatePresence>
      <ContactsBar />
      <BottomTabBar activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}
