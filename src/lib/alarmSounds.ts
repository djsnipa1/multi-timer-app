import { AlarmSound } from './types'

export function playAlarmSound(sound: AlarmSound) {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
  
  const now = audioContext.currentTime
  
  switch (sound) {
    case 'bell':
      playBell(audioContext, now)
      break
    case 'chime':
      playChime(audioContext, now)
      break
    case 'beep':
      playBeep(audioContext, now)
      break
    case 'digital':
      playDigital(audioContext, now)
      break
    case 'soft':
      playSoft(audioContext, now)
      break
  }
}

function playBell(audioContext: AudioContext, startTime: number) {
  const frequencies = [800, 1000, 1200]
  
  frequencies.forEach((freq, index) => {
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    oscillator.frequency.value = freq
    oscillator.type = 'sine'
    
    const delay = index * 0.1
    gainNode.gain.setValueAtTime(0.3, startTime + delay)
    gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + delay + 0.5)
    
    oscillator.start(startTime + delay)
    oscillator.stop(startTime + delay + 0.5)
  })
}

function playChime(audioContext: AudioContext, startTime: number) {
  const frequencies = [523.25, 659.25, 783.99]
  
  frequencies.forEach((freq, index) => {
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    oscillator.frequency.value = freq
    oscillator.type = 'triangle'
    
    const delay = index * 0.15
    gainNode.gain.setValueAtTime(0.2, startTime + delay)
    gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + delay + 1)
    
    oscillator.start(startTime + delay)
    oscillator.stop(startTime + delay + 1)
  })
}

function playBeep(audioContext: AudioContext, startTime: number) {
  for (let i = 0; i < 3; i++) {
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    oscillator.frequency.value = 880
    oscillator.type = 'square'
    
    const delay = i * 0.2
    gainNode.gain.setValueAtTime(0.15, startTime + delay)
    gainNode.gain.setValueAtTime(0, startTime + delay + 0.1)
    
    oscillator.start(startTime + delay)
    oscillator.stop(startTime + delay + 0.1)
  }
}

function playDigital(audioContext: AudioContext, startTime: number) {
  const oscillator = audioContext.createOscillator()
  const gainNode = audioContext.createGain()
  
  oscillator.connect(gainNode)
  gainNode.connect(audioContext.destination)
  
  oscillator.frequency.value = 1000
  oscillator.type = 'square'
  
  gainNode.gain.setValueAtTime(0.2, startTime)
  gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.8)
  
  oscillator.start(startTime)
  oscillator.stop(startTime + 0.8)
}

function playSoft(audioContext: AudioContext, startTime: number) {
  const oscillator = audioContext.createOscillator()
  const gainNode = audioContext.createGain()
  
  oscillator.connect(gainNode)
  gainNode.connect(audioContext.destination)
  
  oscillator.frequency.value = 440
  oscillator.type = 'sine'
  
  gainNode.gain.setValueAtTime(0, startTime)
  gainNode.gain.linearRampToValueAtTime(0.15, startTime + 0.1)
  gainNode.gain.linearRampToValueAtTime(0, startTime + 1.5)
  
  oscillator.start(startTime)
  oscillator.stop(startTime + 1.5)
}

export const ALARM_SOUND_OPTIONS = [
  { value: 'bell' as AlarmSound, label: 'Bell' },
  { value: 'chime' as AlarmSound, label: 'Chime' },
  { value: 'beep' as AlarmSound, label: 'Beep' },
  { value: 'digital' as AlarmSound, label: 'Digital' },
  { value: 'soft' as AlarmSound, label: 'Soft' },
]
