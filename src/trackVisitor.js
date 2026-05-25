// Silent, owner-only visitor tracking — no backend.
//
// On each visit we fetch the visitor's IP + geolocation from a free, keyless,
// HTTPS API, bundle it with referrer / device details, and fire-and-forget POST
// it to a Google Apps Script web app that appends a row to a Google Sheet.
//
// See docs/visitor-tracking-setup.md for the one-time Apps Script setup and how
// to set VITE_VISITOR_SHEET_URL.

const SHEET_URL = import.meta.env.VITE_VISITOR_SHEET_URL

// Module-level guard so React StrictMode's double-invoked effect (dev) can't
// fire two requests before sessionStorage is written.
const inFlight = new Set()
let warnedMissingUrl = false

// Pull the geo from ipapi.co, falling back to geojs.io. Both are keyless +
// HTTPS + CORS-enabled. Normalize the two response shapes into one object.
// Never throws — on total failure returns an empty-ish object so the visit is
// still logged (with blank geo).
async function fetchGeo() {
  try {
    const res = await fetch('https://ipapi.co/json/')
    if (!res.ok) throw new Error(`ipapi ${res.status}`)
    const d = await res.json()
    if (d.error) throw new Error(d.reason || 'ipapi error')
    return {
      ip: d.ip,
      city: d.city,
      region: d.region,
      country: d.country_name,
      latitude: d.latitude,
      longitude: d.longitude,
      timezone: d.timezone,
      org: d.org,
    }
  } catch {
    try {
      const res = await fetch('https://get.geojs.io/v1/ip/geo.json')
      if (!res.ok) throw new Error(`geojs ${res.status}`)
      const d = await res.json()
      return {
        ip: d.ip,
        city: d.city,
        region: d.region,
        country: d.country,
        latitude: d.latitude,
        longitude: d.longitude,
        timezone: d.timezone,
        org: d.organization_name || d.organization,
      }
    } catch {
      return {}
    }
  }
}

/**
 * Log a single visit for the given route variant.
 * Safe to call on every render/route change — at most one row per variant per
 * browser session, and tracking failures never bubble up to the page.
 */
export async function trackVisitor(variant) {
  try {
    const key = `tracked:${variant}`

    // Per-session de-dup (survives re-renders + refresh within a tab).
    if (sessionStorage.getItem(key)) return
    // In-flight de-dup (StrictMode double effect, before sessionStorage write).
    if (inFlight.has(key)) return
    inFlight.add(key)
    sessionStorage.setItem(key, '1')

    if (!SHEET_URL) {
      if (!warnedMissingUrl) {
        console.warn('[trackVisitor] VITE_VISITOR_SHEET_URL not set — skipping visit logging')
        warnedMissingUrl = true
      }
      inFlight.delete(key)
      return
    }

    const geo = await fetchGeo()
    const payload = {
      ...geo,
      variant,
      referrer: document.referrer || '(direct)',
      language: navigator.language,
      screen: `${screen.width}x${screen.height}`,
      url: location.href,
      userAgent: navigator.userAgent,
    }

    // no-cors + default text/plain body avoids the CORS preflight Apps Script
    // can't answer. Response is opaque; the row still gets appended.
    await fetch(SHEET_URL, {
      method: 'POST',
      mode: 'no-cors',
      body: JSON.stringify(payload),
    })

    inFlight.delete(key)
  } catch (err) {
    // Tracking must never break the page.
    console.warn('[trackVisitor] failed:', err)
  }
}
