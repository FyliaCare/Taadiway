# 🚀 Render Deployment Guide - Taadiway + Neon# 🚀 Render Deployment Guide - Taadiway# 🚀 Render Deployment Guide - Taadiway



Complete guide to deploy Taadiway on Render.com with Neon PostgreSQL.



---Complete guide to deploy Taadiway on Render.com (FREE forever plan!)## Why Render?



## 🎯 Overview- ✅ **FREE Forever** (750 hours/month = 31 days continuous)



**Stack:**---- ✅ **Free PostgreSQL** (90 days, auto-renewable)

- **Frontend/Backend:** Render.com (FREE - 750 hours/month)

- **Database:** Neon PostgreSQL (FREE - 3GB storage)- ✅ **Zero Config** - Auto-detects Next.js

- **Total Cost:** $0/month forever! 🎉

## 🎯 Why Render?- ✅ **Very Reliable** - Better uptime than Railway/Vercel

---

- ✅ **Easy Database Setup** - One-click PostgreSQL

## 📋 Prerequisites

- ✅ **FREE Forever** - 750 hours/month (31 days continuous)- ✅ **Automatic Deployments** from GitHub

1. **GitHub Account** - Code must be on GitHub

2. **Render Account** - Sign up at https://render.com- ✅ **Free PostgreSQL** - 1GB database included- ✅ **Custom Domains** with free SSL

3. **Neon Account** - Sign up at https://neon.tech

4. **Project Ready** - All code committed and pushed- ✅ **Zero Config** - Auto-detects Next.js- ✅ **No Credit Card Required**



---- ✅ **Auto Deploy** - From GitHub commits



## 🗄️ Step 1: Create Neon Database (2 minutes)- ✅ **Better Reliability** - Fewer deployment failures than Vercel---



### 1. Sign Up for Neon- ✅ **Includes Database** - Unlike Vercel (charges extra)

1. Go to https://neon.tech

2. Click **"Sign Up"**## 📋 Step-by-Step Deployment

3. Sign in with GitHub (recommended)

---

### 2. Create Project

1. Click **"Create Project"**### 1️⃣ **Sign Up for Render**

2. Configure:

   - **Name:** `taadiway-production`## 📋 Prerequisites1. Go to: https://render.com/

   - **PostgreSQL:** Version 16

   - **Region:** EU (Frankfurt) or closest2. Click **"Get Started"** or **"Sign Up"**

3. Click **"Create Project"**

4. ⏱️ Wait 5-10 seconds1. **GitHub Account** - Your code must be on GitHub3. Choose **"Sign in with GitHub"**



### 3. Get Connection String2. **Render Account** - Sign up at https://render.com (free)4. Authorize Render to access your GitHub

1. On project dashboard, you'll see **"Connection Details"**

2. Copy the **Connection String**:3. **Project Ready** - All code committed and pushed

```

postgresql://user:pass@ep-xyz.aws.neon.tech/neondb?sslmode=require### 2️⃣ **Create PostgreSQL Database First**

```

3. 📋 **Save this** - you'll need it for Render!---



**Example:****IMPORTANT: Create database before the web service!**

```

postgresql://taadiway_user:abc123@ep-cool-sound-12345.us-east-2.aws.neon.tech/neondb?sslmode=require## 🗄️ Step 1: Create PostgreSQL Database

```

1. In Render Dashboard, click **"New +"** → **"PostgreSQL"**

---

### Option A: Via Render Dashboard (Recommended)2. Configure:

## 🌐 Step 2: Create Render Web Service (5 minutes)

   - **Name**: `Taadiway-db`

### 1. Connect GitHub

1. Go to https://dashboard.render.com1. Go to https://dashboard.render.com   - **Database**: `taadiway`

2. Click **"New +"** → **"Web Service"**

3. Connect your GitHub repository:2. Click **"New +"** → **"PostgreSQL"**   - **User**: `taadiway_user` (auto-generated)

   - **Repository:** `FyliaCare/Golden-Errands`

   - Click **"Connect"**3. Configure:   - **Region**: Choose closest to you (e.g., Oregon, Frankfurt)



