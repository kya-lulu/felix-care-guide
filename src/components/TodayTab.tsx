import React, { useMemo, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import { CollapsibleSection } from './CollapsibleSection'
import { CheckboxRow } from './CheckboxRow'
import { LearnMoreModal } from './LearnMoreModal'
import { DaySelector, DayId, WEEK_DAYS, getDayId, dateForDayInCurrentWeek, toISODate } from './DaySelector'

type TaskSection = 'morning' | 'midday' | 'evening'

interface Task {
  id: string
  label: string
  subtext?: string
  learnMore?: React.ReactNode
  days?: DayId[] // undefined = every day
  section: TaskSection
}

const TASKS: Task[] = [
  // ── MORNING ───────────────────────────────────────────────
  {
    id: 'm1',
    section: 'morning',
    label: 'Let Lulu out (and feed both dogs)',
    subtext: 'Wait until she pees AND poops. Feeding Lulu + Kya can happen at the same time.',
    learnMore: (
      <>
        <p>
          <strong>Lulu</strong> goes out first thing. She needs to BOTH pee and poop before coming inside — she may need a second trip if she only pees.
        </p>
        <p>
          You can feed both dogs while she's outside or right after. They eat in separate rooms (Kya in the kitchen, Lulu in the dining area) so Kya doesn't snarf Lulu's food.
        </p>
        <p className="font-mono text-xs text-text-muted">
          Food amounts: Lulu = ⅓ blue cup kibble. Kya = 1 full metal cup Call-of-the-Wild + orange-bag probiotic.
        </p>
      </>
    ),
  },
  {
    id: 'm2',
    section: 'morning',
    label: 'Water the outdoor garden',
    subtext: '1 full gallon per blueberry plant + full watering of every terrace bed.',
    days: ['mon', 'wed', 'fri'],
    learnMore: (
      <>
        <p>
          <strong>Every-other-day schedule:</strong> Monday, Wednesday, and Friday. Skip Tue/Thu/Sat/Sun unless the soil is bone-dry or it's been a hot stretch.
        </p>
        <p>
          <strong>Order to water:</strong>
        </p>
        <ol className="list-decimal list-inside space-y-1 pl-1">
          <li>NE fence <strong>blueberries</strong> — 1 full gallon per plant, poured slowly at the root ball.</li>
          <li>T2 priority bed — kale, chard, arugula, bok choy, brassicas.</li>
          <li>T1 sunny edibles — snap peas, beans, borage, strawberries.</li>
          <li>T3 pollinators + Toro blueberry.</li>
          <li>T4 bottom bed — bok choy, lavender, chamomile.</li>
          <li>Shady shed corner if anything looks dry.</li>
        </ol>
        <p className="text-xs text-text-muted">
          Blueberries are new (3–4 week establishment). Tamlinfarm.org says every 1–2 days regardless of rain. If it's hot/dry between watering days, add a quick blueberry-only top-up.
        </p>
        <p className="text-xs">
          Reference:{' '}
          <a href="https://tamlinfarm.org" target="_blank" rel="noopener noreferrer" className="text-accent underline">
            tamlinfarm.org
          </a>{' '}
          is always the source of truth for bed layouts and plant list.
        </p>
      </>
    ),
  },
  {
    id: 'm3',
    section: 'morning',
    label: 'Send Terry a photo',
    subtext: 'From T4 — the bottom terrace near the street.',
    learnMore: (
      <>
        <p>
          Stand at the lowest terrace (T4) facing uphill toward the house and snap a photo that shows the plants. Text it to Terry.
        </p>
        <p>This is how Terry keeps an eye on the farm — no need to caption it, just send the shot.</p>
      </>
    ),
  },
  {
    id: 'm4',
    section: 'morning',
    label: 'Feed fish tanks',
    subtext: '10g & 7g: pinch of crushed flakes daily. 9g & 4g (bettas): every other day, 3–4 Bug Bites.',
    learnMore: (
      <>
        <p>
          <strong>Daily tanks (10g + 7g):</strong> small pinch of crushed flakes each.
        </p>
        <p>
          <strong>Betta tanks (9g + 4g):</strong> 3–4 Bug Bites pellets, <em>every other day only</em>. Overfeeding them is the #1 risk.
        </p>
        <p className="text-xs text-text-muted">
          <strong>2-minute rule:</strong> if food isn't eaten within 2 minutes, scoop it out with the little net so it doesn't foul the water.
        </p>
        <p>
          Visual check: any gasping at the surface, clamped fins, or white spots → text Terry immediately.
        </p>
      </>
    ),
  },

  // ── MIDDAY ────────────────────────────────────────────────
  {
    id: 'md1',
    section: 'midday',
    label: 'Kya midday activity',
    subtext: '30 min walk (red harness) or backyard fetch.',
    learnMore: (
      <>
        <p>
          Kya needs real exercise at midday — either a 30-minute neighborhood walk in her <strong>red harness</strong>, or vigorous backyard fetch until she's panting.
        </p>
        <p className="text-xs text-text-muted">
          Avoid skate parks — she reacts to skateboarders and squirrels. Holding the leash in her mouth at the start of a walk is normal and fine.
        </p>
      </>
    ),
  },
  {
    id: 'md2',
    section: 'midday',
    label: 'Lulu potty check',
    subtext: 'Every 5 hours max — quick trip out.',
    learnMore: (
      <>
        <p>
          Lulu can hold it ~5 hours max. Even if she doesn't signal, take her out. A short backyard trip is enough if she just needs to pee.
        </p>
      </>
    ),
  },

  // ── EVENING ───────────────────────────────────────────────
  {
    id: 'e1',
    section: 'evening',
    label: 'Feed Lulu',
    subtext: '⅓ blue cup kibble.',
  },
  {
    id: 'e2',
    section: 'evening',
    label: 'Feed Kya',
    subtext: '1 full metal cup kibble + probiotic.',
  },
  {
    id: 'e3',
    section: 'evening',
    label: 'Evening walk',
    subtext: 'Both dogs. Red harness for Kya.',
    learnMore: (
      <>
        <p>
          Walk both dogs together if it's easy — otherwise split: Kya first (she needs more distance), then Lulu for a shorter loop.
        </p>
        <p className="text-xs text-text-muted">
          Carry Lulu up and down stairs. Her back is the #1 health priority — never let her jump off furniture.
        </p>
      </>
    ),
  },
  {
    id: 'e4',
    section: 'evening',
    label: 'Fish tank visual check',
    subtext: 'Gasping, clamped fins, or white spots → text Terry immediately.',
  },
]

const SECTION_META: Record<TaskSection, { title: string; hint: string }> = {
  morning: { title: 'Morning', hint: 'When you wake up — usually 8:00–8:30' },
  midday: { title: 'Midday', hint: 'Around 12–2pm' },
  evening: { title: 'Evening', hint: 'Around 6–9pm' },
}

const STORAGE_KEY = 'tamlin-checklist-v2'

function loadState(): Record<string, string[]> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw)
    if (parsed && typeof parsed === 'object') {
      // Prune entries older than 14 days to keep storage tidy
      const cutoff = new Date()
      cutoff.setDate(cutoff.getDate() - 14)
      const cutoffISO = toISODate(cutoff)
      const cleaned: Record<string, string[]> = {}
      for (const [k, v] of Object.entries(parsed as Record<string, unknown>)) {
        if (k >= cutoffISO && Array.isArray(v)) cleaned[k] = v as string[]
      }
      return cleaned
    }
  } catch {}
  return {}
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.04 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25 } },
}

