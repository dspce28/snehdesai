# Sneh Desai — "Change Your Life" Mumbai penthouse hero

Build a single full-screen hero for **Sneh Desai's** signature live event **Change Your Life (CYL)**, 25–27 December 2026 at the **Jio World Convention Centre, BKC, Mumbai**. On load it plays a 7.3-second cinematic intro, then stays live with a slow-moving Mumbai dusk sky over the Arabian Sea. In order:

1. A pair of heavy black velvet stage curtains parts from the centre seam onto a top-down drone shot of a Mumbai high-rise rooftop terrace at dusk.
2. The camera tilts up and pulls back to reveal Marine Drive's Queen's Necklace, the curved line of gold streetlights along the bay, and the Arabian Sea.
3. The shot turns into four separate image layers that drift at different speeds (parallax), while the kicker "Change Your" and a giant word "Life" rise in letter by letter.
4. Sneh Desai, seen from behind, rises into frame from below. He stands at a glass terrace railing looking out over the sea, and his head overlaps the bottom of the giant word.
5. A gold "Claim Your Seat" button and the event line fade in.

The layout rules below assume the assets in section 1. Re-measure every scene position marked **[measure]** once the final images exist.

---

## 1. Media

All assets share one 16:9 framing (2688×1520 source) and must line up exactly when drawn into the same 16:9 box. Host them in the Next.js project at `/public/hero/`, and serve images as AVIF/WebP at 1280, 2000 and 2688 widths.

