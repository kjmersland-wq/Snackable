# Snackable Learn - Deployment & Optimization Guide

AI-drevet mikrolæringsplattform med fokus på Active Recall og Spaced Repetition.

## 🚀 Quick Start

### Lokal Utvikling
```bash
# Clone repository
git clone https://github.com/kjmersland-wq/Snackable.git
cd Snackable

# Serve locally (Python 3)
python3 -m http.server 8000

# Eller med Node.js
npx serve .

# Åpne i browser
open http://localhost:8000
```

### Testing
```bash
# Test service worker
# Viktig: Service workers krever HTTPS eller localhost

# Lighthouse audit (Chrome DevTools)
# 1. Åpne DevTools (F12)
# 2. Gå til "Lighthouse" tab
# 3. Kjør audit for alle kategorier
```

---

## 📦 Deployment Options

### Option 1: GitHub Pages (Current)
Allerede konfigurert og deployet til:
- **URL:** https://kjmersland-wq.github.io/Snackable/

**Begrensninger:**
- Ingen custom HTTP headers
- Begrenset til static content
- Ingen server-side processing

### Option 2: Vercel (Anbefalt)
Optimal for static sites med custom headers.

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

**Fordeler:**
- ✅ Automatisk HTTPS
- ✅ Custom headers support
- ✅ Edge caching
- ✅ Analytics built-in
- ✅ Git integration

**Config (`vercel.json`):**
```json
{
  "cleanUrls": true,
  "trailingSlash": false,
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "SAMEORIGIN"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=31536000"
        }
      ]
    }
  ]
}
```

### Option 3: Netlify
Lignende som Vercel, god for static sites.

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy

# Production
netlify deploy --prod
```

**Config (`netlify.toml`):**
```toml
[build]
  publish = "."

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "SAMEORIGIN"
    X-Content-Type-Options = "nosniff"
    Strict-Transport-Security = "max-age=31536000"
```

### Option 4: Cloudflare Pages
Gratis med unlimited bandwidth.

1. Gå til [Cloudflare Pages](https://pages.cloudflare.com/)
2. Connect Git repository
3. Deploy settings:
   - Build command: (ingen)
   - Publish directory: `/`

---

## 🔧 Post-Deployment Checklist

### 1. Search Console Setup
```bash
# Google Search Console
1. Gå til https://search.google.com/search-console
2. Add property (URL prefix)
3. Verify ownership (HTML file eller DNS)
4. Submit sitemap: https://yourdomain.com/sitemap.xml
```

### 2. Bing Webmaster Tools
```bash
1. Gå til https://www.bing.com/webmasters
2. Add site
3. Verify ownership
4. Submit sitemap
```

### 3. Analytics (Optional)
```html
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### 4. Security Headers Validation
Test med:
- https://securityheaders.com/
- https://observatory.mozilla.org/

---

## 📊 Performance Monitoring

### Core Web Vitals
Track these metrics:
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

**Tools:**
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Web Vitals Chrome Extension](https://chrome.google.com/webstore/detail/web-vitals/ahfhijdlegdabablpippeagghigmibma)
- Google Search Console (Core Web Vitals Report)

### Lighthouse CI
Automatiser Lighthouse-tester:

```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI
on: [push]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: treosh/lighthouse-ci-action@v9
        with:
          urls: |
            https://kjmersland-wq.github.io/Snackable/
            https://kjmersland-wq.github.io/Snackable/features.html
          uploadArtifacts: true
```

---

## 🌐 SEO Optimization

### Sitemap Submission
```bash
# Submit til Google
https://search.google.com/search-console/sitemaps

# Submit til Bing
https://www.bing.com/webmasters/sitemaps

# Ping Google (optional)
http://www.google.com/ping?sitemap=https://yourdomain.com/sitemap.xml
```

### Structured Data Testing
Validér schema markup:
- [Rich Results Test](https://search.google.com/test/rich-results)
- [Schema Markup Validator](https://validator.schema.org/)

### Hreflang Testing
- [Hreflang Tags Testing Tool](https://www.aleydasolis.com/english/international-seo-tools/hreflang-tags-generator/)

---

## 🔐 Security Best Practices

### Content Security Policy (CSP)
Se `SECURITY_HEADERS.md` for fullstendig konfigurasjon.

**Viktig:**
- Unngå `unsafe-inline` når mulig
- Whiteliste kun nødvendige domener
- Test CSP i report-only mode først

### HTTPS & HSTS
- ✅ Alltid bruk HTTPS
- ✅ Aktiver HSTS header
- ✅ Consider HSTS preload list

### Cookie & Privacy
Siden bruker ingen cookies for øyeblikket, men ved implementering:
- Implementer cookie consent banner
- Følg GDPR/CCPA requirements
- Oppdater privacy policy

---

## 📱 PWA Installation

### Desktop (Chrome/Edge)
1. Åpne siden
2. Klikk "Install" i address bar
3. Eller: Chrome menu → "Install Snackable Learn"

### Mobile (Android)
1. Åpne siden i Chrome
2. Tap menu (⋮)
3. "Add to Home screen"

### iOS (Safari)
1. Åpne siden i Safari
2. Tap Share button
3. "Add to Home Screen"

---

## 🎨 Customization

### Farger
Hovedfarger definert i `styles.css`:
```css
:root {
  --v:   #8B5CF6;  /* Violet */
  --in:  #6366F1;  /* Indigo */
  --cy:  #06B6D4;  /* Cyan */
  --em:  #10B981;  /* Emerald */
}
```

### Typography
System font stack for ytelse:
```css
font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
```

---

## 🐛 Troubleshooting

### Service Worker Issues
```bash
# Clear cache og reload
Chrome DevTools → Application → Clear storage

# Unregister service worker
Chrome DevTools → Application → Service Workers → Unregister
```

### Cache Busting
Oppdater versjon i `sw.js`:
```javascript
const CACHE_VERSION = 'snackable-v4'; // Increment when deploying
```

### Debugging
```javascript
// Enable service worker debugging
navigator.serviceWorker.getRegistrations().then(regs => {
  regs.forEach(reg => console.log(reg));
});
```

---

## 📝 Maintenance

### Regular Tasks
- [ ] Oppdater dependencies (hvis noen)
- [ ] Sjekk broken links
- [ ] Monitorer Core Web Vitals
- [ ] Review security headers
- [ ] Test forms (FormSubmit)
- [ ] Verifiser Stripe integration

### Quarterly Reviews
- [ ] Lighthouse audit på alle sider
- [ ] SEO ranking analysis
- [ ] Competitor analysis
- [ ] Content freshness update
- [ ] Schema markup validation

---

## 📚 Documentation

- **SEO Audit:** `SEO_AUDIT.md`
- **Security Headers:** `SECURITY_HEADERS.md`
- **Sitemap:** `sitemap.xml`
- **Robots:** `robots.txt`
- **PWA Manifest:** `manifest.json`

---

## 🤝 Support

- **Email:** kjmersland@gmail.com
- **Location:** Kristiansand, Norge
- **GitHub:** [kjmersland-wq/Snackable](https://github.com/kjmersland-wq/Snackable)

---

## 📄 License

© 2025 KM Tech Labs. Alle rettigheter forbeholdt.

---

**Last Updated:** 1. mai 2026  
**Version:** 1.0.0  
**Status:** 🚀 Production Ready
