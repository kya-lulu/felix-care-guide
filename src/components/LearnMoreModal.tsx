import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface LearnMoreModalProps {
  open: boolean
  title: string
  body: React.ReactNode
  onClose: () => void
}

export function LearnMoreModal({ open, title, body, onClose }: LearnMoreModalProps) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="learnmore-title"
        >
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="w-full sm:max-w-md bg-card rounded-t-2xl sm:rounded-2xl shadow-xl border-t sm:border border-border overflow-hidden max-h-[85vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3 px-5 pt-5 pb-3 border-b border-border">
              <h3 id="learnmore-title" className="font-serif text-xl font-semibold text-primary leading-tight">
                {title}
              </h3>
              <button
                onClick={onClose}
                aria-label="Close"
                className="flex-shrink-0 w-9 h-9 rounded-full hover:bg-border/40 flex items-center justify-center text-primary/70 min-h-[44px] min-w-[44px]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="px-5 py-4 overflow-y-auto text-text font-sans text-sm leading-relaxed space-y-3">
              {body}
            </div>
            <div className="px-5 pb-5 pt-2">
              <button
                onClick={onClose}
                className="w-full bg-primary text-card font-sans font-medium rounded-full py-3 min-h-[44px] hover:bg-primary/90 transition-colors"
              >
                Got it
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
