# stocktaker

Day-to-day stocktake workflow, end to end — from the client's request landing in
the back office to the finished reports going back out — plus how the system runs
on site.

**Live page:** https://himanshuuniqueit.github.io/stocktaker/

## What's here

`index.html` — one self-contained page, two parts:

### The job, stage by stage

A two-lane (back office / on site) diagram plus the seven stages of a job:

1. **Requirement** _(back office)_ — client sends the requirement and product file; job created
2. **Setup** _(on site)_ — location map, groups, areas assigned to counters
3. **Counting** _(on site)_ — single / multi scan, close off locations, track green / white / waiting, flag duplicates
4. **Amend & check** _(on site)_ — corrections from the app, print location sheets
5. **Consolidate** _(on site → back office)_ — one merged set, final checks, job file back to base
6. **Reporting** _(back office)_ — audit, summary, comparison, variance
7. **Handover** _(back office)_ — reports to the client, job closed

Contract-dependent steps: printed location sheets (stage 4) only when the contract
calls for them; the variance report (stage 6) only when the client supplies a book
stock file.

### How the system runs

One back-office PC runs the browser-based app (the server + the one master list).
On site: a travel router with a 4G SIM (or the client's line) gives local Wi-Fi;
three Honeywell scanners run the app in Chrome with an offline queue. Scans go up
to the back-office PC; live updates and the product list come down. No signal —
scans queue on the device and send when back online, never counted twice. Nothing
to merge at the end because there is only one list.

## Running locally

No build step. Open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploy

GitHub Pages serves `index.html` from the `main` branch root. Push to `main` and
the live page updates.
