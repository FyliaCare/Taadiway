# 🚀 Deploy Taadiway - Quick Guide

## Step 1: Create Neon Database (2 min)

1. **Go to Neon:** https://console.neon.tech
2. **Create Project:**
   - Name: `taadiway-production`
   - Region: EU (Frankfurt)
3. **Copy Connection String:** 
   ```
   postgresql://user:pass@ep-xxx.aws.neon.tech/neondb?sslmode=require
   ```
   📋 Save this - you need it for Render!

---

## Step 2: Deploy on Render (5 min)

1. **Go to Render:** https://dashboard.render.com
2. **Click:** New + → Web Service
3. **Connect GitHub:** Select `FyliaCare/Golden-Errands`

### Configure Service:
```
Name: taadiway
Region: Frankfurt (match Neon)
Branch: main
Root Directory: taadiway-nextjs
Runtime: Node
Build Command: npm install && npx prisma generate && npm run build
Start Command: npm start
Plan: Free
```

### Environment Variables:
Click **Advanced** and add:

```env
NODE_ENV=production
DATABASE_URL=postgresql://neondb_owner:npg_5Qjb2CHkmyuG@ep-super-hill-agvam20u-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require
JWT_SECRET=[Generate 64-char string]
JWT_REFRESH_SECRET=[Generate another 64-char string]
NEXT_PUBLIC_API_URL=https://taadiway.onrender.com
```

### Generate JWT Secrets:
**In PowerShell:**
```powershell
# Run this twice to get 2 different secrets:
-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 64 | ForEach-Object {[char]$_})
```

4. **Click:** Create Web Service
5. **Wait:** 5-10 minutes for first deploy

---

## Step 3: Run Database Migration (2 min)

After deployment completes:

1. **Go to your service** → **Shell** tab
2. **Run:**
```bash
npx prisma migrate deploy
npx prisma db seed
```

This creates all tables and adds test users.

---

## Step 4: Test Your App (1 min)

**Health Check:**
```
https://taadiway.onrender.com/api/health
```

Should return:
```json
{
  "status": "healthy",
  "database": "connected"
}
```

**Login Page:**
```
https://taadiway.onrender.com/login
```

**Test Credentials:**
- Admin: `admin@taadiway.com` / `Admin@123456`
- Driver: `driver@taadiway.com` / `Driver@123`
- Client: `client@taadiway.com` / `Client@123`

---

## Step 5: Enable Auto-Deploy

1. **Go to:** Settings → Build & Deploy
2. **Enable:** Auto-Deploy ✅
3. **Branch:** main

Now every push automatically deploys!

---

## 🎉 You're Live!

**Your App:** https://taadiway.onrender.com

**Total Time:** ~10 minutes

---

## 🚨 Quick Troubleshooting

**Build Fails?**
- Check logs in Render dashboard
- Verify all environment variables are set

**Database Connection Error?**
- Verify `DATABASE_URL` copied correctly from Neon
- Must end with `?sslmode=require`
- Check `DATABASE_PROVIDER=postgresql` is set

**App Loads Slow?**
- First request takes 30-60 seconds (cold start on free tier)
- Normal behavior - subsequent requests are fast

---

## 📊 What You Get Free

**Render:**
- 750 hours/month (runs 24/7)
- 512 MB RAM
- Auto SSL
- Spins down after 15 min idle

**Neon:**
- 3 GB storage
- Unlimited compute
- Autoscaling
- Spins down after 5 min idle

**Cost: $0/month** 💰

---

## 📚 More Details

Need detailed info? See:
- **Neon Setup:** [NEON_DATABASE_SETUP.md](./NEON_DATABASE_SETUP.md)
- **Full Guide:** [RENDER_DEPLOYMENT.md](./RENDER_DEPLOYMENT.md)
- **Migrations:** [MIGRATIONS_GUIDE.md](./MIGRATIONS_GUIDE.md)
- **Performance:** [PERFORMANCE.md](./PERFORMANCE.md)
