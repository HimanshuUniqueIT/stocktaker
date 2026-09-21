# Stock Take App — handheld (hi-fi mobile screens)

Clickable HTML prototype of the counter's handheld app, built from the wireframes in `../../wireframes`.
Shown inside a rugged Honeywell-style handheld (scanner window, orange side scan triggers that work, Android ◁ ○ □ keys) with a 360×640 POS-density screen.
No build step — open `index.html` (interactive phone) or `screens.html` (all nine screens, each one live).
On a real handheld / phone (≤ 520px wide) the frame drops away and the app fills the screen.

Screens: Login (username only) · Stock take list · History · Enter location (area found automatically)  · Scan type · Scan (single / multi) ·
Confirm save · Complete location · Sync data.

- Single scan adds +1 per scan; multi scan asks for a quantity and confirms before saving.
- Re-opening a location that is already synced shows a duplicate warning.
- Sync is manual only; scans stay on the device until synced.
- Data (`assets/data.js`) is real: Pavers, Stratford City and The Conran Shop barcodes and products.

## Editing
`index.html` and `screens.html` are generated (self-contained: CSS, data, JS and logo inlined, so they open straight
from disk). Edit `assets/*` or `src/*.src.html`, then run `python3 build.py`.
