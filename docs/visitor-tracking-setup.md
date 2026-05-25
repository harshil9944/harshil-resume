# Visitor tracking setup (no backend)

Each visit is silently logged to a Google Sheet you own. The browser fetches the
visitor's IP + geolocation from a free keyless API, then POSTs the data to a
Google Apps Script web app that appends one row per visit. No server to run.

Captured per row:

```
timestamp · ip · city · region · country · latitude · longitude · timezone ·
org/isp · variant (route) · referrer · language · screen · userAgent
```

## One-time setup

### 1. Create the Sheet
1. Create a new Google Sheet.
2. Rename the first tab to **`Visits`**.
3. (Optional) Add a header row:
   `timestamp | ip | city | region | country | latitude | longitude | timezone | org | variant | referrer | language | screen | userAgent`

### 2. Add the Apps Script
In the Sheet: **Extensions → Apps Script**, replace the contents with:

```js
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Visits');
  const d = JSON.parse(e.postData.contents);
  sheet.appendRow([
    new Date(), d.ip, d.city, d.region, d.country,
    d.latitude, d.longitude, d.timezone, d.org, d.variant,
    d.referrer, d.language, d.screen, d.userAgent,
  ]);
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

Save the project.

### 3. Deploy as a web app
1. **Deploy → New deployment**.
2. Type (gear icon) → **Web app**.
3. **Execute as:** Me.
4. **Who has access:** Anyone.
5. Deploy, authorize when prompted, and copy the **Web app URL** (ends in `/exec`).

### 4. Wire it up
- Local dev: put the URL in [`.env.local`](../.env.local):
  ```
  VITE_VISITOR_SHEET_URL=https://script.google.com/macros/s/AKfyc.../exec
  ```
- Production (Vercel): add the same `VITE_VISITOR_SHEET_URL` variable in
  **Project → Settings → Environment Variables**, then redeploy.

> Note: this is a client-side bundle, so the `/exec` URL is visible to anyone who
> inspects the JS. That's acceptable for an append-only endpoint, but anyone with
> the URL could append rows. Re-deploy a new version to rotate it if needed.

## How it works
- [`src/trackVisitor.js`](../src/trackVisitor.js) does the geo fetch + POST.
- It's called from [`src/Root.jsx`](../src/Root.jsx) on each route load.
- De-dup: at most one row per route variant per browser **session**
  (`sessionStorage` key `tracked:<path>`), so refreshes and React StrictMode's
  double effect don't create duplicate rows.
- Geo source: `ipapi.co/json/` (primary) → `geojs.io` (fallback). Both keyless
  and HTTPS. If both fail, the visit is still logged with blank geo fields.

## Testing
1. Set `VITE_VISITOR_SHEET_URL`, run `npm run dev`.
2. Open `/aie`, `/se`, `/pm` → one new row each, with real IP/city and the
   correct `variant`.
3. Reload the same route → no duplicate row.
4. DevTools Network: the POST is opaque (status 0, no CORS error); the geo GET
   returns 200 JSON.

## Privacy note
This logs IP + approximate location silently, which can implicate GDPR/ePrivacy
for EU visitors. Common for personal sites, but if you later need consent, gate
the `trackVisitor()` call behind a dismissible banner.
