# SkillCurrency Implementation Plan

SkillCurrency is a mobile-first web application designed for skill-based exchanges. Users can list skills they teach, skills they want to learn, and match with others to foster community empowerment.

## Scope & Non-Goals
- **Scope:** Mobile-first UI, profile management (including location and photo), skill matching algorithm (client-side), session scheduling flow, basic chat/notification simulation, and an impact dashboard.
- **Non-Goals:** Real-time backend (Supabase), actual SMS/WhatsApp integration (will use link triggers), persistent backend storage (will use localStorage/sessionStorage for simulation).

## Assumptions & Open Questions
- **Assumption:** The app is a prototype; data will be local to the browser session.
- **Open Question:** Do we need a real image upload server? *Decision: Simulate image upload using base64/URL.createObjectURL for the prototype.*

## Affected Areas
- **Frontend:** React with Tailwind CSS, Framer Motion for animations.
- **Navigation:** Multi-step profile setup, dashboard, explore/match, chat, and schedule views.
- **State Management:** React Context or localized state for user profile and matches.

## Phases

### Phase 1: Foundation & Layout
- Set up mobile-responsive shell with bottom navigation.
- Implement theme and global styles (clean, community-focused).
- **Owner:** `frontend_engineer`

### Phase 2: Profile & Onboarding
- Build a multi-step onboarding for profile creation:
  - Personal info (Name, Photo upload with specific instruction).
  - Location (State, Town, Local Address).
  - Contact (WhatsApp).
  - Skills to teach and Skills to learn.
- **Owner:** `frontend_engineer`

### Phase 3: Matching & Explore
- Create an "Explore" view showing potential matches based on complementary skills.
- Implement a simple matching logic (e.g., User A wants X, User B teaches X).
- **Owner:** `frontend_engineer`

### Phase 4: Interaction (Schedule & Chat)
- Basic chat interface for matched users.
- Scheduling flow for exchange sessions (date/time picker, location type).
- WhatsApp sharing integration (mailto/tel/wa.me links).
- **Owner:** `frontend_engineer`

### Phase 5: Impact Dashboard
- Dashboard showing stats: exchanges completed, skills learned, community points/impact.
- Visualizing progress with clean charts or progress bars.
- **Owner:** `frontend_engineer`

### Phase 6: Refinement & Quick Fixes
- UI/UX polish, text corrections, and ensuring mobile responsiveness.
- **Owner:** `quick_fix_engineer`

## Execution Handoff

**Plan status:** ready

**Dispatch order:**
1. frontend_engineer — Build the core application, profile, matching, and dashboard.
2. quick_fix_engineer — Final polish and text adjustments.

**Per-agent instructions:**
### 1. frontend_engineer
- **Phases:** 1, 2, 3, 4, 5
- **Scope:** Create a mobile-first React app. Use Radix UI/Shadcn components where available.
- **Files:** `src/App.tsx`, `src/components/*`, `src/hooks/*`.
- **Depends on:** none
- **Acceptance criteria:** App must have a profile setup including "please upload an original photo of yourself", a matching feed, a chat UI, and a dashboard. Data persists across reloads via localStorage.

### 2. quick_fix_engineer
- **Phases:** 6
- **Scope:** Polish the UI, fix any typos, and ensure the "WhatsApp share" links work correctly.
- **Files:** `src/**/*`
- **Depends on:** frontend_engineer
- **Acceptance criteria:** All text is grammatically correct and the mobile layout is pixel-perfect.
