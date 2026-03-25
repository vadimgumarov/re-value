# Design System Specification: The Engineering Editorial

## 1. Overview & Creative North Star
**Creative North Star: "The Sovereign Intelligence"**

This design system is built for environments where data density is a requirement, not a drawback. It rejects the "bubbly" friendliness of consumer SaaS in favor of an authoritative, engineering-first aesthetic inspired by high-stakes intelligence platforms. We achieve a premium feel through **Precision Brutalism**: a layout philosophy that uses intentional asymmetry, high-contrast typography scales, and tonal layering to organize complex information without the clutter of traditional borders.

The system breaks the "template" look by treating the screen as a technical canvas. We utilize wide horizontal spans, monospaced-adjacent functional labels, and "monolithic" content blocks that feel carved from a single digital obsidian slab.

---

## 2. Colors & Surface Philosophy
The palette is rooted in the "void"—a deep charcoal foundation that allows data-driven accents to vibrate with laboratory-grade precision.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders for sectioning or containment. 
Structure must be defined exclusively through **Background Color Shifts**. For example, a global sidebar should reside on `surface`, while the main content area sits on `surface-container-low`. Nested modules within that area use `surface-container-high`. This creates a seamless, "milled" appearance rather than a "boxed" one.

### Surface Hierarchy & Nesting
Treat the UI as a physical assembly of plates.
- **Base Layer:** `surface` (#121317)
- **Primary Layout Sections:** `surface-container-low` (#1a1b1f)
- **Interactive Modules:** `surface-container-high` (#292a2e)
- **Floating Overlays:** `surface-container-highest` (#343439) with backdrop blur.

### The "Glass & Gradient" Rule
To prevent the UI from feeling "flat" or "dead," use **Glassmorphism** for floating elements (command bars, tooltips). Apply `surface-container-highest` at 80% opacity with a `20px` backdrop-blur. 
- **Signature CTA Texture:** Use a subtle linear gradient (45°) from `primary` (#a0c9ff) to `primary-container` (#4894e3) to give actionable elements a sense of "active energy" and depth.

---

## 3. Typography
The typography system uses **Inter** to bridge the gap between human readability and machine precision.

| Level | Token | Weight | Letter Spacing | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **Display** | `display-lg` | 700 (Bold) | -0.04em | High-impact technical headers. |
| **Headline** | `headline-sm` | 600 (Semibold) | -0.02em | Section titles; authoritative and blunt. |
| **Title** | `title-md` | 500 (Medium) | 0 | Module headers and data categories. |
| **Body** | `body-md` | 400 (Regular) | +0.01em | Critical data reading and descriptions. |
| **Label** | `label-sm` | 600 (Semibold) | +0.05em | Metadata; always Uppercase for "Pro" feel. |

**Editorial Note:** Use `label-sm` for technical metadata (e.g., timestamps, coordinates) to create a "tactical" aesthetic that contrasts with large, airy `display-md` headlines.

---

## 4. Elevation & Depth
In this system, "Elevation" is a measure of tonal contrast, not shadow intensity.

*   **The Layering Principle:** Depth is achieved by stacking surface tokens. A `surface-container-lowest` card placed on a `surface-container-low` section creates a "recessed" effect, suggesting the element is etched into the interface.
*   **Ambient Shadows:** If a floating state (like a context menu) is required, use a shadow with a `40px` blur, `0%` spread, and `on-surface` color at `6%` opacity. It should feel like a soft glow rather than a dark drop-shadow.
*   **The "Ghost Border" Fallback:** If accessibility requires a stroke, use `outline-variant` at `15%` opacity. This provides a "suggestion" of a boundary without breaking the "No-Line" rule.

---

## 5. Components

### Buttons
*   **Primary:** Gradient fill (`primary` to `primary-container`), `0.25rem` radius. Text is `on-primary-fixed` (#001c37).
*   **Secondary:** Ghost style. No background, `outline-variant` ghost border (15% opacity), text in `primary`.
*   **Tertiary:** Text-only, `label-md` styling, subtle `surface-bright` hover state.

### Input Fields
*   **Style:** No visible border. Use `surface-container-highest` as the fill. 
*   **Active State:** A `2px` bottom-bar in `primary` (#a0c9ff). Never outline the entire box.
*   **Error State:** Background shifts to a subtle `error_container` tint; helper text uses `error` token.

### Cards & Lists (The Density Standard)
*   **Strict Rule:** No dividers. Separate list items using the spacing scale (e.g., `spacing-2` or `0.4rem` of vertical gap).
*   **Visual Grouping:** Use alternating background tones (`surface-container-low` vs `surface-container-high`) for striped lists in high-density tables.

### Data Chips
*   **Precision Chips:** Small, rectangular (`0.125rem` radius). Use `tertiary_container` for neutral data points and `secondary_container` for "Active/Success" states.

### Modular "Command" Bar
*   A persistent, floating navigation element at the bottom-center of the viewport. Styled with Glassmorphism: `surface-container-highest` at 70% opacity, `blur(12px)`, and a subtle `0.5rem` radius.

---

## 6. Do's and Don'ts

### Do
*   **Embrace Density:** Pack data tightly but use `label-sm` and `body-sm` to maintain a professional, sophisticated "dashboard" look.
*   **Use Asymmetry:** Place a large `display-sm` headline on the far left with technical metadata (`label-sm`) tucked into the far right.
*   **Tonal Transitions:** Use background color shifts to guide the eye from "Global Navigation" to "Local Actions."

### Don't
*   **No "Safety" Borders:** Do not use 1px borders to separate content. Use whitespace (`spacing-8` or above) or background shifts.
*   **No Rounded Corners:** Avoid the `full` or `xl` roundedness tokens for structural elements. Stick to `sm` (0.125rem) or `md` (0.375rem) to keep the "engineered" feel.
*   **No Generic Grays:** Always use the defined `slate` and `charcoal` tokens (e.g., `surface`, `surface-variant`). Pure `#888888` grays are strictly forbidden; they lack the "laboratory" depth of this system.

### Accessibility Note
While we prioritize a minimalist, dark aesthetic, always ensure that text on `surface-container` tiers maintains a contrast ratio of at least 4.5:1 using the `on-surface` and `on-surface-variant` tokens.
