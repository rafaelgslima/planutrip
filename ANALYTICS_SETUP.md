# Analytics Setup Guide for Planutrip

**Status:** Phase 1 Quick Wins - Analytics Configuration  
**Created:** May 7, 2026  
**Objective:** Set up monitoring tools to track SEO progress and organic traffic

---

## 1. Google Search Console (GSC) Setup

### What It Does
- Shows which keywords appear in search results for your domain
- Tracks click-through rates (CTR), impressions, and average position
- Alerts you to indexing issues and crawl errors
- Validates sitemap submission

### Setup Steps

1. **Visit Google Search Console**
   - Go to https://search.google.com/search-console

2. **Verify Domain Ownership**
   - Click "Add property"
   - Select "URL prefix" and enter `https://planutrip.com`
   - Choose verification method (recommended: DNS record or HTML file)
   - Follow prompts to verify

3. **Submit Sitemap**
   - Once verified, go to "Sitemaps" section
   - Click "Add/test sitemaps"
   - Enter: `https://planutrip.com/sitemap.xml`
   - Click "Submit"

4. **Set Preferred Domain**
   - In settings, set preferred domain to `https://planutrip.com` (www vs non-www)

5. **Request Indexing**
   - Go to "URL Inspection" tool
   - Enter `https://planutrip.com/features`
   - Click "Request indexing" to manually crawl new pages

### What to Monitor Monthly
- **Queries:** Top 20 keywords + impressions + CTR
- **Pages:** Which pages are ranking and for what keywords
- **Coverage:** Any crawl errors or excluded pages
- **Mobile Usability:** Any mobile issues detected

---

## 2. Google Analytics 4 (GA4) Setup

### What It Does
- Tracks organic traffic to your site
- Shows user behavior, bounce rates, and conversions
- Enables goal tracking (e.g., signups from organic search)
- Provides device/browser/location insights

### Setup Steps

1. **Create GA4 Property**
   - Go to https://analytics.google.com
   - Click "Create" → "Property"
   - Name: "Planutrip Production"
   - Time zone: (your timezone)
   - Currency: USD
   - Click "Create"

2. **Add Measurement ID**
   - In Admin → Property Settings, find your **Measurement ID** (starts with `G-`)
   - Copy this ID

3. **Add GA4 to Next.js**
   - In `apps/web/src/pages/_app.tsx`, add after `<Head>`:
   ```jsx
   <Script
     strategy="afterInteractive"
     src={`https://www.googletagmanager.com/gtag/js?id=G-YOUR_MEASUREMENT_ID`}
   />
   <Script
     id="google-analytics"
     strategy="afterInteractive"
     dangerouslySetInnerHTML={{
       __html: `
         window.dataLayer = window.dataLayer || [];
         function gtag(){dataLayer.push(arguments);}
         gtag('js', new Date());
         gtag('config', 'G-YOUR_MEASUREMENT_ID');
       `,
     }}
   />
   ```
   - Replace `G-YOUR_MEASUREMENT_ID` with your actual ID

4. **Verify Installation**
   - In GA4 Admin, go to "Realtime"
   - Visit your site in browser
   - You should see traffic appear within 30 seconds

5. **Set Up Conversion Goals**
   - Go to Admin → Conversions
   - Click "Create new conversion event"
   - Create conversion for: "sign_up" (track when users visit /signup)
   - Create conversion for: "organic_session" (track organic traffic sessions)

### What to Monitor Monthly
- **Organic Traffic:** Sessions and users from organic search
- **Landing Pages:** Which pages drive the most organic traffic
- **Bounce Rate:** Are people finding what they want?
- **Conversions:** Are organic visitors signing up?
- **User Journey:** How do visitors navigate your site?

---

## 3. Core Web Vitals Monitoring

### What They Are
- **LCP (Largest Contentful Paint):** How fast does the main content load? (Target: < 2.5s)
- **INP (Interaction to Next Paint):** How responsive is your site? (Target: < 100ms)
- **CLS (Cumulative Layout Shift):** Does content jump around? (Target: < 0.1)

### Setup Steps

1. **Use PageSpeed Insights**
   - Go to https://pagespeed.web.dev
   - Enter `https://planutrip.com`
   - Click "Analyze"
   - Check scores for mobile and desktop
   - Identify opportunities for improvement

2. **Enable CrUX in GSC**
   - In Google Search Console, go to "Experience" → "Core Web Vitals"
   - This shows real-world user data (after 28 days of traffic)

3. **Track Weekly**
   - Set a calendar reminder to check PageSpeed Insights weekly
   - Log results in a spreadsheet to track trends

4. **Baseline Targets** (from CORE_WEB_VITALS_BASELINE.md)
   - LCP: < 2.5s (current baseline should be ~2.2s)
   - INP: < 100ms (currently good)
   - CLS: < 0.1 (ensure images have width/height)

---

## 4. Creating a Monitoring Dashboard

### Spreadsheet Template

Create a monthly tracking spreadsheet with columns:

| Date | GSC Impressions | GSC CTR | GSC Top Keyword | GA4 Organic Sessions | GA4 Signups | LCP (ms) | INP (ms) | CLS |
|------|---|---|---|---|---|---|---|---|
| May 7 | — | — | — | — | — | 2200 | 45 | 0.08 |
| May 14 | — | — | — | — | — | 2150 | 48 | 0.07 |
| May 21 | — | — | — | — | — | 2180 | 50 | 0.09 |

---

## 5. Timeline

- **Week 1:** Set up GSC + GA4
- **Week 2:** Verify installation, request indexing
- **Week 3:** Start collecting baseline data
- **Week 4:** Review first month of data, identify trends

---

## 6. Success Metrics (End of Phase 1 — July 31)

| Metric | Target |
|--------|--------|
| Indexed Pages | 8-10 pages (EN + PT versions) |
| Organic Traffic | 0-100 sessions/month baseline |
| Keywords in Top 50 | 5-10 keywords |
| Core Web Vitals (LCP) | < 2.5s |
| GSC Configuration | Complete + sitemap submitted |

---

## 7. Useful Links

- [Google Search Console Help](https://support.google.com/webmasters)
- [Google Analytics Help](https://support.google.com/analytics)
- [PageSpeed Insights](https://pagespeed.web.dev)
- [Core Web Vitals Guide](https://web.dev/vitals/)
- [Schema.org Validator](https://validator.schema.org/)

---

## Next Actions

1. Set up GSC (15 min)
2. Submit sitemap (5 min)
3. Set up GA4 (20 min)
4. Install GA4 code (10 min)
5. Verify real-time tracking (5 min)
6. Create monitoring spreadsheet (10 min)

**Total time:** ~1 hour

---

**Note:** GSC and GA4 may take 24-48 hours to show data. Don't panic if you see zero traffic initially—data aggregation takes time.
