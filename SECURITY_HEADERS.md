# Security Headers Recommendations for Snackable

This document provides recommended HTTP security headers for production deployment.

## Recommended Headers for GitHub Pages / Vercel / Netlify

Since GitHub Pages doesn't allow custom headers, these recommendations are for when deploying to platforms like Vercel or Netlify.

### 1. Content Security Policy (CSP)
```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://js.stripe.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://formsubmit.co https://api.stripe.com; frame-src 'self' https://js.stripe.com; base-uri 'self'; form-action 'self' https://formsubmit.co;
```

**Note**: `'unsafe-inline'` is used for inline styles and scripts. Consider moving inline scripts to external files for stricter CSP.

### 2. X-Frame-Options
```
X-Frame-Options: SAMEORIGIN
```
Prevents clickjacking attacks by disallowing the site from being embedded in iframes on other domains.

### 3. X-Content-Type-Options
```
X-Content-Type-Options: nosniff
```
Prevents MIME type sniffing and forces browsers to respect declared content types.

### 4. Referrer-Policy
```
Referrer-Policy: strict-origin-when-cross-origin
```
Already implemented via meta tag in all HTML files.

### 5. Permissions-Policy
```
Permissions-Policy: geolocation=(), microphone=(), camera=(), payment=(self "https://js.stripe.com")
```
Controls which browser features and APIs the site can use.

### 6. Strict-Transport-Security (HSTS)
```
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```
Forces HTTPS connections and can be submitted to HSTS preload list.

### 7. X-XSS-Protection
```
X-XSS-Protection: 1; mode=block
```
Legacy header for older browsers that don't support CSP.

## Implementation Examples

### Vercel (vercel.json)
```json
{
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
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=31536000; includeSubDomains"
        },
        {
          "key": "Permissions-Policy",
          "value": "geolocation=(), microphone=(), camera=(), payment=(self \"https://js.stripe.com\")"
        },
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline' https://js.stripe.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://formsubmit.co https://api.stripe.com; frame-src 'self' https://js.stripe.com; base-uri 'self'; form-action 'self' https://formsubmit.co;"
        }
      ]
    }
  ]
}
```

### Netlify (_headers)
```
/*
  X-Frame-Options: SAMEORIGIN
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Strict-Transport-Security: max-age=31536000; includeSubDomains
  Permissions-Policy: geolocation=(), microphone=(), camera=(), payment=(self "https://js.stripe.com")
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://js.stripe.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://formsubmit.co https://api.stripe.com; frame-src 'self' https://js.stripe.com; base-uri 'self'; form-action 'self' https://formsubmit.co;
```

## Testing Security Headers

Use these tools to test your security headers once deployed:

1. **Mozilla Observatory**: https://observatory.mozilla.org/
2. **Security Headers**: https://securityheaders.com/
3. **CSP Evaluator**: https://csp-evaluator.withgoogle.com/

## Notes

- GitHub Pages automatically serves content over HTTPS but doesn't allow custom headers
- These headers should be configured in your hosting platform's settings
- Review and adjust CSP directives based on your actual external dependencies
- Consider adding Subresource Integrity (SRI) hashes for external scripts like Stripe

## Current Status

✅ Referrer-Policy implemented via meta tag
⚠️ Other headers require hosting platform configuration
