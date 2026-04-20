import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface CollapsibleSectionProps {
  title: string
  hint?: string
  completedCount?: number
  totalCount?: number
  children: React.ReactNode
  defaultExpanded?: boolean
}

export function CollapsibleSection({ title, hint, completedCount, totalCount, children, defaultExpanded = true }: CollapsibleSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)
  const showProgress = completedCount !== undefined && totalCount !== undefined
  const progressPercent = showProgress ? (completedCount / totalCount) * 100 : 0

  return (
    <div className="mb-6 bg-card rounded-xl shadow-sm border border-border overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-4 flex items-center justify-between bg-card min-h-[44px]"
        aria-expanded={isExpanded}
      >
        <div className="flex flex-col items-start gap-1">
          <h2 className="font-serif text-xl font-semibold text-primary">{title}</h2>
          {hint && (
            <span className="font-sans text-xs text-text-muted italic">{hint}</span>
          )}
          {showProgress && (
            <span className="font-mono text-xs text-text-muted uppercase tracking-wider">
              {completedCount} / {totalCount} done
            </span>
          )}
        </div>
        <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }} className="text-primary/60">
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>

      {showProgress && (
        <div className="h-1 w-full bg-border/50">
          <motion.div
            className="h-full bg-accent"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        </div>
      )}

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="p-2 space-y-1">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
