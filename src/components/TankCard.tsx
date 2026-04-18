import React from 'react'

interface TankCardProps {
  size: string
  title: string
  inhabitants: string
  feeding: string
}

export function TankCard({ size, title, inhabitants, feeding }: TankCardProps) {
  return (
    <div className="bg-card rounded-xl shadow-sm border border-border p-5 h-full flex flex-col">
      <div className="flex items-baseline gap-2 mb-3">
        <span className="font-serif text-2xl font-bold text-primary">{size}</span>
        <h3 className="font-sans font-medium text-text">{title}</h3>
      </div>
      <div className="space-y-4 flex-grow">
        <div>
          <span className="font-mono text-xs text-text-muted uppercase tracking-wider block mb-1">Inhabitants</span>
          <p className="font-sans text-sm text-text">{inhabitants}</p>
        </div>
        <div>
          <span className="font-mono text-xs text-text-muted uppercase tracking-wider block mb-1">Feeding</span>
          <p className="font-sans text-sm text-text leading-relaxed">{feeding}</p>
        </div>
      </div>
    </div>
  )
}
