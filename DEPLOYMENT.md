# Deployment Guide

## Deploying to Vercel

### Option 1: GitHub Integration (Recommended)

1. **Push to GitHub:**
   ```bash
   cd thorbit-landing
   git init
   git add .
   git commit -m "Initial commit: Thorbit landing page"
   git remote add origin https://github.com/yourusername/thorbit-landing.git
   git push -u origin main
   ```

2. **Import in Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings
   - Click "Deploy"

3. **Custom Domain (Optional):**
   - Go to Project Settings → Domains
   - Add your custom domain (e.g., `thorbit.com`)
   - Update DNS records as instructed

### Option 2: Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   cd thorbit-landing
   vercel
   ```

3. **Follow prompts:**
   - Set up and deploy
   - Link to existing project or create new
   - Deploy to production: `vercel --prod`

## Environment Variables

This landing page has no environment variables required.

If you add features that need env vars:
1. Create `.env.local` locally
2. Add to Vercel: Project Settings → Environment Variables

## Build Settings (Auto-detected)

- **Framework Preset:** Next.js
- **Build Command:** `npm run build`
- **Output Directory:** `.next`
- **Install Command:** `npm install`
- **Node Version:** 20.x (default)

## Performance Optimizations

✅ Standalone output mode enabled
✅ Static optimization for all pages
✅ CSS minification
✅ Image optimization (if images added)
✅ Automatic code splitting

## Post-Deployment

1. **Verify deployment:** Visit your Vercel URL
2. **Test all sections:** Scroll through entire page
3. **Check mobile:** Use responsive design mode
4. **Verify CTAs:** Test "Book a Demo" buttons
5. **Check console:** No errors should appear

## Continuous Deployment

Once connected to GitHub, Vercel automatically:
- Deploys every push to `main` branch → Production
- Creates preview deployments for PRs
- Runs build checks on all branches

## Rollback

If something goes wrong:
1. Go to Vercel Dashboard → Deployments
2. Find previous working deployment
3. Click "..." → "Promote to Production"

## Custom Domain Setup

1. **Add domain in Vercel:**
   - Project Settings → Domains
   - Enter your domain (e.g., `thorbit.com`)

2. **Update DNS records:**
   - Add A record: `76.76.21.21`
   - Or CNAME: `cname.vercel-dns.com`

3. **Wait for propagation:** Usually 1-24 hours

## SSL Certificate

- Vercel automatically provisions SSL (Let's Encrypt)
- HTTPS enabled by default
- Auto-renewal handled

## Analytics (Optional)

Enable Vercel Analytics:
1. Install: `npm i @vercel/analytics`
2. Add to layout:
   ```tsx
   import { Analytics } from '@vercel/analytics/react';

   export default function RootLayout({ children }) {
     return (
       <html>
         <body>
           {children}
           <Analytics />
         </body>
       </html>
     );
   }
   ```
3. Redeploy

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