### 2. Configure Service   - **Name:** `taadiway-db`   - **Plan**: **Free** (90 days, renewable)

```

Name: taadiway   - **Database:** `taadiway_production`3. Click **"Create Database"**

Region: Frankfurt (match your Neon region)

Branch: main   - **User:** `taadiway`4. Wait 1-2 minutes for database to be ready

Root Directory: (leave empty)

Runtime: Node   - **Region:** Choose closest to you5. **Copy the "Internal Database URL"** - you'll need this!

Build Command: npm install && npx prisma generate && npm run build

Start Command: npm start   - **Plan:** **Free** (1GB storage)

Plan: Free (750 hours/month)

```4. Click **"Create Database"**### 3️⃣ **Create Web Service**



### 3. Add Environment Variables5. **Wait 2-3 minutes** for database to initialize

Click **"Advanced"** and add these variables:

6. Copy the **Internal Database URL** (starts with `postgresql://`)1. Click **"New +"** → **"Web Service"**

```env

NODE_ENV=production2. Connect your GitHub repository:

DATABASE_URL=[Paste your Neon connection string from Step 1]

DATABASE_PROVIDER=postgresql### Option B: Via Blueprint (render.yaml)   - **Repository**: `FyliaCare/Taadiway`

JWT_SECRET=[Generate 64-char random string]

JWT_REFRESH_SECRET=[Generate another 64-char random string]   - Click **"Connect"**

NEXT_PUBLIC_API_URL=https://taadiway.onrender.com

NEXT_PUBLIC_APP_NAME=TaadiwayThe `render.yaml` file in the root will automatically create the database when you deploy.

```

### 4️⃣ **Configure Web Service**

### 4. Generate JWT Secrets

**In PowerShell:**---

```powershell

# Run the included script**Basic Settings:**

.\scripts\generate-secrets.ps1

## 🌐 Step 2: Create Web Service- **Name**: `Taadiway` (or your choice)

# Or manually generate:

-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 64 | ForEach-Object {[char]$_})- **Region**: Same as database (e.g., Oregon)

```

### Method 1: Manual Setup (Recommended for First Time)- **Branch**: `main`

Copy the generated strings and paste them into Render.

- **Root Directory**: `taadiway-nextjs`

### 5. Create Service

1. Review all settings1. Go to https://dashboard.render.com- **Runtime**: **Node**

2. Click **"Create Web Service"**

3. ⏱️ Wait 5-10 minutes for first deploy2. Click **"New +"** → **"Web Service"**- **Build Command**: `npm install && npx prisma generate && npm run build`



---3. Connect your GitHub repository:- **Start Command**: `npm start`



## 🔍 Step 3: Verify Deployment (2 minutes)   - **Repository:** `FyliaCare/Golden-Errands`



### 1. Watch Build Logs   - **Branch:** `main`**Instance Type:**

- Logs will show in real-time

- Look for:4. Configure service:- **Plan**: **Free** (750 hours/month)

  - ✅ `Dependencies installed`

  - ✅ `Prisma Client generated`   - **Name:** `taadiway-web`

  - ✅ `Migrations applied`

  - ✅ `Build successful`   - **Region:** Same as database### 5️⃣ **Add Environment Variables**

  - ✅ `Server listening on port 10000`

   - **Branch:** `main`

### 2. Test Health Endpoint

Once deployed, visit:   - **Root Directory:** Leave empty (or `taadiway-nextjs` if in subfolder)Click **"Advanced"** → Scroll to **"Environment Variables"**

```

https://taadiway.onrender.com/api/health   - **Environment:** `Node`

```

   - **Build Command:** `npm install && npx prisma generate && npm run build`Add these variables:

Expected response:

```json   - **Start Command:** `npm start`

{

  "status": "healthy",   - **Plan:** **Free**```env

  "timestamp": "2025-10-24T...",

  "service": "Taadiway API",# Database (from step 2 - Internal Database URL)

  "database": "connected",

  "version": "2.0.0"5. Click **"Advanced"** and add environment variables:DATABASE_URL

}

