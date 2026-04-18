import React from 'react'
import { Home, PawPrint, Leaf, Fish } from 'lucide-react'

export type TabId = 'today' | 'dogs' | 'garden' | 'aquarium'

interface BottomTabBarProps {
  activeTab: TabId
  onTabChange: (tab: TabId) => void
}

export function BottomTabBar({ activeTab, onTabChange }: BottomTabBarProps) {
  const tabs = [
    { id: 'today' as TabId, label: 'Today', icon: Home },
    { id: 'dogs' as TabId, label: 'Dogs', icon: PawPrint },
    { id: 'garden' as TabId, label: 'Garden', icon: Leaf },
    { id: 'aquarium' as TabId, label: 'Aquarium', icon: Fish },
  ]
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center w-full h-full min-h-[44px] min-w-[44px] transition-colors ${isActive ? 'text-accent' : 'text-primary/60'}`}
              aria-label={tab.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon className="w-6 h-6 mb-1" strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium font-sans">{tab.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
