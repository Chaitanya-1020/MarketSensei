# IPL Score Predictor Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from modern sports analytics platforms like ESPN, Cricinfo, and FanDuel with clean, data-focused interfaces that emphasize functionality and readability.

## Core Design Elements

### A. Color Palette
**Primary Colors:**
- Dark Mode: 220 25% 10% (deep navy blue background)
- Light Mode: 220 15% 97% (light gray background)
- Accent: 200 100% 45% (cricket blue for CTAs and highlights)
- IPL Brand: 45 100% 50% (orange for IPL-specific elements)

**Supporting Colors:**
- Success: 142 76% 36% (green for positive predictions)
- Warning: 38 92% 50% (amber for moderate confidence)
- Error: 0 84% 60% (red for low confidence/errors)
- Text Primary: 220 15% 20% (light) / 220 15% 90% (dark)
- Text Secondary: 220 10% 50% (both modes)

### B. Typography
**Font Stack:**
- Primary: Inter (via Google Fonts CDN) - clean, modern sans-serif
- Headings: Inter 600-700 weight
- Body: Inter 400-500 weight
- Data/Stats: Inter 500 weight with tabular numbers

**Hierarchy:**
- H1: 2.5rem (40px) - Main page title
- H2: 2rem (32px) - Section headers
- H3: 1.5rem (24px) - Card titles
- Body: 1rem (16px) - Standard text
- Small: 0.875rem (14px) - Labels and metadata

### C. Layout System
**Spacing System:** Tailwind units of 2, 4, 6, 8, and 12
- Micro spacing: p-2, m-2 (8px)
- Standard spacing: p-4, m-4 (16px)
- Section spacing: p-6, m-6 (24px)
- Component spacing: p-8, m-8 (32px)
- Page spacing: p-12, m-12 (48px)

**Grid System:**
- Desktop: 12-column grid with 8-unit gaps
- Tablet: 8-column grid with 6-unit gaps  
- Mobile: 4-column grid with 4-unit gaps

### D. Component Library

**Navigation:**
- Clean header with IPL logo and minimal navigation
- Sticky navigation on scroll with subtle shadow
- Mobile hamburger menu with slide-out drawer

**Form Elements:**
- Modern dropdowns with search functionality for teams/venues
- Toggle switches for toss decisions and match conditions
- Slider inputs for overs and wickets with real-time values
- Grouped form sections with clear labels and help text

**Data Displays:**
- Large prediction score display with confidence indicator
- Feature importance charts using subtle bar visualizations
- Match condition summary cards with cricket iconography
- Historical performance comparisons in compact tables

**Interactive Elements:**
- Primary buttons with cricket blue background
- Secondary buttons with outline style on white/dark backgrounds
- Form validation with inline error messages
- Loading states with cricket-themed animations (spinning ball)

**Cards and Containers:**
- Subtle rounded corners (rounded-lg)
- Soft shadows with cricket field green undertones
- Clear section dividers without heavy borders
- Responsive card layouts that stack on mobile

### E. Cricket-Specific Design Elements

**Iconography:**
- Cricket bat and ball icons for form sections
- Stadium icons for venue selection
- Weather icons for condition inputs
- Trophy icons for match type indicators

**Visual Metaphors:**
- Scorecard-inspired typography for predictions
- Cricket field color accents (grass green: 120 60% 25%)
- Pitch condition indicators with textural backgrounds
- Team jersey color integration in team selection

### F. Responsive Behavior

**Desktop (1024px+):**
- Two-column layout: prediction form left, results right
- Expanded feature importance charts
- Full team logos and detailed match information

**Tablet (768px-1023px):**
- Single column with stacked sections
- Condensed form elements with better touch targets
- Simplified charts and data visualizations

**Mobile (320px-767px):**
- Full-width components with generous padding
- Collapsible form sections with accordion behavior
- Bottom-sheet style prediction results
- Swipe-friendly team/venue selection

### G. Performance and Accessibility

**Dark Mode:**
- Consistent implementation across all components
- Sufficient contrast ratios (4.5:1 minimum)
- Smooth transitions between light/dark themes

**Loading States:**
- Skeleton screens for prediction results
- Progressive form validation feedback
- Optimistic UI updates for better perceived performance

**Motion:**
- Subtle fade-in animations for prediction results
- Smooth transitions for form state changes
- Minimal, purposeful motion that doesn't distract

## Images
No large hero images required. Instead, use:
- Small team logos in dropdowns and results (32x32px)
- Cricket iconography throughout interface
- Subtle stadium background patterns in header areas
- Weather condition icons in form inputs

The design prioritizes functionality and data clarity over decorative imagery, keeping the focus on the prediction tools and results.