import React from 'react'
import { WarningBox } from './WarningBox'

interface DogCardProps {
  name: string
  age: number
  breed: string
  food: string
  schedule: string
  warning?: string
  notes?: string
  vetInfo: { name: string; phone: string }
  emergencyInfo: { name: string; phone: string }
  headerColor: 'primary' | 'brown'
}

export function DogCard({ name, age, breed, food, schedule, warning, notes, vetInfo, emergencyInfo, headerColor }: DogCardProps) {
  const headerClass = headerColor === 'primary' ? 'bg-primary' : 'bg-brown'
  return (
    <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden mb-6">
      <div className={`${headerClass} text-card p-5`}>
        <h2 className="font-serif text-3xl font-bold mb-1">{name}</h2>
        <p className="font-mono text-sm opacity-90">Age: {age} | {breed}</p>
      </div>
      <div className="p-5 space-y-5">
        <div>
          <h3 className="font-sans font-bold text-primary text-sm uppercase tracking-wider mb-2">Food</h3>
          <p className="font-sans text-text leading-relaxed">{food}</p>
        </div>
        <div>
          <h3 className="font-sans font-bold text-primary text-sm uppercase tracking-wider mb-2">Schedule</h3>
          <p className="font-sans text-text leading-relaxed">{schedule}</p>
        </div>
        {notes && (
          <div>
            <h3 className="font-sans font-bold text-primary text-sm uppercase tracking-wider mb-2">Notes</h3>
            <p className="font-sans text-text leading-relaxed">{notes}</p>
          </div>
        )}
        {warning && <WarningBox type="warning">{warning}</WarningBox>}
        <div className="pt-4 border-t border-border">
          <h3 className="font-sans font-bold text-primary text-sm uppercase tracking-wider mb-3">Veterinary Info</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-sans text-sm text-text-muted">{vetInfo.name}</span>
              <a href={`tel:${vetInfo.phone.replace(/-/g, '')}`} className="font-mono text-sm text-primary font-medium min-h-[44px] flex items-center">{vetInfo.phone}</a>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-sans text-sm text-text-muted">{emergencyInfo.name}</span>
              <a href={`tel:${emergencyInfo.phone.replace(/-/g, '')}`} className="font-mono text-sm text-accent font-medium min-h-[44px] flex items-center">{emergencyInfo.phone}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
