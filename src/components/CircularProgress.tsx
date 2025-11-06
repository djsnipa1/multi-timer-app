import { cn } from '@/lib/utils'

interface CircularProgressProps {
  progress: number
  size?: number
  strokeWidth?: number
  status: 'idle' | 'running' | 'paused' | 'completed'
  children?: React.ReactNode
}

export function CircularProgress({
  progress,
  size = 160,
  strokeWidth = 8,
  status,
  children,
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (progress / 100) * circumference

  const getStrokeColor = () => {
    switch (status) {
      case 'running':
        return 'stroke-accent'
      case 'paused':
        return 'stroke-muted-foreground'
      case 'completed':
        return 'stroke-success'
      default:
        return 'stroke-primary'
    }
  }

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-border"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={cn(
            'transition-all duration-300 ease-linear',
            getStrokeColor()
          )}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  )
}
