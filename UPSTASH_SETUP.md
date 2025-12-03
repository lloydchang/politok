# Upstash Redis Setup Instructions

Follow these steps to set up Upstash Redis for global interaction sync.

> **Note:** We use Upstash Redis directly via the Vercel Marketplace integration.

## 1. Create Upstash Redis Database via Vercel Marketplace

1. Go to your Vercel Dashboard: [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your project (`politok`)
3. Navigate to **Storage** tab
4. Click **Create New**
5. Under **Marketplace Database Providers**, find **Upstash**
6. Click on **Upstash** → **Serverless DB (Redis, Vector, Queue, Search)**
7. Click **Add Integration** or **Get Started**
8. Sign up for Upstash (if you don't have an account) - **it's free!**
9. Create a Redis database:
   - Name: `politok-stats`
   - Type: **Global** (or select region closest to your users)
   - Click **Create**

## 2. Connect to Your Vercel Project

1. In the Upstash dashboard, select your database (`politok-stats`)
2. Click **Connect** or **Integrate**
3. Select your Vercel project (`politok`)
4. Select environments: **Production, Preview, Development** (all)
5. Click **Add Integration**

This automatically adds these environment variables to your Vercel project:
```
UPSTASH_REDIS_REST_URL
UPSTASH_REDIS_REST_TOKEN
```

## 3. Install Dependencies

We use the native Upstash client:

```bash
pnpm add @upstash/redis --filter @politok/web
```

## 4. Code Configuration

The API routes are configured to use the Upstash environment variables directly:

**`apps/web/src/app/api/sync/route.js` & `stats/route.js`:**
```javascript
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});
```

## 5. Pull Environment Variables Locally

To run locally, you need the credentials in your `.env.local` file:

```bash
cd /Users/lloyd/github/antigravity/politok
vercel env pull apps/web/.env.local
```

Your `.env.local` should now contain:
```
UPSTASH_REDIS_REST_URL="https://..."
UPSTASH_REDIS_REST_TOKEN="..."
```

## 6. Test Locally

### Web
```bash
cd /Users/lloyd/github/antigravity/politok
pnpm web
```

Visit `http://localhost:3000`, like a video, and you should see **no errors** in the console.

### Check Upstash Dashboard
1. Go to your Upstash Console: [console.upstash.com](https://console.upstash.com)
2. Select your database (`politok-stats`)
3. Click **Data Browser**
4. Look for keys like:
   - `likes:prop1`
   - `views:prop1`
   - `follows:profile`

## 7. Deploy to Production

```bash
vercel --prod
```

**Important:** If you just added the integration, you MUST redeploy for the environment variables to take effect.

## 8. Monitor Usage

- Go to Upstash Console → Your Database → **Metrics**
- **Free tier**: 10,000 commands/day (~300K/month)
- **Current estimate**: ~500 commands/day (5% utilization)

---

## Upstash Free Tier vs Vercel KV (Deprecated)

| Feature | Upstash (via Marketplace) | Old Vercel KV |
|---------|---------------------------|---------------|
| **Commands/month** | ~300K | 30K |
| **Commands/day** | ~10K | ~1K |
| **Storage** | 256 MB | 256 MB |
| **Cost** | **FREE** | FREE |
| **Your usage** | 5% of limit | 50% of limit |

**Upstash is significantly more generous!** 🎉

---

## Troubleshooting

### "Failed to parse URL from /pipeline"
- This means `UPSTASH_REDIS_REST_URL` is missing.
- **Fix:** Redeploy your project (`vercel --prod`) to pick up the new environment variables.

### "Still seeing errors locally"
- Make sure you ran `vercel env pull apps/web/.env.local`
- Restart your dev server (`Ctrl+C` then `pnpm web`)
- Check that `.env.local` exists in `apps/web/` directory

### "Rate limit exceeded" (429)
- Very unlikely with Upstash's 10K/day limit
- If it happens: Data queues locally and retries
- App continues working (local-only mode)

