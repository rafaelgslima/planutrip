# Phase 1 Quick Wins — Deployment Checklist

**Current Status:** Build complete, all tests passing  
**Ready to Deploy:** YES ✅

---

## Pre-Deployment Verification (Run Now)

### Code Quality
```bash
# Verify build passes
pnpm --filter @planutrip/web build
# Expected: ✅ Compiled successfully

# Check for TypeScript errors
pnpm --filter @planutrip/web type-check
# Expected: ✅ No errors

# Run tests (if applicable)
pnpm --filter @planutrip/web test:run
# Expected: ✅ Tests pass
```

### Pages to Test Manually

- [ ] **Homepage** (`/`)
  - Loads quickly (< 3s)
  - Features link works
  - Signup button visible
  - No layout shifts

- [ ] **Features** (`/features`)
  - All 6 feature cards visible
  - "How it works" section loads
  - CTA button works
  - Mobile responsive

- [ ] **About** (`/about`)
  - Founder bio readable
  - Values section displays
  - CTA button functional

- [ ] **Contact** (`/contact`)
  - Form renders correctly
  - Mobile-friendly layout
  - Language selector works

### Schema Validation
- [ ] Visit https://validator.schema.org/
- [ ] Paste homepage HTML (right-click → View Page Source)
- [ ] Verify Organization schema shows green checkmark
- [ ] Verify SoftwareApplication schema shows green checkmark
- [ ] Repeat for Features page (Features should list 6 items)

### Mobile Testing
- [ ] Test on iPhone Safari
- [ ] Test on Android Chrome
- [ ] Verify navigation hamburger menu works
- [ ] Verify all buttons are tap-friendly (44px minimum)

---

## Deployment Steps

### 1. Commit Changes (5 min)
```bash
cd /Users/rafaelgodinho/workspace/planutrip

# Verify clean state (should show only expected changes)
git status

# Stage all changes
git add .

# Create descriptive commit
git commit -m "feat: Phase 1 quick wins SEO implementation

- Create Features page with SoftwareApplication schema
- Enhance Contact page with FAQPage schema
- Add hreflang tags for Portuguese localization
- Update sitemap with bilingual structure
- Add Features link to navigation (EN + PT)
- Create analytics setup guide

Phase 1 complete: 6 optimized pages, schema markup, internal linking, analytics foundation"
```

### 2. Push to Remote (2 min)
```bash
# Push to main/master
git push origin master
```

### 3. Deploy to Production (Timing depends on your hosting)
- **Vercel:** Auto-deploys on push (< 1 min)
- **Custom server:** Run `npm run build && npm run start`
- **Docker:** Rebuild and redeploy container

### 4. Verify Live Site (5 min)
- [ ] Visit https://planutrip.com in browser
- [ ] Visit https://planutrip.com/features
- [ ] Visit https://planutrip.com/about
- [ ] Visit https://planutrip.com/contact
- [ ] Check that all pages load without errors

### 5. Set Up Google Search Console (15 min)
Follow steps in ANALYTICS_SETUP.md:
```
1. Go to https://search.google.com/search-console
2. Add property: https://planutrip.com
3. Verify domain (DNS or HTML file method)
4. Go to Sitemaps section
5. Submit: https://planutrip.com/sitemap.xml
6. Click "Request indexing" for each main page
```

### 6. Set Up Google Analytics 4 (20 min)
Follow steps in ANALYTICS_SETUP.md:
```
1. Go to https://analytics.google.com
2. Create new property "Planutrip Production"
3. Get Measurement ID (G-XXXXXXXXXX)
4. (Optional) Add tracking code to _app.tsx
5. Test via Realtime tab
```

---

## Post-Deployment Verification (Day 1)

- [ ] **GSC shows crawl activity**
  - Go to Coverage tab in GSC
  - Should show pages being discovered
  - Timeline: 24-48 hours

- [ ] **Sitemap submitted**
  - Sitemaps section shows "Success" status
  - Shows number of URLs found

- [ ] **GA4 receiving data** (if code added)
  - Go to GA4 Realtime
  - Visit your site in incognito window
  - Should see activity within 30 seconds

- [ ] **Core Web Vitals acceptable**
  - Run PageSpeed Insights: https://pagespeed.web.dev/?url=https://planutrip.com
  - LCP should be < 2.5s ✅
  - INP should be < 100ms ✅
  - CLS should be < 0.1 ✅

