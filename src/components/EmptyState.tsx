import React from 'react'
import { Timer, Plus } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'

interface EmptyStateProps {
  onCreateTimer: () => void
}

export function EmptyState({ onCreateTimer }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="flex justify-center">
          <div className="rounded-full bg-primary/10 p-8">
            <Timer size={64} className="text-primary" weight="duotone" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">No Timers Yet</h2>
          <p className="text-muted-foreground text-sm">
            Create your first timer to get started. Perfect for workouts, cooking, studying, or any timed activity.
          </p>
        </div>

        <Button onClick={onCreateTimer} size="lg" className="gap-2">
          <Plus size={20} weight="bold" />
          Create Your First Timer
        </Button>
      </div>
    </div>
  )
}