```postgresql://taadiway_user:xxxxx@dpg-xxxxx/taadiway



### 3. Test Application```env

Visit your app:

```NODE_ENV=production# JWT Secrets

https://taadiway.onrender.com

```DATABASE_URL=[Paste Internal Database URL from Step 1]JWT_SECRET



- ✅ Homepage loadsJWT_SECRET=[Generate a random 64-character string]9972bf38050211f5ef6faf0eeb6a3e8a6180e675dc89f586f65acb0c047409d4

- ✅ Can navigate to `/login`

- ✅ No console errorsJWT_REFRESH_SECRET=[Generate another random 64-character string]



### 4. Test Login (If Seeded)NEXT_PUBLIC_API_URL=https://taadiway-web.onrender.comJWT_REFRESH_SECRET

Try test credentials:

- **Admin:** admin@taadiway.com / Admin@123456```1fb4603d52e0c2f313042de160a042770b23fdfffca1681cc908366e1133a66d

- **Driver:** driver@taadiway.com / Driver@123

- **Client:** client@taadiway.com / Client@123



---6. Click **"Create Web Service"**# Node Environment



## 🌱 Step 4: Seed Database (Optional)NODE_ENV



To add test data:### Method 2: Blueprint Deploy (render.yaml)production



### Via Render Shell:

1. Go to your web service dashboard

2. Click **"Shell"** tab1. Go to https://dashboard.render.com# API URL (will be your Render URL)

3. Run:

```bash2. Click **"New +"** → **"Blueprint"**NEXT_PUBLIC_API_URL

npm run prisma:seed

```3. Connect repository and select `render.yaml`https://Taadiway.onrender.com



### Via Local:4. Review and approve the configuration```

```powershell

# Set Neon connection string5. Click **"Apply"**

$env:DATABASE_URL="[Your Neon connection string]"

$env:DATABASE_PROVIDER="postgresql"**To add each variable:**



# Run seed---1. Click **"Add Environment Variable"**

npm run prisma:seed

```2. Enter **Key** (e.g., `DATABASE_URL`)



---## 🔐 Step 3: Generate Secrets3. Enter **Value**



## 🔄 Step 5: Enable Auto-Deploy4. Repeat for all variables



1. Go to service **"Settings"**### Generate JWT Secrets (PowerShell):

2. Under **"Build & Deploy"**

3. Enable **"Auto-Deploy"** ✅### 6️⃣ **Create Web Service**

4. Select branch: `main`

```powershell

Now every push to `main` automatically deploys!

# Generate JWT_SECRET1. Scroll down and click **"Create Web Service"**

---

-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 64 | ForEach-Object {[char]$_})2. Render will start deploying (takes 5-10 minutes for first deploy)

## 🎨 Step 6: Custom Domain (Optional)

3. Watch the build logs - you'll see:

### 1. Add Domain in Render

1. Go to service **"Settings"**# Generate JWT_REFRESH_SECRET   ```

2. Scroll to **"Custom Domains"**

3. Click **"Add Custom Domain"**-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 64 | ForEach-Object {[char]$_})   ==> Installing dependencies

4. Enter: `www.taadiway.com`

```   ==> Running build

### 2. Update DNS

Add CNAME record to your DNS:   ==> Generating Prisma Client

```

Type: CNAMEOr use the included script:   ==> Building Next.js app

Name: www

Value: taadiway.onrender.com```powershell   ==> Deploy successful

```

.\scripts\generate-secrets.ps1   ```

### 3. Wait for SSL

- Render automatically provisions SSL certificate```

- Takes 5-10 minutes

- ✅ Your site will be available at https://www.taadiway.com### 7️⃣ **Run Database Migrations**



------



## 📊 Monitoring & LogsAfter first successful deployment, you need to run migrations.



### View Logs## 🗄️ Step 4: Run Database Migrations

1. Go to service dashboard

2. Click **"Logs"** tab**Option A: Use Render Shell (Recommended)**

3. See real-time logs

4. Filter by:### Option A: Automatic (During Build)

   - **Deploy** - Build logs

   - **Runtime** - Application logs1. In Render Dashboard → Your Web Service

   - **System** - System events