| File | What it shows |
|---|---|
| `curtains.webp` | One image. The left half is the left curtain and the right half the right curtain. Deep black velvet, vertical folds lit softly from above, a thin antique-gold fringe along the bottom hem, and a small embroidered gold "SD" monogram split exactly across the centre seam. |
| `aerial.webp` | A top-down drone shot of a luxury Mumbai high-rise rooftop terrace at dusk. It is the first frame of the tilt video. |
| `layer-back.webp` | The sky and the sea only. A Mumbai December dusk sky: deep indigo at the top fading to warm amber at the horizon, a few long thin clouds, and the calm dark Arabian Sea with soft gold horizon light. No buildings. |
| `layer-mid.webp` | The city with a transparent sky. The full curve of Marine Drive (the Queen's Necklace) with its gold sodium streetlights, the Art Deco seafront buildings and the Nariman Point towers lit up, the Malabar Hill towers on the far side, light reflected on the water, and a few small boats. |
| `layer-front.webp` | Everything else is transparent. Sneh Desai from behind, standing centred. Short dark hair: a high-fade undercut, longer and swept back on top. A tailored charcoal suit jacket, broad shoulders, hands resting on the rail. The terrace's glass railing (brushed brass top rail and posts, the glass itself fully transparent). A polished dark stone floor holding a faint reflection of the city lights, and tall potted plants at both edges. |
| `tilt.mp4` | Top-down rooftop to the wide Queen's Necklace skyline. About 5 s, 1280×720 (plus a 1920×1080 version for large screens), 24 fps, H.264, no audio. Its last frame equals the back and mid layers stacked. |
| `sky-loop.mp4` | The back layer, alive. Clouds drift slowly, the sea's surface shimmers, faint haze rolls in and the light flickers subtly. Locked camera, about 5 s, no audio. Its first frame equals the back layer. |

**Why there is no rain:** Mumbai is dry in late December. A rainy sky would be wrong for the event dates, and Mumbai visitors would notice.

### Asset generation prompts

Generate **one master frame first**, then cut every layer from it. That keeps the framing identical.

**Master frame (16:9, 2688×1520, photoreal):**
> Cinematic wide shot from a luxury penthouse terrace, about the 60th floor, on Malabar Hill in Mumbai, at blue-hour dusk in December. The view looks south-east over the full curve of Marine Drive's Queen's Necklace: a sweeping arc of gold sodium streetlights hugging the bay, Art Deco seafront buildings, and the lit towers of Nariman Point. Beyond lies the calm Arabian Sea with gold light reflected on it. The sky is deep indigo at the top fading to warm amber at the horizon, with a few long thin clouds. It is clear: no rain, no fog. In the foreground, centred, a man stands seen from directly behind with his hands resting on the brass top rail of a frameless glass balustrade. He has short dark hair in a high-fade undercut, longer and swept back on top, a tailored charcoal suit jacket and broad shoulders. The terrace floor is polished dark stone with faint reflections, with tall sculptural potted plants at the left and right edges. Shot on a 35 mm lens at eye level. The top of his head sits about 36% down from the top of the frame, the railing's top rail about 58% down, and the glass bottom about 83% down. Rich contrast, quiet luxury, editorial, no text.

**Layers cut from the master:**
- `layer-front`: segment out the man, the railing posts and rail, the floor and the plants. Make the glass fully transparent.
- `layer-mid`: segment out the city, the shoreline, the water and the boats. Make the sky transparent.
- `layer-back`: inpaint over the city to leave only sky, sea and horizon.

**Aerial still:**
> Top-down drone view looking straight down at the rooftop of the same luxury Mumbai high-rise at dusk: a rectangular rooftop terrace with an infinity-edge plunge pool glowing turquoise, teak loungers, warm uplights, and the edge of the Marine Drive streetlights curving far below at the frame's edge. Same colour grade as the master.

**Tilt video:** image-to-video with first frame = `aerial.webp` and last frame = back + mid layers stacked.
> Smooth drone tilt up from straight down to the horizon while pulling back, revealing the Queen's Necklace and the Arabian Sea at dusk. Slow in, slow out. No people, no cuts.

**Sky loop:** image-to-video from `layer-back.webp`.
> Locked camera. Thin clouds drift slowly left to right, the sea's surface shimmers gently, light haze breathes near the horizon. Calm and seamless; no rain.

**Curtains:**
> Front-on, perfectly symmetrical pair of closed theatre curtains filling the frame. Deep black velvet with soft vertical folds lit from above, a thin antique-gold bullion fringe along the bottom hem, and a small gold embroidered monogram "SD" split exactly at the centre seam. 16:9, no stage visible.

> **Recommended:** replace the AI man in `layer-front` with a **real photo of Sneh from behind**, taken on any terrace at dusk with the camera at eye level. It's a 30-minute shoot, and it means the brand's opening shot is actually him. The AI version is only a stand-in.

## 2. Fonts

- **Bodoni Moda** (variable, 400–500, italic) for the giant word and the kicker, matching the Maison homepage direction.
- **Jost** (300–500) for the nav, the button and the event line.
- Self-host both with `next/font` and `display: swap`, and preload them.

Weights and styles used:
- The kicker: 400 italic.
- The giant word: 400.
- The nav links: Jost 400.
- The wordmark: Bodoni 500, uppercase.
- The button: Jost 500, uppercase, letter-spacing 0.24em.

## 3. Colours and page

| Token | Value | Use |
|---|---|---|
| Night | `#070a12` | the page and hero background, seen only before the media loads |
| Ink | `#0c0c0b` | text on light pills and the button |
| Brass | `#c9a46a` (hover `#d9b984`) | the "Claim Your Seat" button and the event line rule |
| Ivory | `#f4f1ea` | the wordmark, links and headline |
| Nav glass | white at 12% opacity, 12px backdrop blur, a 1px inner ring of white at 12% | the pill bar |
| Link text | ivory at 85% | inactive links |
| Top shade | linear gradient from `rgba(5,8,20,.5)` at the top to transparent, covering the top 45% of the back layer | keeps the text readable on the sky |

- The page is exactly one screen tall: `100svh`, minimum 520px, overflow hidden.
- Tab title: "Change Your Life — Sneh Desai Live in Mumbai".
- Meta description: "Change Your Life, Sneh Desai's signature 3-day live event. 25–27 December 2026, Jio World Convention Centre, Mumbai. Claim your seat."

## 4. The stage

The stage works exactly as in the reference hero.

- **The stage box:** a 16:9 box that always covers the hero, centred both ways. Its width is the larger of the viewport width and the viewport height × 16/9; its height is that width × 9/16.
- **What it holds,** from back to front:
  1. **Back layer:** the back image, the two sky-loop videos on top of it, and the top shade.
  2. **Headline block:** see section 6.
  3. **Mid layer:** the city image.
  4. **Front layer:** a glass tint panel, then the front image above it.
- **Fit and origins:** each layer fills the stage, object-fit cover. Transform origins: back 50% 40%, mid 50% 45%, front 50% 100%.
- **Glass tint:** the panel sits between the railing posts, from the top rail down to the floor **[measure]**.
  - Fill: a vertical gradient from `rgba(255,236,200,.08)` to `rgba(220,200,170,.04)` at 60%, then `rgba(200,180,150,.06)`. That's a warm tint, picking up the Queen's Necklace light.
  - Backdrop filter: blur 1.2px.
  - Top edge: a 1px highlight line in white at 18%.
- **Scene positions** **[measure]**, as % of the stage height; these are the targets for the master frame:
  - the top of Sneh's head: about 36%
  - the top rail: about 58%
  - the glass bottom: about 83%
  - the main mass of the skyline: from about 45%
  - the tallest Nariman Point towers: from about 34%

## 5. Nav (pinned to the viewport)

The unit u is the smaller of (viewport width ÷ 1440) and (viewport height ÷ 900).

- **Bar:** top 52u, height 48u, side padding 125u.
- **Left:** the wordmark "SNEH DESAI" (Bodoni Moda 500, 18u, letter-spacing 0.3em, ivory), linking to `/`.
- **Centre:** a glass pill bar holding "Home" (active: ivory fill, ink text), "Programmes", "The Story" and "Library".
  - Link sizing: 38u tall, padding 0 22u, fully rounded.
  - Hover: adds a white 14% fill.
- **Right:**
  - "EN | ગુ" as a language toggle, ivory at 85%, Jost 13u, letter-spacing 0.1em. (Several of Sneh's books are in Gujarati.)
  - The **"Claim Your Seat"** button: 44u tall, padding 0 26u, fully rounded, brass with ink text. It links to `https://cyl.snehdesai.com`. Hover lifts it 1px and lightens it.

## 6. Headline (inside the stage, between the back and mid layers)

- **Text:** the kicker "Change Your" and the giant word "Life". The h1 has an aria-label of "Change Your Life". Each letter of "Life" is wrapped in its own inline-block span so it can animate.
- **Why "Life" and not "Seat":** "Life" completes the event's own name, and its tall L, i and f give the head overlap a strong shape. "Claim Your Seat" goes on the button, where it is the action.
- **Size:** measure the word at 100px, then use the smallest of:
  - (a) 52% of the stage width,
  - (b) 80% of the viewport width,
  - (c) the gap between the bottom of the nav (plus 3.5% of the viewport height) and the baseline, divided by 0.88.

  "Life" is a short word, so it is capped lower than "Summit" was, to stop it filling the sky.
- **Baseline:** on landscape screens it sits at 43% of the stage height, so Sneh's head overlaps the lower part of "if". On portrait screens (height more than 1.2 × width) it sits at 36.2%, so his head only touches the base of the word.
- **Kicker:** font-size 0.13 × the word's size, Bodoni Moda italic. Its top sits at the baseline minus the cap height minus 0.02em, left-aligned with the L's stem.
- **Event line:** a new element, pinned to the viewport, not the stage.
  - Position: bottom 40u, left 125u.
  - Content: a 48u brass rule, then the text "25 – 27 DEC 2026 · JIO WORLD CONVENTION CENTRE, MUMBAI".
  - Type: Jost 400, 12u, letter-spacing 0.28em, ivory at 80%.
  - On phones it is centred above the bottom safe area.

## 7. Opening layers (above the stage)

- **Opening box** (z-index 6): holds the aerial still and, on top of it, the tilt video, which starts transparent.
- **Curtains box** (z-index 7): two 50%-wide panels, both using `curtains.webp` at background-size 200% 100%. The left panel shows the image's left half (background-position 0 50%) and the right panel its right half (100% 50%). The two halves of the "SD" monogram meet at the seam.

## 8. The intro timeline (7.4 s)

The mechanics match the reference hero:
- One master clock drives paused Web Animations through a requestAnimationFrame loop.
- The intro starts when the curtains, the aerial still, all three layers and the tilt video are ready, plus 120ms.
- A failsafe starts it at 5 s regardless.

| Time (s) | Element | Motion |
|---|---|---|
| 0.00 → 0.25 | Curtains | A slight sway: scaleX 1 → 0.985 on both panels, as if the fabric is being drawn. |
| 0.05 → 1.25 | Left curtain | translateX 0 → −101% and scaleX 0.985 → 0.8 (the fabric gathers as it travels), cubic-bezier(.1,.2,.8,1) |
| 0.05 → 1.35 | Right curtain | translateX 0 → 101% and scaleX 0.985 → 0.8, cubic-bezier(.4,.6,.9,1) |
| 1.19 → 1.47 | Tilt video | opacity 0 → 1 |
| 1.25 → 2.85 | Tilt playback | The whole clip plays inside this 1.6 s window, with the rate nudged toward the target time every frame. It pauses on its last frame. |
| 2.45 → 2.95 | Opening box | opacity 1 → 0 |
| 2.45 → 2.75 | Nav | opacity 0 → 1, translateY −6px → 0 |
| 2.45 → 3.10 | Kicker | opacity 0 → 1, rising 0.5em |
| 2.45 + i × 0.07 → +0.70 | Letters L, i, f, e | opacity 0 → 1, translateY 0.14em → 0, cubic-bezier(.2,.65,.3,1) |
| 2.40 on | Sky loop | starts (see section 9) |
| 2.90 → 3.70 | Top shade | opacity 0 → 1 |
| 2.90 → 4.30 | Back layer | translateY 0 → −1.5% |
| 2.90 → 4.30, hold to 4.60, → 6.90 | Mid layer | translateY 0 → −4%, hold, then back to 0. The Queen's Necklace rises over the word's feet, then sinks to uncover them. |
| 3.00 → 4.80 | Headline block | translateY 6% → 0 |
| 3.35 → 6.00 → 7.30 | Front layer (Sneh) | translateY 66% → −2.5% with cubic-bezier(.2,.5,.2,1), then −2.5% → 0, settling with a soft bob |
| 5.80 → 6.60 | Event line | opacity 0 → 1, and its rule draws from 0 to 48u wide |
| 6.20 → 6.80 | "Claim Your Seat" button | a single soft brass glow pulse (box-shadow 0 → 0 0 0 10px transparent), once, so the eye lands on it |
| 7.4 | Everything | at rest; the opening and curtain boxes are removed |

**Start states,** applied while the hero has an `intro` class so nothing flashes before the clock starts:
- the nav, letters, kicker and event line at opacity 0
- the front layer at translateY 66%

## 9. The sky loop

The sky loop uses the reference's two-video crossfade: use only the first 3.6 s of the clip, start the other video at 3.6 − 0.75 s, crossfade over 0.7 s, and pause the faded-out video 0.8 s later.

**Low-power fallback:** on phones with `navigator.connection.saveData` set, or with an effectiveType below 4G, skip both videos.
- The tilt video becomes a 0.6 s crossfade from the aerial still to the layers.
- The sky stays a still image.

## 10. Small screens

The rules follow the reference:
- **Below 820px:** the nav becomes two rows, with the wordmark and button on the first and the pill bar on the second.
- **At 360px and narrower:** smaller links.
- **Short landscape screens:** the nav becomes a single row.

Two additions:
- The "Claim Your Seat" button shortens to "Book Seat" below 380px.
- The event line becomes two centred lines (the dates, then the venue).

**Checked sizes:** 1440×900, 1536×686, 390×844, 360×640, 844×390 and 768×1024. None scroll sideways.

## 11. Reduced motion

If the visitor prefers reduced motion, skip the intro and show the final frame at once:
- no curtains, no videos
- the back layer's still image stands in for the sky
- every element at rest

## 12. Performance budget

This hero is the first thing every Instagram and YouTube visitor sees, mostly on mid-range Android phones.

- **LCP:** the hero's first paint is the **curtains image** (under 80 KB at mobile width), so LCP lands quickly.
- **Under 1.6 MB before 3 s on mobile:** everything else streams in behind the curtains, and the curtains don't open until it's ready. That means the 1280-wide image versions and the 720p videos only.
- **The 5 s failsafe applies:** if the media is still loading at 5 s, open the curtains straight onto the static layers, not onto a black screen.

## 13. Acceptance checklist

- The curtains part from the exact centre, the "SD" monogram splits cleanly, and they're gone by 1.35 s.
- The rooftop turns into the tilt with no pop, and the skyline doesn't jump at the handoff to layers.
- "Life" reveals left to right while rising, and the nav fades in at the same time.
- The Queen's Necklace overlaps the word's feet during 3–4.6 s, then sinks back.
- Sneh is hidden until about 3.4 s, rises, overshoots 2.5% and settles by 7.3 s.
- His head overlaps "if" on desktop and touches the word's base on phones.
- The "Claim Your Seat" button is always visible and clickable at every checked size.
- The sky loop never visibly restarts.
- Nothing scrolls horizontally.
- No console errors.
- Reduced motion and save-data both give a clean static hero.