---

## Weekly Monitoring (After Deployment)

### Every Monday
1. **Check GSC Coverage**
   - Are all pages indexed?
   - Any crawl errors?
   - Expected: All 6-12 pages indexed within 2-3 weeks

2. **Check PageSpeed Insights**
   - Still meeting Core Web Vitals targets?
   - Any new opportunities?
   - Log scores in spreadsheet

3. **Check GA4 (after 1 week)**
   - Are you seeing any organic sessions?
   - Which pages are most visited?
   - Expected: 0-50 sessions by Week 2

### End of Month (May 31)
- [ ] Document all metrics in tracking spreadsheet
- [ ] Compare to baseline
- [ ] Note any improvements or regressions

---

## Rollback Plan (If Issues Occur)

If you need to revert changes:

```bash
# See commit history
git log --oneline | head -10

# Revert to previous state
git revert HEAD  # Creates new commit undoing changes

# OR hard reset (only if not yet pushed)
git reset --hard <commit-hash>

# Push if reverted
git push origin master
```

---

## FAQ During Deployment

### "GSC says pages not found"
- Wait 24-48 hours for Google to crawl
- Ensure all pages load without errors
- Check robots.txt allows crawling
- Use URL Inspection to manually request indexing

### "GA4 shows zero traffic"
- Wait 24 hours for data collection
- Verify tracking code is installed
- Check Realtime view while visiting site
- Ensure code is live (view page source)

### "Core Web Vitals dropped"
- Run PageSpeed Insights again (cache may be stale)
- Check for new heavy JavaScript
- Verify images have width/height
- Check browser network tab for bottlenecks

### "Pages not appearing in search results yet"
- This is normal. Timeline:
  - Day 1-3: Google crawls via sitemap
  - Day 3-7: Pages indexed in Search Console
  - Week 2-3: Pages appear in search results
  - Week 3-4: First organic clicks

---

## Success Criteria (Week 1)

- ✅ All code deployed without errors
- ✅ Pages accessible at https://planutrip.com/features, /about, /contact
- ✅ Sitemap submitted to Google Search Console
- ✅ Google bot showing crawl activity in GSC
- ✅ No indexing errors in GSC Coverage report
- ✅ Core Web Vitals < 2.5s LCP on PageSpeed
- ✅ Analytics setup documented

---

## Success Criteria (Month 1 — End of May)

- ✅ All 6 pages indexed in Google Search Console
- ✅ 50-200 organic sessions in Google Analytics
- ✅ 5-10 keywords appearing in GSC (top 50)
- ✅ Core Web Vitals maintained (< 2.5s LCP)
- ✅ No critical crawl errors in GSC

---

## Next Phase (June-July)

Once Phase 1 is live and stable:

1. **Collect baseline data** (June 1-30)
   - Monitor organic traffic trends
   - Identify top-performing pages
   - Note user behavior patterns

2. **Plan Phase 2 enhancements** (Optional, if needed)
   - Portuguese page translations
   - Additional content
   - Link building outreach

3. **Continuous optimization**
   - Test title variations for CTR improvement
   - Optimize meta descriptions
   - Monitor Core Web Vitals

---

## Contacts & Resources

### Google Services
- **Google Search Console:** https://search.google.com/search-console
- **Google Analytics:** https://analytics.google.com
- **PageSpeed Insights:** https://pagespeed.web.dev

### Schema Validation
- **Schema.org Validator:** https://validator.schema.org/
- **Rich Snippet Tester:** https://search.google.com/test/rich-results

### Documentation
- **This folder contains:**
  - `ANALYTICS_SETUP.md` — Step-by-step analytics setup
  - `PHASE1_QUICK_WINS_COMPLETE.md` — Full Phase 1 overview
  - `SEO-STRATEGY.md` — Complete SEO strategy
  - `CORE_WEB_VITALS_BASELINE.md` — Performance targets

---

## Deploy Confirmation

When you're ready to deploy:

```
1. Run: pnpm --filter @planutrip/web build
2. Verify: ✅ Build passes
3. Commit: git commit -m "..."
4. Push: git push origin master
5. Verify: Check https://planutrip.com/features loads
6. Set up: Follow ANALYTICS_SETUP.md
7. Track: Create tracking spreadsheet
```

**You are ready to deploy.** 🚀

All Phase 1 quick wins are complete and production-ready.
