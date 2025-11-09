
import React from 'react'

interface CircularProgressProps {
  progress: number
  size?: number
  strokeWidth?: number
  children?: React.ReactNode
}

export function CircularProgress({
  progress,
  size = 160,
  strokeWidth = 8,
  children,
}: CircularProgressProps) {
  const padding = 40
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (progress / 100) * circumference

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size + padding * 2} height={size + padding * 2} viewBox={`0 0 ${size + padding * 2} ${size + padding * 2}`}>
        <defs>
          <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="nnneon-grad">
            <stop stopColor="hsl(62, 75%, 62%)" stopOpacity="1" offset="0%"></stop>
            <stop stopColor="hsl(86, 69%, 60%)" stopOpacity="1" offset="100%"></stop>
          </linearGradient>
          <filter id="nnneon-filter" x="-100%" y="-100%" width="400%" height="400%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feGaussianBlur stdDeviation="17 8" x="0%" y="0%" width="100%" height="100%" in="SourceGraphic" edgeMode="none" result="blur"></feGaussianBlur>
          </filter>
          <filter id="nnneon-filter2" x="-100%" y="-100%" width="400%" height="400%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feGaussianBlur stdDeviation="10 17" x="0%" y="0%" width="100%" height="100%" in="SourceGraphic" edgeMode="none" result="blur"></feGaussianBlur>
          </filter>
        </defs>
        <circle
          cx={size / 2 + padding}
          cy={size / 2 + padding}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-border"
        />
        <g 
          strokeWidth={strokeWidth} 
          stroke="url(#nnneon-grad)" 
          fill="none"
          transform={`rotate(-90 ${size / 2 + padding} ${size / 2 + padding})`}
        >
          <circle
            r={radius}
            cx={size / 2 + padding}
            cy={size / 2 + padding}
            filter="url(#nnneon-filter)"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          ></circle>
          <circle
            r={radius}
            cx={size / 2 + padding}
            cy={size / 2 + padding}
            filter="url(#nnneon-filter2)"
            opacity="0.25"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          ></circle>
          <circle
            r={radius}
            cx={size / 2 + padding}
            cy={size / 2 + padding}
            filter="url(#nnneon-filter2)"
            opacity="0.25"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          ></circle>
          <circle
            r={radius}
            cx={size / 2 + padding}
            cy={size / 2 + padding}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          ></circle>
        </g>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  )
}
