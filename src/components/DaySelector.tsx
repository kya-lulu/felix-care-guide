import React, { useEffect, useRef } from 'react'

export type DayId = 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat'

export const WEEK_DAYS: DayId[] = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']

const DAY_LABEL: Record<DayId, string> = {
  mon: 'Mon',
  tue: 'Tue',
  wed: 'Wed',
  thu: 'Thu',
  fri: 'Fri',
  sat: 'Sat',
  sun: 'Sun',
}

export function getDayId(date: Date): DayId {
  return (['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'] as DayId[])[date.getDay()]
}

/**
 * Returns the date for a given DayId in the current week, where the week starts Monday.
 * "today" is whatever the caller passes in (defaults to now).
 */
export function dateForDayInCurrentWeek(day: DayId, today: Date = new Date()): Date {
  // Normalize today to local midnight
  const base = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  const jsDay = base.getDay() // 0=sun..6=sat
  // Offset from Monday = 0 for Mon, 1 for Tue, ..., 5 for Sat, 6 for Sun
  const mondayOffset = (jsDay + 6) % 7
  const monday = new Date(base)
  monday.setDate(base.getDate() - mondayOffset)
  const targetIndex = WEEK_DAYS.indexOf(day)
  const result = new Date(monday)
  result.setDate(monday.getDate() + targetIndex)
  return result
}

export function toISODate(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

interface DaySelectorProps {
  selectedDay: DayId
  onSelectDay: (day: DayId) => void
  today: Date
}

export function DaySelector({ selectedDay, onSelectDay, today }: DaySelectorProps) {
  const todayId = getDayId(today)
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const selectedRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    // Center the selected chip on mount / when selection changes
    if (selectedRef.current && scrollRef.current) {
      selectedRef.current.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' })
    }
  }, [selectedDay])

  return (
    <div
      ref={scrollRef}
      className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 snap-x snap-mandatory scrollbar-none"
      style={{ scrollbarWidth: 'none' }}
      role="tablist"
      aria-label="Day of week"
    >
      {WEEK_DAYS.map((day) => {
        const date = dateForDayInCurrentWeek(day, today)
        const isSelected = day === selectedDay
        const isToday = day === todayId
        return (
          <button
            key={day}
            ref={isSelected ? selectedRef : null}
            onClick={() => onSelectDay(day)}
            role="tab"
            aria-selected={isSelected}
            className={`flex-shrink-0 snap-center flex flex-col items-center justify-center min-w-[54px] min-h-[64px] rounded-xl px-3 py-2 transition-all border-2 ${
              isSelected
                ? 'bg-primary text-card border-primary shadow-sm'
                : isToday
                ? 'bg-card text-primary border-accent/70'
                : 'bg-card text-text-muted border-border hover:border-primary/40'
            }`}
          >
            <span className={`font-mono text-[10px] uppercase tracking-wider ${isSelected ? 'text-card/80' : isToday ? 'text-accent' : 'text-text-muted'}`}>
              {isToday ? 'Today' : DAY_LABEL[day]}
            </span>
            <span className={`font-serif text-lg font-semibold leading-none mt-1 ${isSelected ? 'text-card' : 'text-primary'}`}>
              {date.getDate()}
            </span>
            {!isToday && (
              <span className={`font-mono text-[9px] uppercase tracking-wider mt-0.5 ${isSelected ? 'text-card/70' : 'text-text-muted'}`}>
                {DAY_LABEL[day]}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