Migrations run automatically via the build command. Check build logs to verify.2. Click **"Shell"** tab (top menu)

### Monitor Metrics

1. Click **"Metrics"** tab3. Run these commands:

2. View:

   - CPU usage### Option B: Manual (Using Render Shell)   ```bash

   - Memory usage

   - Request count   npx prisma migrate deploy

   - Response time

   - Bandwidth1. Go to your web service dashboard   npx prisma db seed  # Optional: seed with test data



### Set Up Alerts2. Click **"Shell"** tab   ```

1. Go to **"Notifications"** in settings

2. Add email or Slack3. Run:

3. Configure alerts for:

   - Deployment failures```bash**Option B: Use Local Terminal**

   - Service down

   - High resource usagenpx prisma migrate deploy



---``````powershell



## 🚨 Troubleshootingcd "C:\Users\Jay Monty\Desktop\Projects\delivery_platform\Taadiway\taadiway-nextjs"



### Build Fails### Option C: Seed Database (Optional)



**Error:** `Prisma Client not generated`# Copy DATABASE_URL from Render

```bash

# Solution: Verify build command includes:To add test data:$env:DATABASE_URL="postgresql://your-render-database-url"

npx prisma generate

``````bash



**Error:** `Module not found`npm run prisma:seed# Run migrations

```bash

# Solution: Clear build cache```npx prisma migrate deploy

# Go to Settings → Clear build cache → Redeploy

```



### Database Connection Issues---# Seed database (optional)



**Error:** `Can't reach database server`npx prisma db seed

```

# Check:## ✅ Step 5: Verify Deployment```

1. DATABASE_URL is correct (from Neon dashboard)

2. Connection string includes ?sslmode=require

3. DATABASE_PROVIDER=postgresql is set

4. Neon database is active (not suspended)### Check Health Endpoint### 8️⃣ **Access Your App**

```



**Error:** `SSL connection required`

```envVisit: `https://taadiway-web.onrender.com/api/health`Your app will be live at:

# Ensure your connection string ends with:

?sslmode=require- **URL**: `https://Taadiway.onrender.com` (or your custom name)

```

Expected response:- **Admin Dashboard**: `https://Taadiway.onrender.com/admin/dashboard`

### Application Crashes

```json- **Driver Dashboard**: `https://Taadiway.onrender.com/driver/dashboard`

**Check environment variables:**

```bash{- **Client Dashboard**: `https://Taadiway.onrender.com/dashboard`

# In Render Shell:

echo $DATABASE_URL  "status": "healthy",

echo $JWT_SECRET

echo $NODE_ENV  "timestamp": "2025-10-24T...",---

```

  "service": "Taadiway API",

**Check logs for errors:**

1. Go to Logs tab  "database": "connected",## 🔄 Automatic Deployments

2. Look for error messages

3. Common issues:  "version": "2.0.0"

   - Missing environment variables

   - Database migration failed}After initial setup:

   - Port binding issues

```- **Push to `main` branch** = Automatic deployment

### Slow Performance

- **Manual Deploy** = Click "Manual Deploy" → "Deploy latest commit"

**Free tier limitations:**

- Service spins down after 15 min inactivity### Test Login- **Build Logs** = Real-time logs in dashboard

- Cold start: 30-60 seconds

- Neon also spins down after 5 min inactivity



**Solutions:**Visit: `https://taadiway-web.onrender.com/login`---

1. Upgrade Render to Starter ($7/month) - always on

2. Use uptime monitor to ping every 10 minutes

3. Accept cold start delay on first request

Try test credentials:## 🗄️ Database Management

---

- **Admin:** admin@taadiway.com / Admin@123456

## 💰 Pricing Breakdown

- **Driver:** driver@taadiway.com / Driver@123### Access PostgreSQL:

### Free Tier (What You Get)

- **Client:** client@taadiway.com / Client@123

**Render Free:**

- ✅ 750 hours/month (31 days continuous)**Via Render Dashboard:**

- ✅ 512 MB RAM

- ✅ 100 GB bandwidth/month---- Go to your database in Render

