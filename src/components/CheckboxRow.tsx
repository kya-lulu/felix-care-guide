import React from 'react'
import { Check, Info } from 'lucide-react'
import { motion } from 'framer-motion'

interface CheckboxRowProps {
  id: string
  label: string
  subtext?: string
  checked: boolean
  onChange: (id: string, checked: boolean) => void
  onLearnMore?: () => void
}

export function CheckboxRow({ id, label, subtext, checked, onChange, onLearnMore }: CheckboxRowProps) {
  return (
    <motion.div
      className={`flex items-start gap-3 p-3 rounded-lg min-h-[44px] transition-all duration-200 border-l-4 ${
        checked ? 'border-l-green-500 bg-green-50/50 opacity-60' : 'border-l-red-400 hover:bg-border/20'
      }`}
      layout
    >
      <label className="flex items-start gap-3 flex-1 cursor-pointer">
        <div className="relative flex items-center justify-center mt-0.5">
          <input
            type="checkbox"
            className="peer sr-only"
            checked={checked}
            onChange={(e) => onChange(id, e.target.checked)}
          />
          <div
            className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
              checked ? 'bg-green-500 border-green-500' : 'border-red-400 bg-card'
            }`}
          >
            {checked && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
          </div>
        </div>
        <div className="flex-1">
          <p
            className={`font-sans text-base leading-tight transition-all ${
              checked ? 'line-through text-text-muted' : 'text-text font-medium'
            }`}
          >
            {label}
          </p>
          {subtext && (
            <p className={`font-sans text-sm mt-1 leading-snug ${checked ? 'text-text-muted/70' : 'text-text-muted'}`}>
              {subtext}
            </p>
          )}
        </div>
      </label>
      {onLearnMore && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onLearnMore()
          }}
          aria-label={`Learn more about: ${label}`}
          className="flex-shrink-0 w-9 h-9 rounded-full hover:bg-border/40 flex items-center justify-center text-primary/70 min-h-[44px] min-w-[44px] active:scale-95 transition-transform"
        >
          <Info className="w-5 h-5" />
        </button>
      )}
    </motion.div>
  )
}
