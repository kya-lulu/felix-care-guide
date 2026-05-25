import React, { useMemo, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import { CollapsibleSection } from './CollapsibleSection'
import { CheckboxRow, DeepLink } from './CheckboxRow'
import { LearnMoreModal } from './LearnMoreModal'
import { DaySelector, DayId, getDayId, dateForDayInCurrentWeek, toISODate } from './DaySelector'

type TaskSection = 'morning' | 'midday' | 'evening' | 'night'

interface Task {
  id: string
  label: string
  subtext?: string
  /** Always-visible callout for safety-critical info. */
  reminder?: string
  /** Optional deep-link pill (e.g. tamlinfarm.org). */
  deepLink?: DeepLink
  learnMore?: React.ReactNode
  /** If omitted, task shows every day. */
  days?: DayId[]
  section: TaskSection
}

const TASKS: Task[] = [
  // ── MORNING ───────────────────────────────────────────────
  {
    id: 'm1',
    section: 'morning',
    label: 'Let dogs out (or walk)',
    subtext: 'A walk is better than just letting them out — they poop better on walks.',
    reminder:
      'Wait until BOTH dogs pee AND poop. Especially Lulu — if she doesn\'t go outside, she will go in the house.',
    learnMore: (
      <>
        <p>
          Take both dogs out together first thing (around 7–8am). A morning walk is the cleaner option — they poop better on walks than in the yard.
        </p>
        <p>
          If Lulu only pees on a quick let-out, she'll need a second trip later — she has a small bladder and a history of going in the house if she doesn't poop on the first trip.
        </p>
        <p className="font-mono text-xs text-text-muted">
          Kya's harness is on the hook by the door (red). Lulu doesn't need a harness for the backyard.
        </p>
        <p className="text-xs text-text-muted">
          <strong>Lulu safety:</strong> if you're in the back garden, keep her in the front part — the terrace stairs are tough on her back. Front yard &gt; backyard for casual potty breaks. If she sees another dog, pick her up (chest + hind) until it passes.
        </p>
      </>
    ),
  },
  {
    id: 'm2',
    section: 'morning',
    label: 'Feed both dogs',
    subtext: 'Lulu: scoop from white box (⅓). Kya: silver cup — half/half split.',
    reminder: 'Kya\'s meals are a half/half split — watch the video Terry airdropped. Don\'t just give her one full cup of either food.',
    learnMore: (
      <>
        <p>
          Feed in separate rooms so Kya doesn't snarf Lulu's food. Kya eats in the kitchen; Lulu eats in the dining area.
        </p>
        <p>
          <strong>Lulu — white box.</strong> The cup is already inside, pre-measured to ⅓ cup. One scoop. Add ½ scoop pumpkin probiotic (white tin with orange cap) if she hasn't pooped well lately.
        </p>
        <p>
          <strong>Kya — silver cup in her bin.</strong> One silver cup per meal — but it's a <strong>half / half split</strong> of two foods. Watch Terry's airdropped video for the split. If you didn't get it, text Terry — don't guess.
        </p>
      </>
    ),
  },
  {
    id: 'm_blinds',
    section: 'morning',
    label: 'Open blinds throughout the house',
    subtext: 'So the indoor plants get sunlight all day.',
    learnMore: (
      <>
        <p>Open the blinds in every room with plants — especially the guest bedroom, which has the most light-loving ones.</p>
        <p>You can close them before you leave for the evening if you'd like; the morning and midday light is what matters most.</p>
      </>
    ),
  },
  {
    id: 'm_compost',
    section: 'morning',
    label: 'Check compost bin',
    subtext: 'Take it out only if it\'s overflowing.',
    learnMore: (
      <>
        <p>
          Just a glance — if the indoor compost bin is overflowing, empty it into the green outdoor bin. Otherwise leave it.
        </p>
        <p className="text-xs text-text-muted">
          And keep the counter wiped down + no food left out — ants will swarm if they find crumbs.
        </p>
      </>
    ),
  },
  {
    id: 'm3',
    section: 'morning',
    label: 'Backyard — every-visit watering',
    subtext: 'Tulip ring (¼ can) + red currant & raspberry (1 can at roots).',
    deepLink: { url: 'https://tamlinfarm.org', label: 'See the garden on tamlinfarm.org' },
    learnMore: (
      <>
        <p><strong>Fill the can at the hose splitter:</strong> place the can under the spout, toggle the splitter ON, wait for it to fill, toggle OFF.</p>
        <p><strong>Then water these two every-visit items:</strong></p>
        <ul className="list-disc list-inside space-y-1 pl-1">
          <li><strong>Tulip-ring flower circle</strong> — about ¼ can, poured at the roots.</li>
          <li><strong>Red currant + raspberry</strong> — 1 full can at the roots.</li>
        </ul>
        <p className="text-xs text-text-muted">
          Watch the soil cue: when the surface turns dark and a thin liquid layer pools briefly before soaking in, that bed is done.
        </p>
      </>
    ),
  },
  {
    id: 'm_sunnybeds',
    section: 'morning',
    label: 'Sunny? Water the 3 priority beds',
    subtext: 'T2 leafy greens · T2 brassicas/cauliflower · T1 sunny edibles.',
    reminder: 'Only if it\'s been sunny / no recent rain. Skip otherwise — rain handles it.',
    deepLink: { url: 'https://tamlinfarm.org', label: 'See beds on tamlinfarm.org' },
    learnMore: (
      <>
        <p>On sunny days, water all three of these backyard beds deeply at the roots:</p>
        <ul className="list-disc list-inside space-y-1 pl-1">
          <li><strong>T2 leafy greens</strong> — kale, chard, arugula, bok choy.</li>
          <li><strong>T2 right</strong> — brassicas, cauliflower.</li>
          <li><strong>T1 sunny edibles</strong> — snap peas, beans, starts.</li>
        </ul>
        <p className="text-xs text-text-muted">If it's been raining heavily, skip these — rain is doing the work.</p>
      </>
    ),
  },
  {
    id: 'm_blueberries',
    section: 'morning',
    label: 'Water blueberries',
    subtext: '1 full can PER blueberry plant — main repeat chore.',
    days: ['mon', 'thu', 'sun'],
    reminder: 'Every 3 days. This one takes effort — don\'t shortcut the per-plant pour.',
    learnMore: (
      <>
        <p>
          Every 3 days (Mon / Thu / Sun on this calendar), pour <strong>one full can per blueberry plant</strong> at the root ball. NE fence row.
        </p>
        <p className="text-xs text-text-muted">
          This is the main repeat chore in the backyard. Slow, deep pour at the base — not a sprinkle.
        </p>
      </>
    ),
  },
  {
    id: 'm_pollinators',
    section: 'morning',
    label: 'Water native pollinator bed',
    subtext: '~1 can around the base.',
    days: ['mon', 'wed', 'fri'],
    learnMore: (
      <>
        <p>Every 2–3 days (Mon / Wed / Fri here), pour about <strong>one full can</strong> around the base of the native pollinators (T3).</p>
      </>
    ),
  },
  {
    id: 'm_houseplants',
    section: 'morning',
    label: 'Water house plants',
    subtext: 'Less water than outside — just a bit wet, not soaked.',
    reminder: 'Pour slowly until the topsoil darkens; stop before any drainage runs. Underwater > overwater.',
    days: ['tue', 'thu', 'sat'],
    learnMore: (
      <>
        <p>Indoor plants need <strong>much less water than the outdoor garden</strong> — most just want the soil to be a bit wet, not soaked. Sweep through each room:</p>
        <ul className="list-disc list-inside space-y-1 pl-1">
          <li>
            <strong>Living room / dining area:</strong> plants on the window sill, plants in front of the big windows, the small <em>orchid</em> and <em>lucky bamboo</em> on the fireplace mantle, and a plant on the dining room table.
          </li>
          <li>
            <strong>Office:</strong> just the plants on the window sill.
          </li>
          <li>
            <strong>Guest bedroom:</strong> just the plants near the window.
          </li>
        </ul>
        <p>
          Stick a finger about an inch into the soil — if it's dry, pour slowly until the topsoil darkens; if it's still moist, skip that plant.
        </p>
        <p className="text-xs text-text-muted">
          <strong>Orchid + lucky bamboo special cases:</strong> the orchid wants a small pour of water into the bark and that's it — don't flood it. The lucky bamboo lives in water only; just top its vase off to the original line.
        </p>
        <p className="text-xs text-text-muted">
          When in doubt, underwater rather than overwater. Yellowing leaves usually mean too much water, not too little.
        </p>
      </>
    ),
  },
  {
    id: 'm_deck',
    section: 'morning',
    label: 'Water deck plants',
    subtext: '1–1.25 cans per pot at the roots. Japanese maple: just 1 can.',
    learnMore: (
      <>
        <p>
          All deck plants are potted — same species as the tamlinfarm.org beds, just up here. Across-the-board rule: pour about <strong>1 to 1.25 black cans</strong> at the roots of each pot.
        </p>
        <p>
          <strong>Visual cue:</strong> the soil surface darkens toward black and a thin liquid layer pools briefly before soaking down. That's your signal to stop.
        </p>
        <p>
          <strong>Japanese maple — specialty:</strong> just <strong>one</strong> full can. The goal is to keep it cool, not soak it. Watch the trunk/branches — properly cooled, the wood looks darker brown (damp) instead of its dry warm-tan shade.
        </p>
      </>
    ),
  },
  {
    id: 'm_frontyard',
    section: 'morning',
    label: 'Front yard — 3 watering zones',
    subtext: 'Right: 2–2.5 cans · Left: 2 cans · Delphinium / iris / lungwort: 1 can.',
    deepLink: { url: 'https://tamlinfarm.org/#front-yard', label: 'See front-yard plants on tamlinfarm.org' },
    learnMore: (
      <>
        <p>Three zones, all watered at the roots with the same black can. About <strong>5 to 5.5 cans total</strong>.</p>
        <ul className="list-disc list-inside space-y-1 pl-1">
          <li><strong>Right side — ~2 to 2.5 cans:</strong> lavender, mulberry, peppers, rhododendron.</li>
          <li><strong>Left side — ~2 cans:</strong> strawberries, salvia, bergamot, three small flowers, fig.</li>
          <li><strong>Delphiniums / irises / lungwort — 1 can.</strong></li>
        </ul>
        <p className="text-xs text-text-muted">Same soil cue as the deck — stop when the surface darkens and a thin liquid layer pools briefly.</p>
      </>
    ),
  },
  {
    id: 'm4',
    section: 'morning',
    label: 'Send Terry a photo',
    subtext: 'From T4 — the bottom terrace near the street.',
    learnMore: (
      <>
        <p>Stand at the lowest terrace (T4) facing uphill toward the house. Snap a photo that shows the plants. Text it to Terry.</p>
        <p>This is how Terry keeps an eye on the farm — no caption needed, just send the shot.</p>
      </>
    ),
  },
  {
    id: 'm5',
    section: 'morning',
    label: 'Feed fish tanks',
    subtext: '10g + 9g + 7g (living room). Pinch of flakes each — like a pinch of salt.',
    days: ['mon', 'wed', 'fri', 'sun'],
    learnMore: (
      <>
        <p>
          The <strong>three living-room tanks</strong> (10g, 9g, 7g) get a small pinch of flakes each, sprinkled across the surface. About the same amount you'd grab as a pinch of salt — not a heaped scoop.
        </p>
        <p>
          <strong>Cadence:</strong> every 2–3 days. The calendar puts that on Mon / Wed / Fri / Sun.
        </p>
        <p>
          <strong>4g Planted Betta:</strong> not on your list — Terry handles it. Skip.
        </p>
        <p className="text-xs text-text-muted">
          Any gasping at the surface, clamped fins, white spots, or a dead fish → text Terry immediately.
        </p>
      </>
    ),
  },

  // ── MIDDAY ────────────────────────────────────────────────
  {
    id: 'md1',
    section: 'midday',
    label: 'Lulu potty check',
    subtext: 'Every ~3 hours. Quick trip to the front yard.',
    reminder: '5 hours is the absolute max — she will go in the house past that.',
    learnMore: (
      <>
        <p>
          Lulu can hold it about 5 hours max, but aim for every 3. A quick trip to the front yard is enough if she just needs to pee.
        </p>
        <p>If she hasn't pooped since morning, give her a little extra sniff time on this trip.</p>
      </>
    ),
  },
  {
    id: 'md2',
    section: 'midday',
    label: 'Feed both dogs',
    subtext: 'Lulu: scoop from white box. Kya: silver cup, half/half split.',
    learnMore: (
      <>
        <p>Same as morning — feed in separate rooms.</p>
        <p>Lulu uses the pre-measured cup in her white box (⅓ cup). Kya gets one silver cup as the half/half split (see the video Terry sent).</p>
      </>
    ),
  },
  {
    id: 'md3',
    section: 'midday',
    label: 'Noon — Discovery Park + fetch for Kya',
    subtext: 'Ball + thrower live beside the Ridwell bin.',
    reminder: 'Underhand rolls only — no jump catches (Kya\'s knee).',
    learnMore: (
      <>
        <p>
          Around noon, take both dogs to <strong>Discovery Park</strong>. Walk around, then throw the ball for Kya.
        </p>
        <p>
          <strong>The ball and the thrower are sitting beside the Ridwell bin</strong> — grab them on the way out.
        </p>
        <p>
          Throw <strong>underhand</strong> so the ball rolls along the ground. No high throws / bounces — she'll leap to catch and risk her cranial-cruciate ligament (partial tear).
        </p>
        <p className="text-xs text-text-muted">
          Avoid skaters and skateboarders — she reacts. Holding the leash in her mouth at the start of a walk is normal and fine.
        </p>
        <p className="text-xs text-text-muted">
          <strong>Lulu:</strong> on leash the whole time. If she sees another dog, pick her up until it passes.
        </p>
      </>
    ),
  },
  {
    id: 'md_walk',
    section: 'midday',
    label: 'Late afternoon walk',
    subtext: 'Both dogs. Second outing of the day.',
    learnMore: (
      <>
        <p>
          A second walk in the late afternoon (~4–5pm) — bridges between the noon park trip and the evening walk. Doesn't need to be long; just a real walk so they get another poop in.
        </p>
      </>
    ),
  },

  // ── EVENING ───────────────────────────────────────────────
  {
    id: 'e1',
    section: 'evening',
    label: 'Feed both dogs',
    subtext: 'Lulu: scoop from white box. Kya: silver cup, half/half split.',
    learnMore: (
      <>
        <p>Same as the other meals — Lulu's pre-measured cup from the white box, Kya's silver cup with the half/half split.</p>
        <p>Separate rooms.</p>
      </>
    ),
  },
  {
    id: 'e2',
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

  // ── NIGHT (before bed) ────────────────────────────────────
  {
    id: 'n1',
    section: 'night',
    label: 'Small night feed',
    subtext: 'Kya: ½ silver cup (NOT optional). Lulu: small top-off.',
    reminder:
      'Kya MUST eat this. Her stomach gets empty overnight and she throws up yellow bile if she skips it. Sit with her until she finishes.',
    learnMore: (
      <>
        <p>
          Small top-off meal so neither dog is hungry overnight — but for Kya this is <strong>not optional</strong>.
        </p>
        <p>
          <strong>Kya:</strong> about ½ silver cup. If her stomach goes empty through the night, she pukes up yellow bile in the morning. If she seems uninterested, sit next to her bowl and coax her — hand-feed a few pieces if needed.
        </p>
        <p>
          <strong>Lulu:</strong> small top-off (~¼ cup). She'll always eat, no problem. Skip if Terry says so — the main 3 meals/day are enough.
        </p>
      </>
    ),
  },
  {
    id: 'n_lock',
    section: 'night',
    label: 'Lock front + back doors',
    subtext: 'Both doors locked before you sleep.',
    reminder: 'Also lock any time you leave the house during the day.',
    learnMore: (
      <>
        <p>
          Last thing before bed — make sure both the front door and the back door are locked.
        </p>
        <p className="text-xs text-text-muted">
          Same rule applies any time you go out during the day. See the House tab for the full lock-up + Lulu-crate routine when leaving.
        </p>
      </>
    ),
  },
  {
    id: 'n2',
    section: 'night',
    label: 'Final potty — let them out through the garden',
    subtext: 'No full walk needed; just a quick garden release.',
    reminder: 'Skipping this = accident in the house by morning, especially for Lulu.',
    learnMore: (
      <>
        <p>
          Last thing before bed — open the back door and let them out through the garden for a quick pee. No need for a full walk; this one's just a release.
        </p>
        <p>Wait for both to pee. Lulu should also poop if she hasn't yet in the evening.</p>
        <p className="text-xs text-text-muted">
          Lulu: keep her in the front part of the garden — don't let her run the terrace stairs in the dark.
        </p>
      </>
    ),
  },
  {
    id: 'n_bins',
    section: 'night',
    label: 'Take garbage bins out to the curb',
    subtext: 'Pickup is Monday morning — bins must be at the curb by then.',
    days: ['sun'],
    reminder: 'Sunday night only. If you miss it, the bins sit full for another week.',
    learnMore: (
      <>
        <p>
          Pickup truck comes Monday morning. Roll all three bins from the side of the house out to the curb on Sunday night before you go to bed.
        </p>
        <ul className="list-disc list-inside space-y-1 pl-1">
          <li><strong>Black bin</strong> — landfill garbage</li>
          <li><strong>Blue bin</strong> — recycling</li>
          <li><strong>Green bin</strong> — yard waste / compost</li>
        </ul>
        <p className="text-xs text-text-muted">
          Park them at the curb with the handles facing the house and at least 3 feet of space between each bin so the truck arm can grab them.
        </p>
        <p className="text-xs text-text-muted">
          Bring them back in Monday after work / once you see they've been emptied.
        </p>
      </>
    ),
  },
]

const SECTION_META: Record<TaskSection, { title: string; hint: string }> = {
  morning: { title: 'Morning', hint: 'When you wake up — usually 8:00–8:30' },
  midday: { title: 'Midday', hint: 'Around 12–2pm' },
  evening: { title: 'Evening', hint: 'Around 6–7pm' },
  night: { title: 'Night', hint: 'Right before you go to bed' },
}

const SECTION_ORDER: TaskSection[] = ['morning', 'midday', 'evening', 'night']
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

  const visibleTasks = useMemo(
    () => TASKS.filter((t) => !t.days || t.days.includes(selectedDay)),
    [selectedDay],
  )

  const tasksBySection = useMemo(() => {
    const out: Record<TaskSection, Task[]> = { morning: [], midday: [], evening: [], night: [] }
    for (const t of visibleTasks) out[t.section].push(t)
    return out
  }, [visibleTasks])

  const totalDone = visibleTasks.filter((t) => checkedSet.has(t.id)).length
  const allDone = visibleTasks.length > 0 && totalDone === visibleTasks.length

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateByDate))
    } catch {}
  }, [stateByDate])

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
        {SECTION_ORDER.map((section) => {
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
                    reminder={task.reminder}
                    deepLink={task.deepLink}
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
