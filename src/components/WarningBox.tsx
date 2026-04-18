import React from 'react'
import { AlertTriangle, Info } from 'lucide-react'

interface WarningBoxProps {
  children: React.ReactNode
  type?: 'warning' | 'info'
  className?: string
}

export function WarningBox({ children, type = 'warning', className = '' }: WarningBoxProps) {
  const isWarning = type === 'warning'
  return (
    <div className={`flex items-start gap-3 p-4 rounded-xl ${isWarning ? 'bg-warning-bg text-accent' : 'bg-primary/10 text-primary'} ${className}`}>
      <div className="shrink-0 mt-0.5">
        {isWarning ? <AlertTriangle className="w-5 h-5" strokeWidth={2.5} /> : <Info className="w-5 h-5" strokeWidth={2.5} />}
      </div>
      <div className={`font-sans text-sm leading-relaxed ${isWarning ? 'font-medium' : ''}`}>
        {children}
      </div>
    </div>
  )
}
