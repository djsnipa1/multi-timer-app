# AI Coding Agent Instructions

This document provides essential context for AI agents working in this codebase. The project is a mobile-first multi-timer application built with React, Vite, and TypeScript, focusing on visual countdown timers with circular progress animations.

## Architecture Overview

### Core Components
- `src/components/TimerCard.tsx` - Individual timer display component with circular progress
- `src/components/TimerDialog.tsx` - Timer creation/editing modal
- `src/components/ui/*` - Reusable UI components using Radix UI primitives
- `src/hooks/use-mobile.ts` - Mobile device detection and responsive behaviors

### State Management
- Local state management using React hooks
- Form handling with `react-hook-form` and `zod` validation
- No backend/persistence layer - timers are stored in memory

### Key Design Patterns
1. Component Structure:
   - UI primitives in `components/ui/`
   - Composite components in `components/`
   - Shared hooks in `hooks/`

2. Styling:
   - TailwindCSS for styling with class-variance-authority for variants
   - Custom OKLCH color system (see theme.css)
   - Mobile-first responsive design (2-column grid on mobile, 3-4 columns on desktop)

3. Animation Patterns:
   - Circular progress using SVG stroke animations
   - Physics-based transitions with Framer Motion
   - Subtle micro-interactions for button states

## Development Workflow

### Local Development
```bash
pnpm dev        # Start dev server
pnpm build      # Production build
pnpm lint       # Run ESLint
pnpm optimize   # Optimize bundle
```

### Component Development Guidelines
1. Use Radix UI primitives for accessible, unstyled components
2. Implement responsive layouts using Tailwind's container queries
3. Follow established animation patterns for consistency
4. Ensure touch-friendly targets (min 44px) for mobile

### Testing Your Changes
- Test on both desktop and mobile viewports
- Verify smooth animations (target 60fps)
- Check contrast ratios match spec in theme.css
- Validate touch targets on mobile

## Integration Points

### Timer Component Integration
```typescript
// Example timer component usage
<TimerCard
  name="My Timer"
  duration={300} // in seconds
  onComplete={handleComplete}
  alarmSound="bell"
/>
```

### UI Component Extension
1. Add new component to `src/components/ui/`
2. Create variants using class-variance-authority
3. Export from component index
4. Document props and usage examples

## Common Patterns to Follow

### State Updates
- Use controlled components for form inputs
- Implement proper cleanup in useEffect hooks
- Handle loading/error states explicitly

### Animation Implementation
```typescript
// Example circular progress animation
<CircularProgress
  value={progress}
  variant="timer"
  size="lg"
  animated
/>
```

### Mobile Responsiveness
```typescript
// Example mobile-aware component
const isMobile = useMobile()
return (
  <div className={cn(
    "grid gap-4",
    isMobile ? "grid-cols-2" : "grid-cols-4"
  )}>
    {/* content */}
  </div>
)
```

## Edge Cases to Handle
1. Timer completion during app minimization
2. Simultaneous multiple timer updates
3. Invalid duration inputs
4. Timer name conflicts
5. Rapid start/stop interactions (debounce controls)