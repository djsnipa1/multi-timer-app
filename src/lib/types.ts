export type TimerStatus = 'idle' | 'running' | 'paused' | 'completed'

export type AlarmSound = 'bell' | 'chime' | 'beep' | 'digital' | 'soft'

export interface Timer {
  id: string
  name:string
  totalDuration: number
  remainingDuration: number
  status: TimerStatus
  alarmSound: AlarmSound
  createdAt: number
  completedAt?: number
  chain: boolean
}
