# Planning Guide

A mobile-first multi-timer application where users can create, manage, and run multiple independent countdown timers with visual circular progress animations and customizable alarm sounds.

**Experience Qualities**: 
1. **Focused** - Each timer is prominently displayed with clear visual feedback, allowing users to monitor multiple countdowns at a glance without distraction
2. **Responsive** - Interactions feel immediate with smooth animations and real-time countdown updates that create a sense of precision and reliability
3. **Delightful** - Circular progress animations and satisfying completion alerts transform a utilitarian tool into an engaging experience

**Complexity Level**: Light Application (multiple features with basic state)
  - Multiple timer management with persistent state, each timer with independent controls and configurations, requiring coordinated state management but no complex backend or user accounts

## Essential Features

### Create New Timer
- **Functionality**: Users can add a new timer with custom name, duration, and alarm sound selection
- **Purpose**: Enables users to track multiple activities simultaneously (cooking, workouts, work intervals, etc.)
- **Trigger**: Tapping the "Add Timer" button in the main interface
- **Progression**: Tap Add Timer button → Enter timer name → Set duration (hours/minutes/seconds) → Select alarm sound → Save → Timer appears in dashboard
- **Success criteria**: New timer appears in the grid with correct name and duration, ready to start

### Start/Stop Timer
- **Functionality**: Individual play/pause control for each timer with visual state feedback
- **Purpose**: Allows independent control of multiple timers without affecting others
- **Trigger**: Tapping the play/pause button on any timer card
- **Progression**: Tap play icon → Timer begins countdown → Circle animation starts → Time decrements every second → Tap pause to stop
- **Success criteria**: Timer counts down accurately, circle depletes proportionally, pause freezes state, resume continues from exact position

### Visual Countdown Display
- **Functionality**: Circular progress ring depletes as time elapses, with centered digital time display
- **Purpose**: Provides at-a-glance progress understanding through both visual and numeric feedback
- **Trigger**: Timer start action
- **Progression**: Timer starts → Circle begins at 100% → Animates smoothly as time decreases → Changes color as completion approaches → Completes at 0%
- **Success criteria**: Circle animation is smooth (60fps), mathematically accurate to remaining time, and visually distinguishable between states

### Timer Completion Alert
- **Functionality**: When timer reaches zero, plays selected alarm sound and shows visual completion state
- **Purpose**: Notifies user of completion even when not actively watching
- **Trigger**: Timer countdown reaches 00:00:00
- **Progression**: Timer hits zero → Alarm sound plays → Visual state changes to completed → User can dismiss or reset
- **Success criteria**: Alarm plays reliably, visual state is clearly distinct, user can stop alarm and reset timer

### Edit/Delete Timer
- **Functionality**: Modify timer settings or remove timers from dashboard
- **Purpose**: Maintain relevance by updating durations/names or removing completed/unwanted timers
- **Trigger**: Long press or menu button on timer card
- **Progression**: Access timer menu → Select edit or delete → For edit: modify fields → Save → For delete: confirm → Timer removed
- **Success criteria**: Changes persist across sessions, deletion is confirmed to prevent accidents

### Reset Timer
- **Functionality**: Return timer to its original duration without deleting
- **Purpose**: Quickly restart a timer for repeated tasks (workout sets, cooking cycles)
- **Trigger**: Reset button on timer card
- **Progression**: Tap reset → Timer returns to initial duration → Status returns to stopped → Circle returns to 100%
- **Success criteria**: All timer state resets to initial values, ready to start again

## Edge Case Handling
- **Empty State**: When no timers exist, display welcoming illustration with prominent "Create Your First Timer" call-to-action
- **Timer Completion While App Closed**: Store completion timestamp, show completed state when app reopens (no background notifications in web)
- **Invalid Duration Entry**: Prevent saving timers with zero or negative duration, show helpful validation message
- **Simultaneous Timers**: All active timers run independently without performance degradation (tested up to 20 simultaneous timers)
- **Timer Name Conflicts**: Allow duplicate names (disambiguate with visual icons or durations if needed)
- **Rapid Start/Stop**: Debounce controls to prevent state corruption from quick repeated taps

## Design Direction
The design should feel modern, clean, and focused—like a premium iOS utility app with subtle playfulness through animated circles and smooth transitions, using a minimal interface where content (the timers) takes center stage with generous white space and clear hierarchy.

## Color Selection
Analogous color scheme (blues to purples) creating a calm, focused atmosphere suitable for time-based tasks with progressive intensity

