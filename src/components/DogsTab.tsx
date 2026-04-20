import React from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, Heart, Activity, Brain, Droplet, ExternalLink } from 'lucide-react'
import { WarningBox } from './WarningBox'

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
}

/** Schematic diagram showing correct vs. incorrect way to hold a dachshund. */
function DachshundHoldingDiagram() {
  return (
    <div className="bg-card rounded-xl border border-border p-4 mb-3">
      <h4 className="font-serif text-base font-semibold text-primary mb-3 text-center">
        How to pick Lulu up
      </h4>
      <svg
        viewBox="0 0 440 240"
        className="w-full max-w-md mx-auto"
        role="img"
        aria-label="Diagram showing correct horizontal two-hand hold vs. incorrect vertical armpit hold for a dachshund"
      >
        {/* ── LEFT panel: CORRECT ─────────────────────────── */}
        <g>
          <rect x="6" y="6" width="210" height="228" rx="12" fill="#e6efe8" stroke="#2d4a35" strokeWidth="1.5" />
          <circle cx="30" cy="28" r="13" fill="#2d4a35" />
          <text x="30" y="33" textAnchor="middle" fontFamily="sans-serif" fontSize="15" fontWeight="bold" fill="#faf7f2">✓</text>
          <text x="50" y="32" fontFamily="sans-serif" fontSize="12" fontWeight="bold" fill="#2d4a35">DO THIS</text>

          {/* Horizontal dachshund */}
          {/* Tail */}
          <path d="M 30 108 Q 15 100 22 92" stroke="#8B6F47" strokeWidth="5" strokeLinecap="round" fill="none" />
          {/* Body (long sausage) */}
          <ellipse cx="110" cy="112" rx="72" ry="17" fill="#8B6F47" />
          {/* Head */}
          <circle cx="180" cy="102" r="16" fill="#8B6F47" />
          {/* Snout */}
          <ellipse cx="193" cy="108" rx="8" ry="6" fill="#8B6F47" />
          {/* Nose */}
          <circle cx="197" cy="108" r="2" fill="#2c2c2c" />
          {/* Eye */}
          <circle cx="181" cy="100" r="1.5" fill="#2c2c2c" />
          {/* Ear (floppy) */}
          <path d="M 170 92 Q 163 95 168 115 Q 175 108 177 95 Z" fill="#6b5537" />
          {/* Front legs */}
          <rect x="145" y="126" width="6" height="14" rx="2" fill="#8B6F47" />
          <rect x="158" y="126" width="6" height="14" rx="2" fill="#8B6F47" />
          {/* Back legs */}
          <rect x="55" y="126" width="6" height="14" rx="2" fill="#8B6F47" />
          <rect x="68" y="126" width="6" height="14" rx="2" fill="#8B6F47" />

          {/* Two supporting hands */}
          {/* Front hand (chest) */}
          <ellipse cx="145" cy="146" rx="24" ry="7" fill="#f4c895" stroke="#2d4a35" strokeWidth="1" />
          {/* Back hand (rump) */}
          <ellipse cx="70" cy="146" rx="24" ry="7" fill="#f4c895" stroke="#2d4a35" strokeWidth="1" />

          {/* Arrows */}
          <line x1="145" y1="175" x2="145" y2="158" stroke="#2d4a35" strokeWidth="1.5" />
          <polygon points="145,154 141,162 149,162" fill="#2d4a35" />
          <line x1="70" y1="175" x2="70" y2="158" stroke="#2d4a35" strokeWidth="1.5" />
          <polygon points="70,154 66,162 74,162" fill="#2d4a35" />

          {/* Labels */}
          <text x="70" y="190" textAnchor="middle" fontFamily="sans-serif" fontSize="9" fontWeight="bold" fill="#2d4a35">Support hind</text>
          <text x="145" y="190" textAnchor="middle" fontFamily="sans-serif" fontSize="9" fontWeight="bold" fill="#2d4a35">Support chest</text>
          <text x="110" y="214" textAnchor="middle" fontFamily="sans-serif" fontSize="11" fontWeight="bold" fill="#2d4a35">Keep spine LEVEL</text>
        </g>

        {/* ── RIGHT panel: INCORRECT ──────────────────────── */}
        <g>
          <rect x="224" y="6" width="210" height="228" rx="12" fill="rgba(196,112,79,0.12)" stroke="#c4704f" strokeWidth="1.5" />
          <circle cx="248" cy="28" r="13" fill="#c4704f" />
          <text x="248" y="33" textAnchor="middle" fontFamily="sans-serif" fontSize="15" fontWeight="bold" fill="#faf7f2">✗</text>
          <text x="268" y="32" fontFamily="sans-serif" fontSize="12" fontWeight="bold" fill="#c4704f">NEVER</text>

          {/* Armpit hand at top */}
          <ellipse cx="329" cy="70" rx="28" ry="7" fill="#f4c895" stroke="#2d4a35" strokeWidth="1" />

          {/* Dangling dachshund (vertical) */}
          {/* Head */}
          <circle cx="329" cy="90" r="14" fill="#8B6F47" />
          {/* Ear */}
          <path d="M 318 88 Q 314 96 322 102 Z" fill="#6b5537" />
          {/* Eye */}
          <circle cx="325" cy="86" r="1.2" fill="#2c2c2c" />
          {/* Snout */}
          <ellipse cx="340" cy="94" rx="7" ry="5" fill="#8B6F47" />
          <circle cx="344" cy="94" r="1.5" fill="#2c2c2c" />
          {/* Body (vertical, stretched) */}
          <ellipse cx="329" cy="150" rx="17" ry="52" fill="#8B6F47" />
          {/* Hanging legs */}
          <rect x="320" y="186" width="4" height="16" rx="1.5" fill="#8B6F47" />
          <rect x="334" y="186" width="4" height="16" rx="1.5" fill="#8B6F47" />
          {/* Tail drooping */}
          <path d="M 329 204 Q 326 212 332 218" stroke="#8B6F47" strokeWidth="4" strokeLinecap="round" fill="none" />

          {/* Big red X over the scene */}
          <line x1="260" y1="80" x2="400" y2="200" stroke="#c4704f" strokeWidth="5" strokeLinecap="round" opacity="0.55" />
          <line x1="400" y1="80" x2="260" y2="200" stroke="#c4704f" strokeWidth="5" strokeLinecap="round" opacity="0.55" />

          {/* Labels */}
          <text x="329" y="223" textAnchor="middle" fontFamily="sans-serif" fontSize="10" fontWeight="bold" fill="#c4704f">Strains spine → IVDD risk</text>
        </g>
      </svg>

      <p className="font-sans text-xs text-text-muted text-center mt-2 leading-snug">
        One hand under the chest, the other under the hind quarters. Keep her back flat and horizontal — never pick her up under the armpits or let her back legs dangle.
      </p>
    </div>
  )
}

