# Image Replacement Guide — 7th Creation Studio

Replace every placeholder path below with real photography from your studio,
projects, and field work. The site is fully functional without images (sections
show dark placeholder backgrounds), but real photos are essential before launch.

---

## Logo

| File path | Use | Notes |
|-----------|-----|-------|
| `images/logo/7th-creation-logo-light.png` | Header + footer (dark bg) | White/light version. Max display width: 160px header, 140px footer. |
| `images/logo/7th-creation-logo-dark.png` | Light bg use if needed | Dark version for off-white backgrounds. |

**To add the logo:** In `index.html`, find the two `<!-- REPLACE LOGO -->` comment
blocks (one in `<header>`, one in `<footer>`) and swap the `<span>` blocks for
your `<img>` tags.

---

## Hero

| File path | What to shoot | Specs |
|-----------|--------------|-------|
| `images/hero/hero-main.jpg` | Strong shop wide shot, active printer, or finished install. Avoid posed shots. No stock. | Min 1920×1080px, JPEG 85%, landscape. |

**To add the hero image:**
- CSS method: In `css/styles.css`, find `.hero-bg` and uncomment / add:
  `background-image: url('../images/hero/hero-main.jpg');`
- HTML method: In `index.html`, find the `<!-- REPLACE HERO IMAGE -->` block and add:
  `<img src="images/hero/hero-main.jpg" alt="..." class="hero-bg-img">`

---

## Work — Grid Tiles (7 projects)

Each project needs one grid tile image + two drawer detail images.

| Project | Grid tile path | Source / subject |
|---------|---------------|-----------------|
| Airport Launch Graphics | `images/work/airport-launch.jpg` | Avianca activation: branded arch, launch signage, banners |
| Creator Space Graphics System | `images/work/creator-space.jpg` | Creator House: exterior panels, window vinyl, floor graphics |
| Hotel Lobby Welcome Graphics | `images/work/hotel-lobby.jpg` | Oakland lobby: balcony banner installation |
| Retail Window Takeover | `images/work/retail-window.jpg` | Salomon storefront: window graphics install |
| Vehicle & Transit Graphics | `images/work/vehicle-transit.jpg` | MS-Joy, Santa Cruz Metro, or vehicle wrap |
| Label Production | `images/work/label-production.jpg` | Ghost Town Genetics: printer output, label sheets |
| Branded Kits & Apparel | `images/work/branded-kits.jpg` | Gift for Givers or apparel/packaging production |

**Grid tile spec:** 800×600px, JPEG 85%, 4:3 ratio, landscape preferred.

### Drawer detail images (2 per project)

| Project | Drawer image 1 | Drawer image 2 |
|---------|---------------|----------------|
| Airport Launch | `images/work/airport-launch-1.jpg` | `images/work/airport-launch-2.jpg` |
| Creator Space | `images/work/creator-space-1.jpg` | `images/work/creator-space-2.jpg` |
| Hotel Lobby | `images/work/hotel-lobby-1.jpg` | `images/work/hotel-lobby-2.jpg` |
| Retail Window | `images/work/retail-window-1.jpg` | `images/work/retail-window-2.jpg` |
| Vehicle Transit | `images/work/vehicle-transit-1.jpg` | `images/work/vehicle-transit-2.jpg` |
| Label Production | `images/work/label-production-1.jpg` | `images/work/label-production-2.jpg` |
| Branded Kits | `images/work/branded-kits-1.jpg` | `images/work/branded-kits-2.jpg` |

**Drawer image spec:** Same as grid tile — 800×600px, JPEG 85%, 4:3 ratio.

---

## Studio & Shop

| File path | What to shoot | Notes |
|-----------|--------------|-------|
| `images/studio/shop-wide.jpg` | Full shop floor with equipment visible | Best with natural or clean artificial light |
| `images/studio/printer.jpg` | Printer close-up — active, in production | Print head, ink, or output mid-run |
| `images/studio/cutting.jpg` | Cutting table or laminator in use | Hands optional |
| `images/studio/work-table.jpg` | Work table with masking, mounting, or finishing | Real production in progress |
| `images/studio/install.jpg` | Finished install or completed project — WIDE format | This spans 2 columns — horizontal image preferred |
| `images/studio/field-install.jpg` | On-site install — ladder, crew, or finished placement | Used in the "Field experience" section |

**Studio image spec:** 800×600px minimum, JPEG 85%, 4:3 ratio.
The wide image (`install.jpg`) displays at 2× width — use landscape 1600×600px or similar if available.

---

## OG / Social

| File path | Notes |
|-----------|-------|
| `images/og-image.jpg` | 1200×630px. Used for link previews. Set in `<head>` in index.html. |

---

## Favicon

Add favicon files to `images/favicon/` and uncomment the `<link>` tags in
the `<head>` of `index.html`:

```
images/favicon/favicon-32x32.png
images/favicon/favicon-16x16.png
images/favicon/apple-touch-icon.png   (180×180px)
images/favicon/favicon.ico
```

---

## Image optimization tips

- Use JPEG for photos (85% quality is enough — do not use 100%)
- Use PNG only for logos with transparency
- Compress with Squoosh, ImageOptim, or TinyPNG before uploading
- Do not use files above 400KB for grid images; hero can go to 800KB
- Keep original files in a separate folder (not deployed)
