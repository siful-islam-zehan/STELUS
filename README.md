# STELUS — GitHub Pages Static Storefront

A static HTML/CSS/JavaScript version of the STELUS clothing store, prepared for GitHub Pages. It does not require Python, Flask, SQLite, or a server.

## Publish on GitHub Pages

1. Create a GitHub repository (for example, `stelus-store`).
2. Upload **all files and folders in this directory** to the repository root. `index.html` must be directly in the root, not inside `public/`.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**, branch `main`, folder `/ (root)`, then click **Save**.
5. Wait for the Pages deployment to finish and open the URL shown on the Pages settings screen.

## What works in this static version

- Responsive storefront, hero section, custom tee section, and product cards
- Product category filters
- Shopping bag, quantities, sizes, and subtotal (stored for the current browser session)
- Checkout form prepares an order message and opens WhatsApp

## Important limitations

GitHub Pages only hosts static files. This version does **not** include a working database, admin dashboard, stock control, image upload, or server-side order storage. Orders are not submitted to a database; the checkout opens WhatsApp with a prepared message.

## Set your WhatsApp number

Open `store.js` and replace:

```js
const WHATSAPP_NUMBER = "8801XXXXXXXXX";
```

with your store's WhatsApp number in international digits-only format. For Bangladesh, use `8801...` and omit the leading `+`.

## Path notes

All local links use relative paths such as `./styles.css`, `./store.js`, and `./img/hero.svg`, so the site works both at a GitHub Pages project URL (`username.github.io/repository/`) and at a custom domain.

## Run locally

You can open `index.html` directly in a browser, or use VS Code Live Server for a more realistic local preview.


## Admin page (static demo)
- Visit `https://YOUR-USERNAME.github.io/YOUR-REPO/admin/` or `/admin.html`.
- Demo access code: `STELUS2026`. Change it in `admin/index.html` and `admin.html` if desired, but note this is not secure authentication.
- The static admin saves products to localStorage in the current browser only. It does not update the public storefront for other visitors. A shared/live admin needs a backend and database.