interface SectionBlockProps {
  icon: React.ReactNode
  title: string
  children: React.ReactNode
}
function SectionBlock({ icon, title, children }: SectionBlockProps) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-primary">{icon}</span>
        <h3 className="font-sans font-bold text-primary text-sm uppercase tracking-wider">{title}</h3>
      </div>
      <div className="font-sans text-sm text-text leading-relaxed space-y-2">{children}</div>
    </div>
  )
}

interface DoDontListProps {
  dos: string[]
  donts: string[]
}
function DoDontList({ dos, donts }: DoDontListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
        <p className="font-mono text-xs font-bold text-primary uppercase tracking-wider mb-2">✓ Do</p>
        <ul className="space-y-1.5 font-sans text-sm text-text">
          {dos.map((d, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-primary flex-shrink-0">•</span>
              <span>{d}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-accent/10 border border-accent/30 rounded-lg p-3">
        <p className="font-mono text-xs font-bold text-accent uppercase tracking-wider mb-2">✗ Don't</p>
        <ul className="space-y-1.5 font-sans text-sm text-text">
          {donts.map((d, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-accent flex-shrink-0">•</span>
              <span>{d}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

interface VetRowProps {
  label: string
  name: string
  phone: string
  isEmergency?: boolean
}
function VetRow({ label, name, phone, isEmergency }: VetRowProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-1">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-wider text-text-muted">{label}</p>
        <p className="font-sans text-sm text-text">{name}</p>
      </div>
      <a
        href={`tel:${phone.replace(/-/g, '')}`}
        className={`font-mono text-sm font-medium min-h-[44px] flex items-center ${isEmergency ? 'text-accent' : 'text-primary'}`}
      >
        {phone}
      </a>
    </div>
  )
}

// ───────────────────────────────────────────────────────────

function LuluCard() {
  return (
    <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden mb-6">
      <div className="bg-primary text-card p-5">
        <h2 className="font-serif text-3xl font-bold mb-1">Lulu</h2>
        <p className="font-mono text-sm opacity-90">Age 6 · Mini Dachshund</p>
      </div>

      <div className="p-5 space-y-6">
        <WarningBox type="warning">
          <strong>Her back is the #1 health priority.</strong> Dachshunds are extremely prone to IVDD
          (intervertebral disc disease) — a slipped disc can mean paralysis. Every rule below exists
          to protect her spine.
        </WarningBox>

        <DachshundHoldingDiagram />

        <SectionBlock icon={<Heart className="w-4 h-4" />} title="Back health (IVDD)">
          <p>
            About 1 in 4 dachshunds develop IVDD in their lifetime. The discs between her vertebrae are
            long and fragile. Any impact, twist, or jump can rupture one.
          </p>
          <p className="text-xs text-text-muted">
            <strong>Warning signs:</strong> reluctance to move, yelping when touched, hunched posture, wobbly
            back legs, or inability to stand. Text Terry immediately and call the vet or ER.
          </p>
        </SectionBlock>

        <SectionBlock icon={<Activity className="w-4 h-4" />} title="Knees (loose kneecaps)">
          <p>
            Lulu also has loose kneecaps — they can slip out of their groove, especially when she jumps
            down from the couch or lands awkwardly on hardwood. It's not as serious as the IVDD risk,
            but keep couch access limited.
          </p>
        </SectionBlock>

        <SectionBlock icon={<Droplet className="w-4 h-4" />} title="Potty & water">
          <p>
            Lulu has a history of peeing in the house if she isn't taken out. Aim for outside every{' '}
            <strong>3 hours</strong>, with <strong>5 hours as the absolute maximum</strong>.
          </p>
          <p>
            Her water bowl is on the kitchen floor next to Kya's. Top it off whenever it looks low —
            dachshunds can get dehydrated quickly in dry indoor air.
          </p>
        </SectionBlock>

        <DoDontList
          dos={[
            'Carry her up and down every flight of stairs — always',
            'Support chest AND hind when picking her up (see diagram above)',
            'Help her off the couch — don\'t let her jump down',
            'Take her out every ~3 hours; front yard is fine for a quick pee',
            'Keep her on a leash — she will bolt after squirrels',
          ]}
          donts={[
            'Let her jump off the couch, bed, or any furniture',
            'Take her up/down stairs on her own legs',
            'Pick her up by the armpits or under the front legs only',
            'Let her play tug-of-war or twist aggressively',
            'Leave her longer than 5 hours without a potty break',
          ]}
        />

        <SectionBlock icon={<Heart className="w-4 h-4" />} title="Food">
          <p>
            <strong>Amounts:</strong> ⅓ of the blue measuring cup of Purino kibble, 3× daily
            (morning, midday, evening) + a small ¼-cup night feed before bed.
          </p>
          <p>
            Add ½ scoop of pumpkin probiotic (white tin with orange cap) if she hasn't pooped well
            lately. Feed in the dining area — separate from Kya.
          </p>
        </SectionBlock>

        <div className="pt-4 border-t border-border space-y-2">
          <h3 className="font-sans font-bold text-primary text-sm uppercase tracking-wider">Vet info</h3>
          <VetRow label="Primary vet" name="Mercer Street Animal Hospital" phone="206-285-0395" />
          <VetRow label="Emergency" name="Veterinary Emergency Group" phone="564-888-4898" isEmergency />
        </div>
      </div>
    </div>
  )
}

function KyaCard() {
  return (
    <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden mb-6">
      <div className="bg-brown text-card p-5">
        <h2 className="font-serif text-3xl font-bold mb-1">Kya</h2>
        <p className="font-mono text-sm opacity-90">Age 6 · Australian Shepherd Mix (Blue Merle)</p>
      </div>

      <div className="p-5 space-y-6">
        <WarningBox type="warning">
          <strong>Partial ACL tear (knee).</strong> No jumping, no sudden pivots, no slippery-floor
          zoomies. Keep her exercise steady and controlled so the ligament can heal.
        </WarningBox>

        <SectionBlock icon={<Activity className="w-4 h-4" />} title="Knee (partial ACL tear)">
          <p>
            Kya has a partial tear of her cranial cruciate ligament (the dog version of an ACL).
            High-impact movement can fully tear it and require surgery.
          </p>
          <p className="text-xs text-text-muted">
            <strong>Throw underhand.</strong> Roll the ball along the ground so she runs flat — no leaping
            to catch it in the air. If she starts limping after a session, cut it short and text Terry.
          </p>
        </SectionBlock>

        <SectionBlock icon={<Brain className="w-4 h-4" />} title="Energy & mental stimulation">
          <p>
            Aussies are high-drive working dogs. Physical exercise alone isn't enough — Kya needs{' '}
            <strong>mental work</strong> too. A 30-minute walk plus 15 minutes of training or puzzle
            play will tire her out more than an hour of running.
          </p>
          <p>
            <strong>What works:</strong> training games (sit / down / place / touch), a snuffle mat for
            meals, puzzle feeders, hide-and-seek with treats in the backyard, short trick sessions.
          </p>
          <p className="text-xs text-text-muted">
            Training treats live in the jar on the kitchen counter. She works for food happily — use
            small pieces.
          </p>
        </SectionBlock>

        <SectionBlock icon={<AlertTriangle className="w-4 h-4" />} title="Reactivity">
          <p>
            Kya gets reactive around <strong>skateboards</strong>, <strong>squirrels</strong>, and{' '}
            <strong>scooters</strong>. Avoid skate parks on walks. If you see a skateboarder, cross the
            street early and put yourself between them and Kya.
          </p>
          <p className="text-xs text-text-muted">
            Holding the leash in her mouth at the start of a walk is normal and fine — it's how she
            self-soothes. Don't fight her for it.
          </p>
        </SectionBlock>

        <SectionBlock icon={<Heart className="w-4 h-4" />} title="Anxiety">
          <p>
            Trazodone (in the kitchen cabinet above the fridge) is available if she's very anxious —
            thunderstorms, fireworks, or if you see her shaking / pacing for more than 20 minutes.
            Text Terry before giving a dose.
          </p>
        </SectionBlock>

        <DoDontList
          dos={[
            'Throw the ball underhand so it rolls (no jump catches)',
            'Use the red harness on walks — it gives you more control',
            'Keep her on leash outside the backyard',
            'Mix physical + mental exercise (puzzle feeder, training)',
            'Feed her in the kitchen, separate from Lulu',
          ]}
          donts={[
            'Play fetch with bounces or high throws',
            'Let her jump off the couch, the deck, or the car',
            'Take her to skate parks or near skateboarders',
            'Tug-of-war that twists her hips or knees',
            'Ignore a new limp — stop exercise and text Terry',
          ]}
        />

        <SectionBlock icon={<Heart className="w-4 h-4" />} title="Food">
          <p>
            <strong>Amounts:</strong> 1 full silver metal cup of Call-of-the-Wild kibble + scoop of
            probiotic from the orange bag, 3× daily + a smaller ½-cup night feed before bed.
          </p>
          <p className="text-accent font-medium">
            <strong>The night feed is not optional.</strong> Kya's stomach goes empty overnight and she
            pukes up yellow bile the next morning if she skips it. If she seems uninterested, coax her
            or hand-feed a few pieces to get her started.
          </p>
          <p>Feed in the kitchen, separate from Lulu.</p>
        </SectionBlock>

        <div className="pt-4 border-t border-border space-y-2">
          <h3 className="font-sans font-bold text-primary text-sm uppercase tracking-wider">Vet info</h3>
          <VetRow label="Primary vet" name="Fremont Animal Hospital" phone="206-339-3301" />
          <VetRow label="Emergency" name="Veterinary Emergency Group" phone="564-888-4898" isEmergency />
        </div>
      </div>
    </div>
  )
}

export function DogsTab() {
  return (
    <div className="pb-32 pt-6 px-4 max-w-md mx-auto">
      <header className="mb-6 text-center">
        <h1 className="font-serif text-4xl font-bold text-primary">The Dogs</h1>
        <p className="font-sans text-sm text-text-muted mt-1">Care guide for Lulu &amp; Kya</p>
      </header>

      <motion.div variants={containerVariants} initial="hidden" animate="show">
        <motion.div variants={itemVariants}>
          <LuluCard />
        </motion.div>
        <motion.div variants={itemVariants}>
          <KyaCard />
        </motion.div>
        <motion.div variants={itemVariants}>
          <div className="bg-card rounded-xl border border-border p-4 text-center">
            <p className="font-sans text-sm text-text-muted mb-2">More on dachshund back health</p>
            <a
              href="https://www.dachshundhealth.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-primary text-card rounded-full px-4 py-2 font-sans text-sm font-medium min-h-[44px]"
            >
              Dachshund Health UK — IVDD
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
