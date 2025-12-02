# Vercel KV Setup Instructions (via Upstash Marketplace)

Follow these steps to set up Upstash Redis (Vercel KV) for global interaction sync.

> **Note:** Vercel now provides KV through the Marketplace via Upstash. The free tier is very generous!

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

## 3. Update API Routes to Use Upstash Env Vars

The `@vercel/kv` package can use either Vercel KV or Upstash env vars. Update both API routes:

**Edit `apps/web/src/app/api/sync/route.js`:**
```javascript
// At the top, after imports
const isKVConfigured = () => {
    // Check for either Vercel KV or Upstash env vars
    return (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) ||
           (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);
};
```

**Edit `apps/web/src/app/api/stats/route.js`:**
```javascript
// At the top, after imports
const isKVConfigured = () => {
    // Check for either Vercel KV or Upstash env vars
    return (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) ||
           (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);
};
```

## 4. Pull Environment Variables Locally

```bash
cd /Users/lloyd/github/antigravity/politok
vercel env pull apps/web/.env.local
```

This downloads the Upstash credentials to your local `.env.local` file.

Your `.env.local` should now contain:
```
UPSTASH_REDIS_REST_URL="https://..."
UPSTASH_REDIS_REST_TOKEN="..."
```

## 5. Test Locally

### Web
```bash
cd /Users/lloyd/github/antigravity/politok
pnpm web
```

Visit `http://localhost:3000`, like a video, and you should see **no errors** in the console (silent sync).

### Check Upstash Dashboard
1. Go to your Upstash Console: [console.upstash.com](https://console.upstash.com)
2. Select your database (`politok-stats`)
3. Click **Data Browser**
4. Look for keys like:
   - `likes:prop1`
   - `views:prop1`
   - `follows:profile`

## 6. Deploy to Production

```bash
vercel --prod
```

The environment variables are already connected, so sync will work immediately.

## 7. Monitor Usage

- Go to Upstash Console → Your Database → **Metrics**
- **Free tier**: 10,000 commands/day (~300K/month)
- **Current estimate**: ~500 commands/day (5% utilization)

---

## Upstash Free Tier vs Vercel KV

| Feature | Upstash (via Marketplace) | Old Vercel KV |
|---------|---------------------------|---------------|
| **Commands/month** | ~300K | 30K |
| **Commands/day** | ~10K | ~1K |
| **Storage** | 256 MB | 256 MB |
| **Cost** | **FREE** | FREE |
| **Your usage** | 5% of limit | 50% of limit |

**Upstash is actually more generous!** 🎉

---

## Troubleshooting

### "Still seeing errors locally"
- Make sure you ran `vercel env pull apps/web/.env.local`
- Restart your dev server (`Ctrl+C` then `pnpm web`)
- Check that `.env.local` exists in `apps/web/` directory

### "Rate limit exceeded" (429)
- Very unlikely with Upstash's 10K/day limit
- If it happens: Data queues locally and retries
- App continues working (local-only mode)

### "Can't find database in Upstash"
- Go to [console.upstash.com](https://console.upstash.com)
- Login with the account you used for Vercel integration
- Your database should be listed there

