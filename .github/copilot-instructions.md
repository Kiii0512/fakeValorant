# PROJECT IDENTITY
- Name: NEXUS PROTOCOL (Tactical 5v5 FPS Showcase inspired by Valorant).
- Tech Stack: React, TypeScript, Tailwind CSS.
- Architecture: Strict Clean Architecture (domain -> application -> infrastructure -> presentation).

# TASTE-SKILL DESIGN RULES (ANTI-AI SLOP)
- Avoid generic AI aesthetic: NO purple/pink gradients, NO oversaturated bubble cards.
- Canvas: Deep muted dark tones (#0A0B10, #0C0E14), never pure flat #000000.
- Borders over Shadows: Use thin, crisp borders (border border-white/10 or border-cyan-500/20) instead of heavy blur shadows.
- Accent Discipline: Exactly ONE neon accent (#00F0FF Neon Cyan or #FFE600 Electric Volt) for interactive and focal elements.
- Typography: High-impact condensed uppercase titles (font-black tracking-tight uppercase). Monospace for telemetry/metadata/prices.
- Geometry: Angular chamfers, flat surfaces, or subtle skew angles instead of rounded bubbles (rounded-full/rounded-3xl).

# CLEAN ARCHITECTURE CONSTRAINTS
- src/domain/: Pure TypeScript entities and repository interfaces. ZERO React imports or UI libraries.
- src/infrastructure/: Mock data implementations and API services.
- src/application/: Use Cases that orchestrate data flow.
- src/presentation/: UI components, hooks, and pages. Must consume data strictly via Use Cases.