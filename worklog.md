---
Task ID: 1
Agent: Main Agent
Task: Fix timeline card alternating layout, intro animation, and improve UI/UX

Work Log:
- Fixed TimelineCard alternating layout: Replaced broken isLeft/order-2 flex approach with a clean 3-column system (left-half | center-dot | right-half). Left cards render in left column, right cards in right column, with empty spacer divs on the opposite side. This ensures true left-right alternation on desktop.
- Fixed HyperspaceIntro animation:
  - Used useMemo with stable generateStreaks() to prevent random values on re-render
  - Shortened timing: 2.2s text → 2s streaks → 0.35s flash (was 3s/2.5s/0.6s)
  - Changed flash from harsh white to blue (#4BD5EE) with 0.8 opacity max
  - Improved streak animation with scaleY/scaleX instead of massive scale:50
  - Better central glow with layered box-shadows
- Improved Hero section:
  - Added "Galactic Archive" label badge at top
  - Larger title sizes (up to 8xl on lg)
  - Added floating particles animation
  - Radial vignette overlay
  - Better button hover states with group hover
  - "Scroll" label above chevron indicator
- Improved UI/UX throughout:
  - Added "New to Star Wars?" featured recommendation panel with beginner mode CTA
  - Wider timeline container (max-w-6xl instead of max-w-5xl)
  - Better era headers with glowing text shadows
  - Improved FilterBar with active glow effects and "All Eras" label
  - Better SearchBox with focus shadow glow
  - Enhanced holo-card: 2px top glow bar, wider sweep animation, deeper hover shadows
  - Improved Navbar with dot logo, better hover states, shadow on scroll
  - Better SupplementaryTitles and Footer spacing
  - Cards use text-sm instead of text-xs for summaries (more readable)
- All lint checks pass, dev server returns 200

Stage Summary:
- Timeline cards now properly alternate left/right on desktop
- Intro animation is faster and more cinematic with stable streak data
- UI significantly improved with better typography, spacing, and visual effects
- Added beginner recommendation panel
