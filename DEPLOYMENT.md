# Deployment Guide

This guide explains how to deploy the politok application to production using Vercel (web), GitHub Pages (web), and Expo Application Services (mobile).

## Deployment Overview

The web app can be deployed to **multiple platforms simultaneously**:
- **Vercel**: Primary web deployment with preview environments
- **GitHub Pages**: Alternative web deployment directly from GitHub
- **Mobile (EAS)**: iOS App Store and Google Play Store

All platforms support the full feature set including animations, observability, and analytics.

---

## Web App Deployment (Vercel)

### Prerequisites
- GitHub account
- Vercel account (free tier available at [vercel.com](https://vercel.com))

### Initial Setup

1. **Connect to GitHub**
   - Go to [vercel.com](https://vercel.com) and sign in
   - Click "Add New Project"
   - Import your GitHub repository

2. **Configure Build Settings**
   - Framework Preset: Other
   - Build Command: `cd apps/web && npm run build`
   - Output Directory: `apps/web/dist`
   - Install Command: `npm install`
   
   *Note: These are already configured in `vercel.json`*

3. **Configure Environment Variables**
   
   In the Vercel dashboard, go to Project Settings → Environment Variables and add:
   
   | Variable | Value | Environment |
   |----------|-------|-------------|
   | `VITE_POSTHOG_KEY` | Your PostHog API key | Production, Preview, Development |
   | `VITE_POSTHOG_HOST` | `https://app.posthog.com` | Production, Preview, Development |
   | `VITE_HONEYCOMB_API_KEY` | Your Honeycomb API key | Production, Preview, Development |

4. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy your app
   - You'll get a production URL (e.g., `politok.vercel.app`)

### Automatic Deployments

Once configured, Vercel will automatically:
- Deploy to production on push to `main` branch
- Create preview deployments for pull requests
- Provide deployment logs and analytics

### Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Vercel handles SSL certificates automatically

---

## Web App Deployment (GitHub Pages)

GitHub Pages provides free static hosting directly from your GitHub repository.

### Prerequisites
- GitHub repository (you already have this)
- Repository settings access

### Initial Setup

1. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Navigate to Settings → Pages
   - Under "Build and deployment":
     - Source: **GitHub Actions**

2. **Configure Environment Variables**
   
   In your repository, go to Settings → Secrets and variables → Actions:
   
   Add these repository secrets:
   | Secret Name | Value |
   |------------|-------|
   | `VITE_POSTHOG_KEY` | Your PostHog API key |
   | `VITE_POSTHOG_HOST` | `https://app.posthog.com` |
   | `VITE_HONEYCOMB_API_KEY` | Your Honeycomb API key |

3. **Deploy**
   - The GitHub Actions workflow is already configured in `.github/workflows/deploy-github-pages.yml`
   - Push to `main` branch to trigger deployment
   - Site will be available at: `https://[username].github.io/[repository-name]`

### Automatic Deployments

The workflow automatically:
- Builds on every push to `main` branch
- Can be manually triggered from Actions tab
- Deploys to GitHub Pages
- Shows build status in Actions tab

### Custom Domain (Optional)

1. Go to Repository Settings → Pages
2. Add custom domain under "Custom domain"
3. Configure DNS:
   - For apex domain (example.com): Add A records
   - For subdomain (www.example.com): Add CNAME record
4. GitHub handles SSL certificates automatically

### Concurrent Deployments

You can deploy to **both Vercel AND GitHub Pages** simultaneously:
- **Vercel**: Your primary domain (with PR previews)
- **GitHub Pages**: Backup/alternative access point

Both deployments will have identical functionality and features.

---

## Mobile App Deployment (Expo/EAS)

### Prerequisites
- Expo account (free at [expo.dev](https://expo.dev))
- EAS CLI installed: `npm install -g eas-cli`
- For iOS: Apple Developer account ($99/year)
- For Android: Google Play Developer account ($25 one-time)

### Initial Setup

1. **Login to EAS**
   ```bash
   cd apps/mobile
   eas login
   ```

2. **Configure Project**
   ```bash
   eas build:configure
   ```
   
   This will:
   - Create or update `eas.json`
   - Generate an EAS project ID
   - Update `app.json` with the project ID

3. **Set Environment Variables**
   
   Use EAS Secrets for sensitive data:
   ```bash
   eas secret:create --scope project --name EXPO_PUBLIC_POSTHOG_KEY --value "your_key"
   eas secret:create --scope project --name EXPO_PUBLIC_POSTHOG_HOST --value "https://app.posthog.com"
   eas secret:create --scope project --name EXPO_PUBLIC_HONEYCOMB_API_KEY --value "your_key"
   ```

### Development Build

For testing on your device:

```bash
# iOS (requires Mac)
eas build --platform ios --profile development

# Android
eas build --platform android --profile development
```

After build completes:
- **iOS**: Download and install on device or simulator
- **Android**: Download APK and install on device

### Preview Build

For internal testing/distribution:

```bash
# Both platforms
eas build --platform all --profile preview

# iOS only
eas build --platform ios --profile preview

# Android only
eas build --platform android --profile preview
```

### Production Build

For app store submission:

```bash
# Both platforms
eas build --platform all --profile production

# iOS only (creates .ipa)
eas build --platform ios --profile production

# Android only (creates .aab)
eas build --platform android --profile production
```

### Submit to App Stores

#### iOS App Store

1. **Build for production**
   ```bash
   eas build --platform ios --profile production
   ```

2. **Submit to App Store**
   ```bash
   eas submit --platform ios
   ```
   
   Or manually via App Store Connect.

#### Google Play

1. **Build for production**
   ```bash
   eas build --platform android --profile production
   ```

2. **Submit to Play Store**
   ```bash
   eas submit --platform android
   ```
   
   Or manually via Google Play Console.

---

## Build Profiles Reference

### Development
- **Purpose**: Testing on real devices during development
- **iOS**: Includes simulator support
- **Android**: Generates APK for easy installation
- **Distribution**: Internal only

### Preview
- **Purpose**: Internal testing and TestFlight/Internal Testing
- **iOS**: TestFlight compatible
- **Android**: APK for easy sharing
- **Distribution**: Internal testers

### Production
- **Purpose**: App store submissions
- **iOS**: Generates .ipa for App Store
- **Android**: Generates .aab for Play Store
- **Distribution**: Public via app stores

---

## Environment Variable Management

### Web (Vercel)
- Set in Vercel dashboard under Project Settings → Environment Variables
- Can be different for Production, Preview, and Development
- Automatically injected during build

### Mobile (EAS)
- Set via `eas secret:create` command
- Stored securely in EAS
- Available to all build profiles
- Can override in `eas.json` per profile

### Local Development
- Use `.env` files (not committed to git)
- See `.env.example` in each app directory

---

## Continuous Integration

### Vercel (Web)
Automatic on every commit:
- Production: `main` branch → Production deployment
- Preview: Pull requests → Preview deployment

### GitHub Pages (Web)
Automatic via GitHub Actions (`.github/workflows/deploy-github-pages.yml`):
- Production: `main` branch → GitHub Pages deployment
- Manual: Can trigger from Actions tab
- Build logs available in Actions tab

### EAS (Mobile)
Manual triggering via CLI or automate with GitHub Actions:

```yaml
# .github/workflows/eas-build.yml
name: EAS Build
on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install -g eas-cli
      - run: eas build --platform all --profile production --non-interactive
        env:
          EXPO_TOKEN: ${{ secrets.EXPO_TOKEN }}
```

---

## Troubleshooting

### Web Build Fails
- Check Vercel build logs
- Verify environment variables are set
- Test build locally: `npm run build` in `apps/web`
- Check Node version matches `package.json` engines

### Mobile Build Fails
- Check EAS build logs: `eas build:list`
- Verify bundle identifier/package name
- Check code signing (iOS)
- Verify EAS secrets are set correctly

### Environment Variables Not Working
- **Web**: Ensure variables start with `VITE_`
- **Mobile**: Ensure variables start with `EXPO_PUBLIC_`
- Verify they're set in the correct environment (Vercel dashboard or EAS secrets)
- Rebuild after setting new variables

### App Store Rejection
- Review Apple/Google rejection reasons
- Common issues: missing privacy policy, restricted APIs, incomplete app info
- Update metadata in App Store Connect/Play Console
- Resubmit after fixes

---

## Bundle Identifiers

Current configuration uses:
- **iOS**: `app.vercel.politok`
- **Android**: `app.vercel.politok`

To change:
1. Update in `apps/mobile/app.json`
2. Update in Apple Developer portal (iOS)
3. Update in Google Play Console (Android)
4. Rebuild app

---

## Monitoring Deployments

### Web (Vercel)
- Deployment dashboard shows all deploys
- Real-time build logs
- Analytics available in Vercel dashboard

### Mobile (EAS)
- View builds: `eas build:list`
- Build details: `eas build:view [BUILD_ID]`
- Submissions: `eas submit:list`

---

## Next Steps

1. **Web**: Connect GitHub repository to Vercel
2. **Mobile**: Run `eas build:configure` to get EAS project ID
3. **Both**: Set up environment variables
4. **Mobile**: Create development build for testing
5. **Both**: Test analytics and observability are working
6. **Mobile**: Submit to app stores when ready