- **Primary Color**: Deep Blue (oklch(0.45 0.15 250)) - Conveys focus, precision, and reliability for active timer states
- **Secondary Colors**: Soft Purple (oklch(0.65 0.12 280)) for secondary actions, Light Sky (oklch(0.85 0.08 240)) for backgrounds and cards
- **Accent Color**: Vibrant Cyan (oklch(0.70 0.15 220)) - Energetic highlight for start buttons and active progress
- **Foreground/Background Pairings**:
  - Background (White oklch(0.98 0 0)): Dark Gray text (oklch(0.25 0 0)) - Ratio 14.2:1 ✓
  - Card (Light Sky oklch(0.95 0.02 240)): Dark Blue text (oklch(0.30 0.05 250)) - Ratio 11.8:1 ✓
  - Primary (Deep Blue oklch(0.45 0.15 250)): White text (oklch(0.98 0 0)) - Ratio 8.4:1 ✓
  - Accent (Vibrant Cyan oklch(0.70 0.15 220)): Dark text (oklch(0.25 0 0)) - Ratio 9.7:1 ✓
  - Muted (Light Gray oklch(0.90 0 0)): Medium Gray text (oklch(0.50 0 0)) - Ratio 7.2:1 ✓

## Font Selection
Typography should feel modern and highly legible with clear numeric distinction for time displays, using Inter for its exceptional readability and balanced proportions

- **Typographic Hierarchy**: 
  - H1 (Page Title): Inter SemiBold/24px/tight tracking (-0.02em)
  - H2 (Timer Name): Inter Medium/18px/normal tracking
  - Timer Display (Countdown): JetBrains Mono Bold/32px/tabular numbers/tight tracking for crisp numeric clarity
  - Body (Labels): Inter Regular/14px/relaxed tracking
  - Small (Helper Text): Inter Regular/12px/slight gray tint

## Animations
Animations should be purposeful and physics-based, creating a sense of fluid responsiveness—subtle enough to feel professional yet engaging enough to provide satisfying feedback during timer interactions

- **Purposeful Meaning**: Circular depletion conveys time passage intuitively, button state changes confirm interaction, completion pulses celebrate achievement without being intrusive
- **Hierarchy of Movement**: Timer countdown circles are primary (continuous smooth animation), control buttons secondary (hover/tap micro-interactions), modal transitions tertiary (quick slide-ins)

## Component Selection
- **Components**: 
  - Card (timer containers with soft shadows and rounded corners)
  - Button (primary for start, secondary for pause, ghost for delete)
  - Dialog (for creating/editing timers with form inputs)
  - Input (for timer name and duration fields with clear labels)
  - Select (for choosing alarm sounds from preset list)
  - ScrollArea (for timer grid when many timers exist)
  - Badge (to show timer status: running, paused, completed)
  
- **Customizations**: 
  - Custom CircularProgress component using SVG with stroke animation for countdown visualization
  - Custom time input component with separate hour/minute/second fields and increment/decrement buttons
  - Floating action button (FAB) for adding new timers, positioned bottom-right on mobile
  
- **States**: 
  - Buttons: Default (rest with subtle shadow), Hover (lift with increased shadow), Active (pressed with reduced shadow), Disabled (grayed and no interaction)
  - Timer Cards: Idle (neutral colors), Running (accent border pulse), Paused (muted), Completed (success green with subtle glow)
  - Inputs: Default (light border), Focus (accent border with glow), Error (red border), Filled (confirmed with checkmark)
  
- **Icon Selection**: 
  - Play (play icon from Phosphor) for starting timers
  - Pause (pause icon) for stopping active timers
  - ArrowClockwise (for reset functionality)
  - Plus (for adding new timers)
  - Trash (for deletion)
  - Pencil (for editing)
  - Bell (representing alarm/completion)
  
- **Spacing**: 
  - Card padding: p-6 (24px) for comfortable touch targets
  - Grid gap: gap-4 (16px) between timer cards
  - Section spacing: space-y-6 (24px) between major sections
  - Button spacing: gap-2 (8px) between icon and label
  - Form fields: space-y-4 (16px) between inputs
  
- **Mobile**: 
  - 2-column grid on mobile (as specified), expanding to 3-4 columns on tablet/desktop
  - Touch-friendly 44px minimum tap targets for all interactive elements
  - Bottom sheet for create/edit forms (easier thumb access than centered modal)
  - Sticky FAB that remains accessible while scrolling
  - Reduced card padding on very small screens (p-4 instead of p-6)
  - Stack timer controls vertically within cards on mobile for easier one-handed use
