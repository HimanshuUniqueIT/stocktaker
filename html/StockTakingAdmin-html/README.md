# StockTakingAdmin — HTML + Tailwind CSS Prototype

A clean, modern **Admin Panel frontend prototype** built with semantic HTML5 and Tailwind CSS.  
This is a **frontend wireframe only** — no backend, no authentication, no JavaScript logic.

---

## Project Structure

```
StockTakingAdmin-html/
│
├── index.html          ← Login page
├── dashboard.html      ← Admin dashboard shell
│
├── assets/
│   ├── css/
│   │   ├── variables.css   ← Centralized color tokens (edit here to retheme)
│   │   └── styles.css      ← Minimal shared custom CSS
│   │
│   ├── js/
│   │   └── app.js          ← Placeholder — JS added later
│   │
│   └── images/
│       └── .gitkeep        ← Tracks empty folder in Git
│
└── README.md
```

---

## Pages

| File              | Purpose                          |
|-------------------|----------------------------------|
| `index.html`      | Login page (centered card)       |
| `dashboard.html`  | Admin dashboard shell (sidebar + header + main + footer) |

---

## Quick Start

Open either HTML file directly in any modern browser — no build step required.  
Tailwind CSS is loaded via CDN, so an internet connection is required on first load.

---

## CSS Load Order

Both pages load stylesheets in this order:

```html
<!-- 1. Tailwind CSS -->
<script src="https://cdn.tailwindcss.com"></script>

<!-- 2. Centralized color variables -->
<link rel="stylesheet" href="assets/css/variables.css" />

<!-- 3. Custom overrides -->
<link rel="stylesheet" href="assets/css/styles.css" />
```

---

## Color System

All application colors are defined as CSS custom properties in `assets/css/variables.css`:

```css
:root {
    --color-primary:        #2563eb;
    --color-primary-hover:  #1d4ed8;
    --color-primary-light:  #eff6ff;
    --color-background:     #f8fafc;
    --color-surface:        #ffffff;
    /* ... etc. */
}
```

To retheme the entire application, **edit `variables.css` only**.  
Colors are consumed in HTML via Tailwind's arbitrary value syntax:

```html
class="bg-[var(--color-primary)]"
class="text-[var(--color-text-secondary)]"
class="border-[var(--color-border)]"
```

---

## Adding the Company Logo

Place the logo at:

```
assets/images/logo.png
```

Then in both `index.html` and `dashboard.html`, replace the `LOGO` placeholder span with:

```html
<img src="assets/images/logo.png" alt="Company Logo" class="h-8 w-auto object-contain" />
```

---

## Adding a Favicon

Place `favicon.ico` in `assets/images/` and add inside `<head>` on each page:

```html
<link rel="icon" href="assets/images/favicon.ico" type="image/x-icon" />
```

---

## Responsive Breakpoints

| Breakpoint | Width       | Sidebar      |
|------------|-------------|--------------|
| xs / sm    | 320px–639px | Hidden       |
| md         | 640px–767px | Hidden       |
| lg         | 768px–1023px| Hidden       |
| lg+        | 1024px+     | Visible      |

---

## Data

All pages read one shared file, `assets/js/data.js` (`window.STOCK`), built from real client files:

| Stock take | Client | Source files |
|-----|--------|--------------|
| `ST-2026-001` | Pavers (stock take 0589, 16 Sep 2026) | `0589ST.txt` device file, summary, compare, not-on-file |
| `ST-2025-001` | Stratford City (store 9104) | output + variance reports, `Current Stock_2024-09-24 Lookup File Master.xlsx` (310 items) |
| `ST-2024-001` | The Conran Shop - Sloane Square (14 Aug 2024) | audit, summary, not-on-file |

Pages that show one job (`job-details.html`, `job-areas-locations.html`, `job-reports.html`) take `?job=JOB-xxxx-nnn`.

Not in the source files, so filled in for the prototype: stock take IDs, counter/handheld assignment per location, and location finish times.
Pavers scans carry the barcode as the product code (their product file was not supplied), so they show "No description on file".

## Next Steps

- [ ] Replace `LOGO` placeholder with `assets/images/logo.png`
- [ ] Add favicon
- [ ] Add actual dashboard widgets / statistics cards
- [ ] Add navigation functionality (sidebar toggle on mobile)
- [ ] Connect login form to backend authentication
- [ ] Add client-side form validation in `assets/js/app.js`
- [ ] Add remaining pages (Clients, Locations, Stock Takes, Workers, Products, Reports, Settings)
