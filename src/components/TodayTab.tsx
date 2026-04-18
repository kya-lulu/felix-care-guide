import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import { CollapsibleSection } from './CollapsibleSection'
import { CheckboxRow } from './CheckboxRow'

const MORNING_TASKS = [
  { id: 'm1', label: 'Let Lulu out', subtext: 'Wait until she pees AND poops. May need 2 outdoor trips.' },
  { id: 'm2', label: 'Feed Lulu', subtext: '1/3 blue cup kibble in her bowl' },
  { id: 'm3', label: 'Feed Kya', subtext: '1 full metal cup Call of the Wild + probiotic from orange bag. Feed separately from Lulu.' },
  { id: 'm4', label: 'Water plants', subtext: 'Only if no rain. 2 gallon-can fills → T2 greens bed, T2 right veg bed, T4 center (bok choy). T1 if water remains.' },
  { id: 'm5', label: 'Water new blueberries', subtext: 'Northeast fence. At root ball, daily — critical new plants.' },
  { id: 'm6', label: 'Send Terry a photo', subtext: 'From T4 — the bottom terrace near the street' },
  { id: 'm7', label: 'Feed fish tanks', subtext: '10g & 7g: small pinch crushed flakes daily. 9g & 4g (bettas): every other day, 3-4 Bug Bites. 2-min rule — remove uneaten food.' },
]

const MIDDAY_TASKS = [
  { id: 'md1', label: 'Kya midday activity', subtext: '30 min walk (red harness) or backyard fetch' },
  { id: 'md2', label: 'Lulu potty check', subtext: 'Every 5 hours max' },
]

const EVENING_TASKS = [
  { id: 'e1', label: 'Feed Lulu', subtext: '1/3 blue cup kibble' },
  { id: 'e2', label: 'Feed Kya', subtext: '1 full metal cup kibble' },
  { id: 'e3', label: 'Evening walk', subtext: 'Both dogs. Use red harness for Kya.' },
  { id: 'e4', label: 'Fish tank visual check', subtext: 'Any gasping, clamped fins, or white spots → text Terry immediately' },
]

const ALL_TASKS = [...MORNING_TASKS, ...MIDDAY_TASKS, ...EVENING_TASKS]
const STORAGE_KEY = 'tamlin-checklist-v1'

function getResetDateKey(): string {
  const now = new Date()
  const d = new Date(now)
  if (now.getHours() < 5) d.setDate(d.getDate() - 1)
  return d.toDateString()
}

function loadChecked(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return new Set()
    const parsed = JSON.parse(raw)
    if (parsed.dateKey === getResetDateKey()) return new Set(parsed.checked as string[])
  } catch {}
  return new Set()
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
}

export function TodayTab() {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(loadChecked)
  const [showSuccess, setShowSuccess] = useState(false)
  const allDone = ALL_TASKS.every((t) => checkedItems.has(t.id))
  const totalDone = ALL_TASKS.filter((t) => checkedItems.has(t.id)).length

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ dateKey: getResetDateKey(), checked: Array.from(checkedItems) }))
    } catch {}
  }, [checkedItems])

  useEffect(() => {
    if (allDone && checkedItems.size > 0) {
      const timer = setTimeout(() => setShowSuccess(true), 400)
      return () => clearTimeout(timer)
    }
  }, [allDone, checkedItems.size])

  const handleToggle = (id: string, checked: boolean) => {
    setCheckedItems((prev) => {
      const next = new Set(prev)
      if (checked) next.add(id)
      else next.delete(id)
      return next
    })
  }

  const getCompletedCount = (tasks: { id: string }[]) => tasks.filter((t) => checkedItems.has(t.id)).length

  return (
    <div className="pb-32 pt-6 px-4 max-w-md mx-auto relative">
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-green-700/95 backdrop-blur-sm"
            onClick={() => setShowSuccess(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', bounce: 0.45, duration: 0.5 }}
              className="text-center px-8 py-12 max-w-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.15, type: 'spring', bounce: 0.6 }}
              >
                <CheckCircle className="w-28 h-28 text-white mx-auto mb-6" strokeWidth={1.5} />
              </motion.div>
              <h2 className="font-serif text-5xl font-bold text-white mb-3">All done!</h2>
              <p className="font-sans text-green-100 text-xl mb-2">Great job today.</p>
              <p className="font-mono text-green-300 text-sm mb-10">Resets at 5:00 AM tomorrow</p>
              <button
                onClick={() => setShowSuccess(false)}
                className="bg-white text-green-700 font-sans font-semibold px-10 py-3 rounded-full min-h-[44px] hover:bg-green-50 transition-colors text-lg"
              >
                Done
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="mb-8 text-center">
        <h1 className="font-serif text-4xl font-bold text-primary mb-2">TamLin Farm</h1>
        <p className="font-sans text-text-muted">Care Guide for Felix</p>
        {totalDone > 0 && !allDone && (
          <p className="font-mono text-xs text-text-muted mt-2 uppercase tracking-wider">{totalDone} / {ALL_TASKS.length} tasks done</p>
        )}
        {allDone && (
          <button onClick={() => setShowSuccess(true)} className="mt-2 font-mono text-xs text-green-600 uppercase tracking-wider underline">
            {ALL_TASKS.length} / {ALL_TASKS.length} — View completion
          </button>
        )}
      </header>

      <motion.div variants={containerVariants} initial="hidden" animate="show">
        <CollapsibleSection title="Morning" completedCount={getCompletedCount(MORNING_TASKS)} totalCount={MORNING_TASKS.length}>
          {MORNING_TASKS.map((task) => (
            <motion.div key={task.id} variants={itemVariants}>
              <CheckboxRow id={task.id} label={task.label} subtext={task.subtext} checked={checkedItems.has(task.id)} onChange={handleToggle} />
            </motion.div>
          ))}
        </CollapsibleSection>
        <CollapsibleSection title="Midday" completedCount={getCompletedCount(MIDDAY_TASKS)} totalCount={MIDDAY_TASKS.length}>
          {MIDDAY_TASKS.map((task) => (
            <motion.div key={task.id} variants={itemVariants}>
              <CheckboxRow id={task.id} label={task.label} subtext={task.subtext} checked={checkedItems.has(task.id)} onChange={handleToggle} />
            </motion.div>
          ))}
        </CollapsibleSection>
        <CollapsibleSection title="Evening" completedCount={getCompletedCount(EVENING_TASKS)} totalCount={EVENING_TASKS.length}>
          {EVENING_TASKS.map((task) => (
            <motion.div key={task.id} variants={itemVariants}>
              <CheckboxRow id={task.id} label={task.label} subtext={task.subtext} checked={checkedItems.has(task.id)} onChange={handleToggle} />
            </motion.div>
          ))}
        </CollapsibleSection>
      </motion.div>
    </div>
  )
}
