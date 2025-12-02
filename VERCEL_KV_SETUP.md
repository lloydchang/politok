# Vercel KV Setup Instructions

Follow these steps to set up Vercel KV for global interaction sync.

## 1. Create Vercel KV Database

1. Go to your Vercel Dashboard: [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your project (`politok`)
3. Navigate to **Storage** tab
4. Click **Create Database** → **KV** (Redis)
5. Name it: `politok-stats`
6. Select region closest to your users (e.g., `us-east-1`)
7. Click **Create**

## 2. Connect to Project

1. In the KV database page, click **Connect to Project**
2. Select your `politok` project
3. Select environment: **Production, Preview, Development** (all)
4. Click **Connect**

This automatically adds these environment variables:
```
KV_URL
KV_REST_API_URL
KV_REST_API_TOKEN
KV_REST_API_READ_ONLY_TOKEN
```

## 3. Pull Environment Variables Locally

```bash
cd /Users/lloyd/github/antigravity/politok
vercel env pull apps/web/.env.local
```

This downloads the KV credentials to your local `.env.local` file.

## 4. Update Mobile Sync Adapter

Edit `apps/mobile/src/lib/sync.js` and replace the API_BASE URL:

```javascript
const API_BASE = 'https://politok.vercel.app'; // Your actual Vercel URL
```

## 5. Test Locally

### Web
```bash
cd /Users/lloyd/github/antigravity/politok
pnpm web
```

Visit `http://localhost:3000`, like a video, and check the browser console for sync logs.

### Check Vercel KV Dashboard
1. Go to your KV database in Vercel Dashboard
2. Click **Data Browser**
3. Look for keys like:
   - `likes:prop1`
   - `views:prop1`
   - `follows:profile`

## 6. Deploy to Production

```bash
vercel --prod
```

The environment variables are already connected, so sync will work immediately.

## 7. Monitor Usage

- Go to **Storage** → `politok-stats` → **Usage**
- Free tier: 30K commands/month (~1K/day)
- Current estimate: ~500 commands/day (50% utilization)

---

## Troubleshooting

### "KV is not defined"
- Make sure you ran `vercel env pull`
- Restart your dev server

### "Rate limit exceeded" (429)
- You hit the 30K/month limit
- Data will queue locally and retry next month
- App continues working (local-only mode)

### "Sync failed" logs
- Check network connection
- Verify Vercel project is deployed
- Check browser console for detailed errors