- ✅ Free SSL

- ✅ Automatic deployments- Click **"Connect"** → Copy connection details

- ⚠️ Spins down after 15 min inactivity

## 🔄 Step 6: Enable Auto-Deploy- Use any PostgreSQL client (pgAdmin, TablePlus, etc.)

**Neon Free:**

- ✅ 3 GB storage

- ✅ Unlimited compute hours

- ✅ 1 project1. Go to web service settings**Via Render Shell:**

- ✅ Autoscaling

- ⚠️ Spins down after 5 min inactivity2. Under **"Build & Deploy"**```bash



**Total: $0/month** 🎉3. Enable **"Auto-Deploy"** from `main` branch# In your web service shell



### Upgrade Options4. Every push to `main` will trigger automatic deploymentnpx prisma studio



**Render Starter ($7/month):**```

- Always on (no spin down)

- Faster response times---

- Same features as free

### Database Renewal:

**Neon Pro ($19/month):**

- 10 GB storage## 🎨 Step 7: Custom Domain (Optional)

- Multiple projects

- Longer historyFree PostgreSQL expires after 90 days, but:

- Advanced features

### Add Custom Domain1. Render sends email 7 days before expiry

---

2. Click renewal link in email (takes 1 click)

## 📝 Environment Variables Reference

1. Go to service **"Settings"**3. Or create new database and migrate data

### Required

```env2. Scroll to **"Custom Domains"**

NODE_ENV=production

DATABASE_URL=postgresql://user:pass@host/db?sslmode=require3. Click **"Add Custom Domain"**---

DATABASE_PROVIDER=postgresql

JWT_SECRET=64-character-random-string4. Enter your domain: `www.taadiway.com`

JWT_REFRESH_SECRET=64-character-random-string

```5. Add CNAME record to your DNS:## 🌐 Custom Domain (Optional)



### Optional   ```

```env

NEXT_PUBLIC_API_URL=https://your-domain.onrender.com   CNAME www taadiway-web.onrender.com### Add Your Own Domain:

NEXT_PUBLIC_APP_NAME=Taadiway

ANALYZE=false   ```

```

6. Wait for SSL certificate (automatic, free)1. Go to Web Service → **Settings** → **Custom Domains**

---

2. Click **"Add Custom Domain"**

## ✅ Deployment Checklist

---3. Enter your domain (e.g., `taadiway.com`)

- [ ] Neon account created

- [ ] Neon project created4. Add these DNS records to your domain:

- [ ] Connection string copied

- [ ] Render account created## 📊 Monitoring & Logs   ```

- [ ] Web service created

- [ ] All environment variables set   Type: CNAME

- [ ] First deploy successful

- [ ] Health check passes### View Logs   Name: www

- [ ] Application loads correctly

- [ ] Test login works   Value: Taadiway.onrender.com

- [ ] Auto-deploy enabled

- [ ] Monitoring configured1. Go to service dashboard   



---2. Click **"Logs"** tab   Type: A



## 📚 Additional Resources3. See real-time application logs   Name: @



- **Neon Setup:** [NEON_DATABASE_SETUP.md](./NEON_DATABASE_SETUP.md)4. Filter by severity   Value: [Render provides the IP]

- **Quick Checklist:** [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)

