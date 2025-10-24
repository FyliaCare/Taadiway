# 🚀 Render Deployment Checklist

Quick checklist for deploying Taadiway to Render.

---

## ✅ Pre-Deployment Checklist

### 1. Code Preparation
- [x] All code committed to Git
- [x] Pushed to GitHub (`main` branch)
- [x] Build script tested locally (`npm run build`)
- [x] Environment variables documented
- [x] Health check endpoint created (`/api/health`)
- [x] Prisma schema configured for PostgreSQL
- [x] Performance optimizations applied

### 2. Required Files
- [x] `render.yaml` - Service configuration
- [x] `scripts/build.sh` - Build script
- [x] `scripts/migrate.sh` - Migration script
- [x] `.env.example` - Environment template
- [x] `RENDER_DEPLOYMENT.md` - Deployment guide
- [x] `app/api/health/route.ts` - Health check

---

## 🗄️ Database Setup (5 minutes)

### Step 1: Create PostgreSQL Database
1. Go to https://dashboard.render.com
2. Click **New +** → **PostgreSQL**
3. Configure:
   - Name: `taadiway-db`
   - Database: `taadiway_production`
   - User: `taadiway`
   - Region: **Frankfurt** (or closest)
   - Plan: **Free**
4. Click **Create Database**
5. ⏱️ Wait 2-3 minutes for initialization
6. 📋 **Copy Internal Database URL**

### Step 2: Note Database Details
```
Internal Database URL: postgresql://...
External Database URL: postgresql://...
PSQL Command: psql postgresql://...
```

---

## 🌐 Web Service Setup (5 minutes)

### Step 1: Create Web Service
1. Go to https://dashboard.render.com
2. Click **New +** → **Web Service**
3. Connect GitHub repository:
   - Repository: `FyliaCare/Golden-Errands`
   - Branch: `main`

### Step 2: Configure Service
```
Name: taadiway-web
Region: Frankfurt (same as database)
Branch: main
Root Directory: (leave empty)
Environment: Node
Build Command: npm install && npx prisma generate && npm run build
Start Command: npm start
Plan: Free
```

### Step 3: Add Environment Variables

Click **Advanced** and add:

```env
NODE_ENV=production
DATABASE_URL=[Paste Internal Database URL from database]
DATABASE_PROVIDER=postgresql
JWT_SECRET=[Generate 64-char random string]
JWT_REFRESH_SECRET=[Generate another 64-char string]
NEXT_PUBLIC_API_URL=https://taadiway-web.onrender.com
NEXT_PUBLIC_APP_NAME=Taadiway
```

**Generate Secrets:**
```powershell
# In PowerShell
.\scripts\generate-secrets.ps1
```

Or manually:
```powershell
-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 64 | ForEach-Object {[char]$_})
```

### Step 4: Create Service
Click **Create Web Service** and wait for first deploy (~5-10 min)

---

## 🔍 Verification (2 minutes)

### 1. Check Build Logs
- Go to **Logs** tab
- Verify:
  - ✅ Dependencies installed
  - ✅ Prisma client generated
  - ✅ Migrations applied
  - ✅ Build successful
  - ✅ Server started

### 2. Test Health Endpoint
Visit: `https://taadiway-web.onrender.com/api/health`

Expected:
```json
{
  "status": "healthy",
  "database": "connected",
  "service": "Taadiway API"
}
```

### 3. Test Application
Visit: `https://taadiway-web.onrender.com`

- ✅ Homepage loads
- ✅ Can navigate to `/login`
- ✅ No console errors

### 4. Test Login
Use test credentials (if database seeded):
- Admin: admin@taadiway.com / Admin@123456
- Driver: driver@taadiway.com / Driver@123
- Client: client@taadiway.com / Client@123

---

## 🔄 Post-Deployment Setup (5 minutes)

