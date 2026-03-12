# Samar Sports Team — Motorsports Website

## Current State
New project. No existing frontend or backend code.

## Requested Changes (Diff)

### Add
- Full cinematic motorsports website for "Samar Sports Team"
- Hero section: Full-screen 3D animated race scene with speed lines, floating geometry, neon glow, and CTA buttons
- About section: Team story with animated stats counters
- Drivers Roster: Card grid with driver profiles (name, number, nationality, bio)
- Race Stats & Achievements: Trophy/podium highlights with animated numbers
- Upcoming Races: Race calendar with track names, dates, locations
- Sponsors: Logo grid with hover glow effects
- Contact: Simple contact form
- Sticky navigation with smooth scroll to sections
- Cinematic dark background with electric orange + neon red + deep black color scheme
- 3D animated elements using Three.js / React Three Fiber (floating car silhouettes, speed particles, light trails)
- Smooth scroll transitions between sections using Framer Motion
- Modern racing typography (bold, angular, high-contrast)

### Modify
- N/A (new project)

### Remove
- N/A (new project)

## Implementation Plan
1. Backend: Store drivers, upcoming races, achievements, and sponsors data in Motoko
2. Frontend: React + Three.js (React Three Fiber) for 3D elements
3. Hero: Full-screen Three.js canvas with particle speed lines, floating neon shapes, and animated camera
4. Navigation: Fixed top nav with smooth scroll links and mobile hamburger
5. Sections: About, Drivers, Stats, Races, Sponsors, Contact — each with Framer Motion entrance animations
6. Color tokens: Deep black (#050505), electric orange (#FF4500), neon red (#FF0022), metallic silver (#C0C0C0)
7. Typography: Bold condensed fonts for headings, clean sans for body