- **Migrations:** [MIGRATIONS_GUIDE.md](./MIGRATIONS_GUIDE.md)   ```

- **Performance:** [PERFORMANCE.md](./PERFORMANCE.md)

### Monitor Performance5. SSL certificate is automatically provisioned (free)

### External Links

- **Render Docs:** https://render.com/docs

- **Neon Docs:** https://neon.tech/docs

- **Render Support:** support@render.com1. Click **"Metrics"** tab---

- **Neon Discord:** https://discord.gg/neon

2. View:

---

   - CPU usage## 📊 Render Free Tier Limits

## 🎉 You're Live!

   - Memory usage

Your Taadiway platform is now deployed!

   - Request count| Resource | Free Tier | Notes |

**URLs:**

- **Application:** https://taadiway.onrender.com   - Response time|----------|-----------|-------|

- **Health Check:** https://taadiway.onrender.com/api/health

- **Neon Dashboard:** https://console.neon.tech| **Web Service Hours** | 750 hours/month | = 31 days continuous |



**What's Next?**### Set Up Alerts| **PostgreSQL** | Free for 90 days | Renewable with 1 click |

1. ✅ Test all features thoroughly

2. ✅ Monitor logs for errors| **Database Storage** | 1 GB | More than enough |

3. ✅ Set up custom domain (optional)

4. ✅ Configure monitoring alerts1. Go to **"Settings"**| **RAM** | 512 MB | Sufficient for Next.js |

5. ✅ Continue with backend API development

2. Add **"Notification Channels"**| **Build Minutes** | Unlimited | No limits! |

---

3. Configure alerts for:| **Bandwidth** | 100 GB/month | Plenty for APIs |

**Total deployment time: ~10-15 minutes** ⏱️

   - Service down| **Deployment Speed** | ~5-10 min | First deploy slower |

**Cost: $0/month forever!** 💰

   - Build failures

**Happy deploying!** 🚀

   - High resource usage**Free tier spins down after 15 min inactivity** (takes 30 sec to wake up)

- To prevent: Use a free uptime monitor (e.g., UptimeRobot)

---

---

## 🚨 Troubleshooting

## 🐛 Troubleshooting

### Build Fails

### Build Fails:

**Error:** `Prisma Client not generated`

```bash**Error: "Prisma generate failed"**

# Solution: Ensure build command includes:```bash

npm install && npx prisma generate && npm run build# Fix: Update build command to:

```npm install && npx prisma generate && npm run build

```

**Error:** `Cannot find module '@prisma/client'`

```bash**Error: "Cannot find module @prisma/client"**

# Solution: Run in Render Shell:```bash

npx prisma generate# Add to package.json scripts:

```"postinstall": "prisma generate"

```

### Database Connection Issues

### Database Connection Issues:

**Error:** `Can't reach database server`

```bash**Error: "Can't reach database server"**

# Check:- Make sure you're using **Internal Database URL** (not External)

1. DATABASE_URL is set correctly (Internal URL)- Format: `postgresql://user:pass@dpg-xxxxx-a/database`

2. Database is running (check database dashboard)- Check DATABASE_URL in environment variables

3. Region matches (database and web service same region)

```**Error: "SSL required"**

- Add to DATABASE_URL: `?sslmode=require`

**Error:** `SSL connection required`- Full example: `postgresql://user:pass@host/db?sslmode=require`

```env

# Add to DATABASE_URL:### App Not Loading:

?sslmode=require

```**503 Service Unavailable**

- Free tier spins down after 15 min inactivity

### Application Crashes- First request wakes it up (takes 30 seconds)

- Set up UptimeRobot to ping every 5 min (keeps it awake)

**Check logs:**

1. Go to **Logs** tab**Build Successful but App Crashes**

2. Look for error messages- Check **Logs** tab in Render dashboard

3. Common issues:- Look for missing environment variables

   - Missing environment variables- Verify start command: `npm start`

   - Database migration not run

   - Port binding issues### Slow Performance:



**Check environment:****App feels slow**

```bash- Free tier has 512MB RAM (sufficient but not fast)

# In Render Shell:- Upgrade to Starter ($7/mo) for 2GB RAM

echo $DATABASE_URL- Or optimize your code/queries

echo $JWT_SECRET

echo $NODE_ENV---

```

## 🎯 After Deployment Checklist

### Slow Cold Starts

- ✅ Web service deployed successfully

Free tier services spin down after 15 minutes of inactivity.- ✅ Database created and connected

- ✅ Migrations run (`npx prisma migrate deploy`)

**Solutions:**- ✅ Can access homepage

1. Upgrade to paid plan ($7/month - instant starts)- ✅ Can login to admin/driver/client dashboards

2. Use a uptime monitor to ping every 10 minutes- ✅ Environment variables set correctly

3. Accept 30-60 second cold start on first request- ✅ Custom domain added (optional)

- ✅ Set up UptimeRobot to prevent spindown (optional)

---