export function TodayTab() {
  const today = useMemo(() => new Date(), [])
  const [selectedDay, setSelectedDay] = useState<DayId>(() => getDayId(today))
  const [stateByDate, setStateByDate] = useState<Record<string, string[]>>(loadState)
  const [showSuccess, setShowSuccess] = useState(false)
  const [activeLearnMore, setActiveLearnMore] = useState<Task | null>(null)

  const selectedDate = useMemo(() => dateForDayInCurrentWeek(selectedDay, today), [selectedDay, today])
  const selectedDateISO = useMemo(() => toISODate(selectedDate), [selectedDate])
  const isToday = toISODate(today) === selectedDateISO

  const checkedSet = useMemo(
    () => new Set(stateByDate[selectedDateISO] ?? []),
    [stateByDate, selectedDateISO],
  )

  // Tasks visible on the selected day
  const visibleTasks = useMemo(
    () => TASKS.filter((t) => !t.days || t.days.includes(selectedDay)),
    [selectedDay],
  )

  const tasksBySection = useMemo(() => {
    const out: Record<TaskSection, Task[]> = { morning: [], midday: [], evening: [] }
    for (const t of visibleTasks) out[t.section].push(t)
    return out
  }, [visibleTasks])

  const totalDone = visibleTasks.filter((t) => checkedSet.has(t.id)).length
  const allDone = visibleTasks.length > 0 && totalDone === visibleTasks.length

  // Persist
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateByDate))
    } catch {}
  }, [stateByDate])

  // Celebrate when fully done (only for the day currently being viewed)
  useEffect(() => {
    if (allDone && totalDone > 0 && isToday) {
      const timer = setTimeout(() => setShowSuccess(true), 400)
      return () => clearTimeout(timer)
    }
  }, [allDone, totalDone, isToday])

  const handleToggle = (id: string, checked: boolean) => {
    setStateByDate((prev) => {
      const existing = new Set(prev[selectedDateISO] ?? [])
      if (checked) existing.add(id)
      else existing.delete(id)
      return { ...prev, [selectedDateISO]: Array.from(existing) }
    })
  }

  const getCompletedCount = (tasks: Task[]) => tasks.filter((t) => checkedSet.has(t.id)).length

  const friendlyDateLabel = selectedDate.toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  })

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
              <p className="font-mono text-green-300 text-sm mb-10">Resets tomorrow</p>
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

      <header className="mb-5 text-center">
        <h1 className="font-serif text-4xl font-bold text-primary mb-1">Daily Checklist</h1>
        <p className="font-sans text-text-muted text-sm">{friendlyDateLabel}</p>
      </header>

      <div className="mb-5">
        <DaySelector selectedDay={selectedDay} onSelectDay={setSelectedDay} today={today} />
      </div>

      {visibleTasks.length > 0 && (
        <div className="text-center mb-4">
          {!allDone && totalDone > 0 && (
            <p className="font-mono text-xs text-text-muted uppercase tracking-wider">
              {totalDone} / {visibleTasks.length} done
            </p>
          )}
          {allDone && (
            <button
              onClick={() => setShowSuccess(true)}
              className="font-mono text-xs text-green-600 uppercase tracking-wider underline"
            >
              {visibleTasks.length} / {visibleTasks.length} — View completion
            </button>
          )}
        </div>
      )}

      <motion.div variants={containerVariants} initial="hidden" animate="show" key={selectedDateISO}>
        {(['morning', 'midday', 'evening'] as TaskSection[]).map((section) => {
          const tasks = tasksBySection[section]
          if (tasks.length === 0) return null
          const meta = SECTION_META[section]
          return (
            <CollapsibleSection
              key={section}
              title={meta.title}
              hint={meta.hint}
              completedCount={getCompletedCount(tasks)}
              totalCount={tasks.length}
            >
              {tasks.map((task) => (
                <motion.div key={task.id} variants={itemVariants}>
                  <CheckboxRow
                    id={task.id}
                    label={task.label}
                    subtext={task.subtext}
                    checked={checkedSet.has(task.id)}
                    onChange={handleToggle}
                    onLearnMore={task.learnMore ? () => setActiveLearnMore(task) : undefined}
                  />
                </motion.div>
              ))}
            </CollapsibleSection>
          )
        })}
      </motion.div>

      {visibleTasks.length === 0 && (
        <div className="text-center py-12 text-text-muted font-sans text-sm">
          No tasks scheduled for {friendlyDateLabel}.
        </div>
      )}

      <LearnMoreModal
        open={!!activeLearnMore}
        title={activeLearnMore?.label ?? ''}
        body={activeLearnMore?.learnMore}
        onClose={() => setActiveLearnMore(null)}
      />
    </div>
  )
}