### 1. Enable Auto-Deploy
1. Go to **Settings**
2. Under **Build & Deploy**
3. Enable **Auto-Deploy** from `main` branch
4. ✅ Now every push auto-deploys

### 2. Seed Database (Optional)
If you want test data:

1. Go to **Shell** tab
2. Run:
```bash
npm run prisma:seed
```

### 3. Set Up Monitoring
1. Go to **Notifications** in settings
2. Add email for:
   - Deploy failures
   - Service down alerts
   - High resource usage

### 4. Configure Custom Domain (Optional)
1. Go to **Settings** → **Custom Domains**
2. Add: `www.taadiway.com`
3. Update DNS with CNAME:
   ```
   CNAME www taadiway-web.onrender.com
   ```
4. Wait for SSL (automatic)

---

## 🚨 Troubleshooting

### Build Fails
**Error:** Prisma client not generated
```bash
# Fix: Verify build command includes:
npx prisma generate
```

**Error:** Database migration failed
```bash
# Check:
1. DATABASE_URL is correct
2. DATABASE_PROVIDER=postgresql is set
3. Database is running
```

### App Won't Start
**Check environment variables:**
1. All required vars set?
2. DATABASE_URL contains `?sslmode=require`?
3. JWT secrets are set?

**View logs:**
1. Go to Logs tab
2. Look for error messages
3. Common issues:
   - Missing env vars
   - Database connection failed
   - Port already in use

### Database Connection Issues
**Error:** Can't reach database

Fix DATABASE_URL format:
```env
postgresql://user:pass@host/db?sslmode=require
```

Use **Internal URL** (not External)

---

## 📊 Performance Monitoring

### Check Metrics
1. Go to **Metrics** tab
2. Monitor:
   - Response time (should be < 1s)
   - CPU usage (should be < 50%)
   - Memory usage (should be < 400MB)
   - Request count

### Logs
- Real-time logs in **Logs** tab
- Filter by severity
- Search for errors

---

## 💰 Free Tier Limits

### What's Included (FREE)
- ✅ 750 hours/month (31 days continuous)
- ✅ 512 MB RAM
- ✅ 100 GB bandwidth/month
- ✅ Free SSL certificate
- ✅ Automatic deployments
- ✅ 1 GB PostgreSQL database

### Limitations
- ⚠️ Spins down after 15 min inactivity
- ⚠️ ~30-60s cold start time
- ⚠️ Limited to 512 MB RAM

### Upgrade Options ($7/month)
- ✅ Always on (no spin down)
- ✅ Instant wake up
- ✅ Same features

---

## 📝 Environment Variables Reference

### Required
```env
NODE_ENV=production
DATABASE_URL=postgresql://...?sslmode=require
DATABASE_PROVIDER=postgresql
JWT_SECRET=64-char-random-string
JWT_REFRESH_SECRET=64-char-random-string
```

### Optional
```env
NEXT_PUBLIC_API_URL=https://your-domain.onrender.com
NEXT_PUBLIC_APP_NAME=Taadiway
ANALYZE=false
```

---

## ✅ Success Criteria

Your deployment is successful when:
- [ ] Build completes without errors
- [ ] Health check returns "healthy"
- [ ] Homepage loads correctly
- [ ] Login page accessible
- [ ] Test login works (if seeded)
- [ ] No errors in logs
- [ ] Metrics show normal usage
- [ ] Auto-deploy is enabled

---

## 🎉 You're Live!

Your app is now deployed at:
**https://taadiway-web.onrender.com**

### Next Steps
1. ✅ Test all features
2. ✅ Monitor logs for errors
3. ✅ Set up custom domain (optional)
4. ✅ Enable monitoring alerts
5. ✅ Share with team/users

### Support
- 📚 Docs: https://render.com/docs
- 💬 Community: Render Discord
- 📧 Email: support@render.com

---

**Total deployment time: ~15-20 minutes** ⏱️

**Happy deploying! 🚀**
