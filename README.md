# PerpsIA landing site

The PerpsIA landing site is a Next.js application for the public homepage and live signal feed.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Live signal data

The browser only calls the same-origin `/api/signals` route. That route proxies the public PerpsIA backend, normalizes the response, and keeps upstream failures out of the client.

The default backend is `https://perpsia.onrender.com`. Set these server-side environment variables when the deployment needs a different backend or a dedicated live-signal endpoint:

```text
PERPSIA_API_BASE_URL=https://perpsia.onrender.com
PERPSIA_SIGNAL_API_URL=https://your-backend.example/api/signals
PERPSIA_API_TOKEN=
```

`PERPSIA_SIGNAL_API_URL` is optional. Without it, the site reads the backend's active `/api/signals?days=2` feed. Set `PERPSIA_API_TOKEN` to the same server-side value as the terminal's `PERPSIA_INTERNAL_API_TOKEN` so the proxy can read protected quality data. No placeholder signals are generated. Trading links are rendered only when the backend supplies a verified HTTPS venue link.

## Verification

```bash
npm run lint
npm run build
npm run start -- -p 4173
```

The homepage is at `/`, the full signal board is at `/signals`, and the internal proxy is at `/api/signals`.
