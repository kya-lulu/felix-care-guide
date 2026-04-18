import React from 'react'
import { Phone } from 'lucide-react'

export function ContactsBar() {
  return (
    <div className="fixed bottom-16 left-0 right-0 bg-primary text-card z-40 shadow-lg">
      <div className="max-w-md mx-auto px-4 py-2 flex justify-between items-center overflow-x-auto gap-4">
        <a href="tel:4153165586" className="flex items-center gap-1.5 whitespace-nowrap min-h-[44px] text-sm font-medium hover:text-accent transition-colors">
          <Phone className="w-3.5 h-3.5" />Terry
        </a>
        <a href="tel:4159050253" className="flex items-center gap-1.5 whitespace-nowrap min-h-[44px] text-sm font-medium hover:text-accent transition-colors">
          <Phone className="w-3.5 h-3.5" />Janelle
        </a>
        <a href="tel:6178005583" className="flex items-center gap-1.5 whitespace-nowrap min-h-[44px] text-sm font-medium hover:text-accent transition-colors">
          <Phone className="w-3.5 h-3.5" />Alex
        </a>
        <a href="tel:5648884898" className="flex items-center gap-1.5 whitespace-nowrap min-h-[44px] text-sm font-medium text-accent hover:text-white transition-colors">
          <Phone className="w-3.5 h-3.5" />Vet ER
        </a>
      </div>
    </div>
  )
}