---

## 💡 Performance Tips

## 🆙 Keep Your App Awake (Optional)

### 1. Database Connection Pooling

Free tier spins down after 15 min inactivity. To prevent:

Already configured in `lib/prisma.ts` with connection limit.

### Use UptimeRobot (Free):

### 2. Enable Caching

1. Go to: https://uptimerobot.com/

API caching already implemented in `lib/cache.ts`.2. Sign up (free)

3. Click **"Add New Monitor"**

### 3. CDN for Static Assets4. Configure:

   - **Monitor Type**: HTTP(s)

Render automatically serves static files via CDN.   - **Friendly Name**: Taadiway

   - **URL**: `https://Taadiway.onrender.com`

### 4. Optimize Images   - **Monitoring Interval**: 5 minutes

5. Click **"Create Monitor"**

Already configured - images served as WebP/AVIF.

Now your app stays awake 24/7! ✅

### 5. Monitor Performance

---

Use built-in metrics + Core Web Vitals monitoring.

## 💰 Cost Comparison

---

| Platform | Free Tier | Database | Expires? | Spindown? |

## 💰 Pricing|----------|-----------|----------|----------|-----------|

| **Render** | 750 hrs/mo | ✅ Free (90d) | Renewable | Yes (15 min) |

### Free Plan (Current)| Vercel | 100GB/mo | Paid | Never | No |

- ✅ 750 hours/month| Railway | $5 credit | Paid | ✅ Yes | No |

- ✅ 512 MB RAM| Netlify | 300 min/mo | No DB | Never | No |

- ✅ 100 GB bandwidth

- ✅ Free SSL**Render is the best free option with database!** 🏆

- ✅ Automatic deployments

- ⚠️ Spins down after 15 min inactivity---



### Starter Plan ($7/month)## 📞 Support

- ✅ Always on (no spin down)

- ✅ 512 MB RAM- **Render Docs**: https://render.com/docs

- ✅ 100 GB bandwidth- **Community**: https://community.render.com/

- ✅ Everything in Free +- **Support**: help@render.com

- ✅ Instant wake up- **Status**: https://status.render.com/



### Standard Plan ($25/month)---

- ✅ 2 GB RAM

- ✅ Priority support## 🚀 Alternative: Render + Neon (Best Combo)

- ✅ Faster builds

- ✅ More bandwidthIf you want to avoid 90-day database renewal:



---1. Use **Render** for web service (free 750 hrs)

2. Use **Neon** for database (free forever, 500MB)

## 🔗 Useful Links   - Already have Neon setup!

   - Just use your existing DATABASE_URL from Neon

- **Render Dashboard:** https://dashboard.render.com3. Best of both worlds: No renewals needed!

- **Render Docs:** https://render.com/docs

- **Support:** https://render.com/support---

- **Status Page:** https://status.render.com

**Your Taadiway platform will be rock-solid on Render!** 🎉

---

**Expected Deploy Time**: 10-15 minutes total

## 📝 Environment Variables Reference**Difficulty**: ⭐⭐☆☆☆ (Easy)


```env
# Required
DATABASE_URL=postgresql://user:pass@host:5432/db?sslmode=require
JWT_SECRET=your-64-char-secret
JWT_REFRESH_SECRET=your-other-64-char-secret
NODE_ENV=production

# Optional
NEXT_PUBLIC_API_URL=https://your-domain.onrender.com
ANALYZE=false
```

---

## 🎉 Success Checklist

- [ ] PostgreSQL database created
- [ ] Web service deployed
- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] Health check passes
- [ ] Test login works
- [ ] Auto-deploy enabled
- [ ] Custom domain added (optional)
- [ ] Monitoring configured
- [ ] Performance optimized

---

## 🆘 Need Help?

1. **Check Logs** - Most issues visible in logs
2. **Render Docs** - Comprehensive documentation
3. **Community** - Active Discord community
4. **Support** - Email support@render.com

---

**Your app should now be live at:** `https://taadiway-web.onrender.com` 🚀

**Deployment time:** ~5-10 minutes for first deploy

**Happy deploying!** 🎉
