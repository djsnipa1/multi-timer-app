import React, { useState, useEffect, useRef } from 'react'
import { useKV } from '@github/spark/hooks'
import { Button } from '@/components/ui/button'
import { TimerCard } from '@/components/TimerCard'
import { TimerDialog } from '@/components/TimerDialog'
import { EmptyState } from '@/components/EmptyState'
import { Timer } from '@/lib/types'
import { playAlarmSound } from '@/lib/alarmSounds'
import { numberToWord } from '@/lib/words'
import { Plus } from '@phosphor-icons/react'
import { toast } from 'sonner'

function App() {
  const [timers, setTimers] = useKV<Timer[]>('timers', [])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingTimer, setEditingTimer] = useState<Timer | undefined>()
  const [dialogMode, setDialogMode] = useState<'create' | 'edit'>('create')
  
  const intervalRefs = useRef<Map<string, NodeJS.Timeout>>(new Map())

  useEffect(() => {
    return () => {
      intervalRefs.current.forEach(interval => clearInterval(interval))
      intervalRefs.current.clear()
    }
  }, [])

  useEffect(() => {
    if (!timers) return
    
    timers.forEach(timer => {
      if (timer.status === 'running') {
        if (!intervalRefs.current.has(timer.id)) {
          const interval = setInterval(() => {
            setTimers(currentTimers => {
              if (!currentTimers) return []
              
              return currentTimers.map(t => {
                if (t.id === timer.id && t.status === 'running') {
                  const newRemaining = Math.max(0, t.remainingDuration - 1)
                  
                  if (newRemaining === 0) {
                    playAlarmSound(t.alarmSound)
                    toast.success(`Timer "${t.name}" completed!`)
                    
                    if (intervalRefs.current.has(t.id)) {
                      clearInterval(intervalRefs.current.get(t.id))
                      intervalRefs.current.delete(t.id)
                    }

                    if (t.chain) {
                      const currentIndex = currentTimers.findIndex(timer => timer.id === t.id)
                      if (currentIndex !== -1 && currentIndex < currentTimers.length - 1) {
                        const nextTimer = currentTimers[currentIndex + 1]
                        if (nextTimer) {
                          currentTimers[currentIndex + 1] = { ...nextTimer, status: 'running' }
                          toast.info(`Timer "${nextTimer.name}" started!`)
                        }
                      }
                    }
                    
                    return {
                      ...t,
                      remainingDuration: 0,
                      status: 'completed' as const,
                      completedAt: Date.now()
                    }
                  }
                  
                  return {
                    ...t,
                    remainingDuration: newRemaining
                  }
                }
                return t
              })
            })
          }, 1000)
          
          intervalRefs.current.set(timer.id, interval)
        }
      } else {
        if (intervalRefs.current.has(timer.id)) {
          clearInterval(intervalRefs.current.get(timer.id))
          intervalRefs.current.delete(timer.id)
        }
      }
    })

    timers.forEach(timer => {
      if (timer.status !== 'running' && intervalRefs.current.has(timer.id)) {
        clearInterval(intervalRefs.current.get(timer.id))
        intervalRefs.current.delete(timer.id)
      }
    })
  }, [timers, setTimers])

  const handleCreateTimer = () => {
    const nextTimerNumber = (timers?.length || 0) + 1
    const defaultName = numberToWord(nextTimerNumber)
    setDialogMode('create')
    setEditingTimer({
      id: '',
      name: defaultName,
      totalDuration: 60,
      remainingDuration: 60,
      status: 'idle',
      alarmSound: 'alarm1',
      createdAt: 0
    })
    setDialogOpen(true)
  }

  const handleEditTimer = (id: string) => {
    if (!timers) return
    
    const timer = timers.find(t => t.id === id)
    if (timer) {
      setEditingTimer(timer)
      setDialogMode('edit')
      setDialogOpen(true)
    }
  }

  const handleSaveTimer = (timerData: Partial<Timer>) => {
    if (dialogMode === 'create') {
      const newTimer: Timer = {
        id: Date.now().toString(),
        name: timerData.name || editingTimer!.name,
        totalDuration: timerData.totalDuration!,
        remainingDuration: timerData.totalDuration!,
        status: 'idle',
        alarmSound: timerData.alarmSound!,
        createdAt: Date.now(),
        chain: timerData.chain || false,
      }
      
      setTimers(currentTimers => {
        if (!currentTimers) return [newTimer]
        return [...currentTimers, newTimer]
      })
      toast.success(`Timer "${newTimer.name}" created!`)
    } else if (editingTimer) {
      setTimers(currentTimers => {
        if (!currentTimers) return []
        
        return currentTimers.map(t =>
          t.id === editingTimer.id
            ? {
                ...t,
                name: timerData.name!,
                totalDuration: timerData.totalDuration!,
                alarmSound: timerData.alarmSound!,
                chain: timerData.chain!,
              }
            : t
        )
      })
      toast.success(`Timer "${timerData.name}" updated!`)
    }
  }

  const handleStartTimer = (id: string) => {
    setTimers(currentTimers => {
      if (!currentTimers) return []
      
      return currentTimers.map(t =>
        t.id === id ? { ...t, status: 'running' as const } : t
      )
    })
  }

  const handlePauseTimer = (id: string) => {
    setTimers(currentTimers => {
      if (!currentTimers) return []
      
      return currentTimers.map(t =>
        t.id === id ? { ...t, status: 'paused' as const } : t
      )
    })
  }

  const handleResetTimer = (id: string) => {
    setTimers(currentTimers => {
      if (!currentTimers) return []
      
      return currentTimers.map(t =>
        t.id === id
          ? {
              ...t,
              remainingDuration: t.totalDuration,
              status: 'idle' as const,
              completedAt: undefined,
            }
          : t
      )
    })
    
    if (timers) {
      const timer = timers.find(t => t.id === id)
      if (timer) {
        toast.success(`Timer "${timer.name}" reset!`)
      }
    }
  }

  const handleDeleteTimer = (id: string) => {
    if (timers) {
      const timer = timers.find(t => t.id === id)
      if (timer) {
        toast.success(`Timer "${timer.name}" deleted!`)
      }
    }
    
    setTimers(currentTimers => {
      if (!currentTimers) return []
      return currentTimers.filter(t => t.id !== id)
    })
  }

  const timersList = timers || []

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight">Multi Timers</h1>
          {timersList.length > 0 && (
            <Button onClick={handleCreateTimer} size="sm" className="gap-2">
              <Plus size={18} weight="bold" />
              <span className="hidden sm:inline">New Timer</span>
            </Button>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {timersList.length === 0 ? (
          <EmptyState onCreateTimer={handleCreateTimer} />
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {timersList.map(timer => (
              <TimerCard
                key={timer.id}
                timer={timer}
                onStart={handleStartTimer}
                onPause={handlePauseTimer}
                onReset={handleResetTimer}
                onEdit={handleEditTimer}
                onDelete={handleDeleteTimer}
              />
            ))}
          </div>
        )}
      </main>

      {timersList.length > 0 && (
        <button
          onClick={handleCreateTimer}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center hover:scale-110 active:scale-95 lg:hidden"
          aria-label="Add new timer"
        >
          <Plus size={24} weight="bold" />
        </button>
      )}

      <TimerDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSave={handleSaveTimer}
        timer={editingTimer}
        mode={dialogMode}
      />
    </div>
  )
}

export default App