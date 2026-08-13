# Google Search Console — setup checklist

Use this when connecting the marketing site to **Google Search Console** (GSC) so you can monitor indexing, coverage, and search performance.

---

## Before you start

- A **Google account** you want to use for the property (often a shared workspace account).
- Access to **DNS** (if you verify a **Domain** property) or ability to deploy **files / meta tags** (if you verify a **URL prefix** property).
- The canonical site URL decided (with or without `www`, and `https` only).

---

## 1. Open Search Console

1. Go to [Google Search Console](https://search.google.com/search-console).
2. Sign in with the Google account that should own the property.

---

## 2. Add a property

You can add either:

| Type | Best for |
|------|-----------|
| **Domain** (`example.com`) | Covers all protocols and subdomains (`http`, `https`, `www`, `m.`, etc.). Verification is usually **DNS**. |
| **URL prefix** (`https://www.example.com/`) | Only that exact origin + path prefix. Verification: HTML file, meta tag, DNS, Google Analytics, etc. |

Pick one approach and stick to it; **Domain** is often simpler long-term if you control DNS.

---

## 3. Verify ownership

Follow the method GSC shows for your property type.

### Domain property (recommended if you control DNS)

1. GSC gives you a **TXT record** (name/host and value).
2. Add that TXT record at your DNS host (where `zextdigital.ai` or your domain is managed).
3. Wait for DNS to propagate (minutes to hours).
4. Click **Verify** in GSC.

### URL prefix property

Common options for a static site (e.g. Next.js `output: "export"` deployed to CDN or static hosting):

- **HTML file**: Download the file GSC provides and place it under **`public/`** in this repo so it is deployed at `https://your-domain/google*.html` (exact filename GSC gives you). Rebuild and redeploy, then verify.
- **Meta tag**: Add the `<meta name="google-site-verification" content="…" />` tag to the document head (e.g. root `layout.tsx` `<head>`), deploy, then verify.
- **DNS TXT** (if offered for URL prefix): Same idea as domain verification.

After a successful verification, keep the verification method in place (do not remove the DNS record or meta tag unless you switch method).

---

## 4. Submit your sitemap

1. In GSC, open **Sitemaps** (left menu).
2. Under **Add a new sitemap**, enter the path only if GSC asks for a path, e.g. `sitemap.xml` (full URL will be `https://www.your-domain.com/sitemap.xml`).
3. Submit.

This project ships a sitemap under **`public/sitemap.xml`**, so the live URL is typically:

`https://YOUR_DOMAIN/sitemap.xml`

Ensure **`public/robots.txt`** lists the same `Sitemap:` URL as your production domain (including `www` vs non-`www` to match how users and Google reach the site).

---

## 5. Set a preferred domain (optional)

If you use **URL prefix** properties for both `https://example.com` and `https://www.example.com`, add both and use **Settings → Site settings** (or redirects) so only one canonical host is indexed. Prefer **301 redirects** + consistent internal links + canonical tags.

---

## 6. Request indexing for important URLs (optional)

1. Use **URL inspection** at the top of GSC.
2. Enter a full URL (e.g. homepage or a key landing page).
3. If needed, click **Request indexing** after publishing changes.

Use sparingly; normal crawling plus a valid sitemap is usually enough.

---

## 7. What to check over the following weeks

- **Pages** / **Indexing** — See which URLs are indexed or excluded and why.
- **Experience** (Core Web Vitals, HTTPS, mobile usability) — Fix issues GSC reports.
- **Performance** — Queries, impressions, clicks (data appears after traffic and time).

---

## Troubleshooting (short)

| Issue | What to try |
|--------|-------------|
| Verification fails | Recheck DNS TXT exactly; clear typos; wait for DNS TTL. For HTML file, confirm the file is reachable at the exact URL GSC shows. |
| Sitemap “Couldn’t fetch” | Confirm `https://YOUR_DOMAIN/sitemap.xml` opens in a browser; fix deploy or `robots.txt` blocking. |
| Wrong host indexed | Align redirects, canonical URLs, and GSC property with one preferred host (`www` or apex). |

---

## Official reference

- [Google Search Console help](https://support.google.com/webmasters)
