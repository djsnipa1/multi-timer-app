import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Timer, AlarmSound } from '@/lib/types'
import { parseTimeToSeconds } from '@/lib/utils'
import { ALARM_SOUND_OPTIONS } from '@/lib/alarmSounds'
import { Plus, Minus } from '@phosphor-icons/react'

interface TimerDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (timer: Partial<Timer>) => void
  timer?: Timer
  mode: 'create' | 'edit'
}

export function TimerDialog({ open, onOpenChange, onSave, timer, mode }: TimerDialogProps) {
  const [name, setName] = useState('')
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(5)
  const [seconds, setSeconds] = useState(0)
  const [alarmSound, setAlarmSound] = useState<AlarmSound>('bell')

  useEffect(() => {
    if (timer && mode === 'edit') {
      setName(timer.name)
      const totalSeconds = timer.totalDuration
      setHours(Math.floor(totalSeconds / 3600))
      setMinutes(Math.floor((totalSeconds % 3600) / 60))
      setSeconds(totalSeconds % 60)
      setAlarmSound(timer.alarmSound)
    } else {
      setName('')
      setHours(0)
      setMinutes(5)
      setSeconds(0)
      setAlarmSound('bell')
    }
  }, [timer, mode, open])

  const handleSave = () => {
    const totalDuration = parseTimeToSeconds(hours, minutes, seconds)
    
    if (!name.trim()) {
      return
    }
    
    if (totalDuration <= 0) {
      return
    }

    onSave({
      name: name.trim(),
      totalDuration,
      remainingDuration: mode === 'create' ? totalDuration : timer?.remainingDuration,
      alarmSound,
    })

    onOpenChange(false)
  }

  const adjustTime = (type: 'hours' | 'minutes' | 'seconds', delta: number) => {
    switch (type) {
      case 'hours':
        setHours(Math.max(0, Math.min(23, hours + delta)))
        break
      case 'minutes':
        setMinutes(Math.max(0, Math.min(59, minutes + delta)))
        break
      case 'seconds':
        setSeconds(Math.max(0, Math.min(59, seconds + delta)))
        break
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{mode === 'create' ? 'Create New Timer' : 'Edit Timer'}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="timer-name">Timer Name</Label>
            <Input
              id="timer-name"
              placeholder="e.g., Workout, Cooking, Study"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Duration</Label>
            <div className="grid grid-cols-3 gap-2">
              <div className="space-y-2">
                <Label htmlFor="hours" className="text-xs text-muted-foreground">Hours</Label>
                <div className="flex flex-col gap-1">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => adjustTime('hours', 1)}
                    className="h-8"
                  >
                    <Plus size={16} />
                  </Button>
                  <Input
                    id="hours"
                    type="number"
                    min="0"
                    max="23"
                    value={hours}
                    onChange={(e) => setHours(Math.max(0, Math.min(23, parseInt(e.target.value) || 0)))}
                    className="text-center"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => adjustTime('hours', -1)}
                    className="h-8"
                  >
                    <Minus size={16} />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="minutes" className="text-xs text-muted-foreground">Minutes</Label>
                <div className="flex flex-col gap-1">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => adjustTime('minutes', 1)}
                    className="h-8"
                  >
                    <Plus size={16} />
                  </Button>
                  <Input
                    id="minutes"
                    type="number"
                    min="0"
                    max="59"
                    value={minutes}
                    onChange={(e) => setMinutes(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
                    className="text-center"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => adjustTime('minutes', -1)}
                    className="h-8"
                  >
                    <Minus size={16} />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="seconds" className="text-xs text-muted-foreground">Seconds</Label>
                <div className="flex flex-col gap-1">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => adjustTime('seconds', 1)}
                    className="h-8"
                  >
                    <Plus size={16} />
                  </Button>
                  <Input
                    id="seconds"
                    type="number"
                    min="0"
                    max="59"
                    value={seconds}
                    onChange={(e) => setSeconds(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
                    className="text-center"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => adjustTime('seconds', -1)}
                    className="h-8"
                  >
                    <Minus size={16} />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="alarm-sound">Alarm Sound</Label>
            <Select value={alarmSound} onValueChange={(value) => setAlarmSound(value as AlarmSound)}>
              <SelectTrigger id="alarm-sound">
                <SelectValue placeholder="Select a sound" />
              </SelectTrigger>
              <SelectContent>
                {ALARM_SOUND_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            {mode === 'create' ? 'Create Timer' : 'Save Changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
