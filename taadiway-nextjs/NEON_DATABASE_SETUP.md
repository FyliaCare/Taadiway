# 🐘 Neon Database Setup Guide

Complete guide to set up Neon PostgreSQL for Taadiway.

---

## 🎯 Why Neon?

- ✅ **Serverless PostgreSQL** - Auto-scales to zero
- ✅ **FREE Forever** - 3 GB storage, unlimited compute
- ✅ **Instant Setup** - Database ready in seconds
- ✅ **Branching** - Git-like database branches
- ✅ **Auto-Scaling** - Scales with your traffic
- ✅ **Modern** - Built for modern applications

---

## 📋 Quick Setup (2 minutes)

### Step 1: Create Neon Account
1. Go to https://neon.tech
2. Click **"Sign Up"**
3. Sign in with GitHub (recommended) or email
4. ✅ **Account created!**

### Step 2: Create Project
1. Click **"Create Project"**
2. Configure:
   - **Project Name:** `taadiway-production`
   - **PostgreSQL Version:** 17 (latest)
   - **Region:** Choose closest to your users
     - 🇪🇺 EU (Frankfurt) - For Europe/Africa
     - 🇺🇸 US East (Ohio) - For Americas
     - 🇸🇬 Asia Pacific (Singapore) - For Asia
3. Click **"Create Project"**
4. ⏱️ Wait 5-10 seconds...
5. ✅ **Database ready!**

### Step 3: Get Connection String
1. On project dashboard, you'll see connection details
2. Copy **Connection String**:
   ```
   postgresql://username:password@ep-xyz.region.aws.neon.tech/main?sslmode=require
   ```
3. 📋 **Save this** - you'll need it for Render!

---

## 🔐 Connection String Format

Your Neon connection string looks like:
```
postgresql://[user]:[password]@[endpoint]/[database]?sslmode=require
```

**Example:**
```
postgresql://taadiway_user:abc123xyz@ep-cool-sound-12345.us-east-2.aws.neon.tech/taadiway?sslmode=require
```

**Components:**
- `user`: Your database user (auto-generated)
- `password`: Your password (auto-generated)
- `endpoint`: Neon compute endpoint
- `database`: Database name (default: `neondb`)
- `sslmode=require`: SSL encryption (mandatory)

---

## 🚀 Connect to Render

### Option 1: Environment Variable (Recommended)

1. Go to Render dashboard
2. Select your web service
3. Go to **Environment** tab
4. Add variable:
   ```
   Key: DATABASE_URL
   Value: [Paste your Neon connection string]
   ```
5. Click **Save**
6. Service will redeploy automatically

### Option 2: During Service Creation

When creating web service on Render:
1. Click **Advanced**
2. Add environment variables:
   ```env
   DATABASE_URL=[Your Neon connection string]
   DATABASE_PROVIDER=postgresql
   ```

---

## 🗄️ Run Migrations

### Automatic (During Deploy)

Migrations run automatically via build command:
```bash
npm install && npx prisma generate && npm run build
```

The build script includes `npx prisma migrate deploy`.

### Manual (If Needed)

1. Go to Render dashboard
2. Open your service
3. Click **Shell** tab
4. Run:
```bash
npx prisma migrate deploy
```

---

## 🌱 Seed Database (Optional)

To add test data:

### Via Render Shell:
```bash
npm run prisma:seed
```

### Via Local Connection:
```bash
# Set environment variable locally
$env:DATABASE_URL="[Your Neon connection string]"
$env:DATABASE_PROVIDER="postgresql"

# Run seed
npm run prisma:seed
```

---

## 📊 Neon Dashboard Features

### 1. SQL Editor
- Run queries directly in browser
- View table data
- Test SQL statements

**How to access:**
1. Go to project dashboard
2. Click **"SQL Editor"** tab
3. Write and run queries

### 2. Monitoring
- Query performance
- Connection count
- Storage usage
- Compute time

**How to access:**
1. Go to project dashboard
2. Click **"Monitoring"** tab

### 3. Branching (Advanced)
Create database branches for testing:
```bash
# Create branch from main
neonctl branches create --name staging

# Get connection string for branch
neonctl connection-string staging
```

---

## 🔍 Verify Connection

### Test Connection String

```bash
# Using psql
psql "postgresql://user:pass@host/db?sslmode=require"

# List tables
\dt

# Check schema
\d users
```

### Test via Prisma

```bash
# Generate client
npx prisma generate

# Check connection
npx prisma db pull
```

### Test via API

After deploying to Render:
```
GET https://your-app.onrender.com/api/health
```

Expected:
```json
{
  "status": "healthy",
  "database": "connected"
}
```

---

## 📈 Scaling & Limits

### Free Tier
- ✅ 3 GB storage
- ✅ Unlimited compute hours
- ✅ 1 project
- ✅ Auto-scaling compute
- ✅ Auto-suspend (after 5 min inactivity)

### Pro Plan ($19/month)
- ✅ 10 GB storage included
- ✅ Multiple projects
- ✅ Longer history retention
- ✅ Priority support
- ✅ Additional branches

### Storage Add-ons
- $3.50/month per additional GB
- Scales as needed

---

## 🔒 Security Best Practices

### 1. Connection String Security
- ❌ Never commit connection strings to Git
- ✅ Use environment variables
- ✅ Rotate passwords regularly
- ✅ Use SSL (sslmode=require)

### 2. User Permissions
```sql
-- Create read-only user for analytics
CREATE USER analytics WITH PASSWORD 'secure_pass';
GRANT CONNECT ON DATABASE taadiway TO analytics;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO analytics;
```

### 3. IP Restrictions (Pro feature)
- Restrict database access to specific IPs
- Available on Pro plan

---

## 🛠️ Troubleshooting

### Connection Timeout

**Error:** `timeout: could not connect to server`

**Solutions:**
1. Check connection string is correct
2. Ensure sslmode=require is present
3. Verify project is not suspended
4. Check Neon status page

### SSL Required Error

**Error:** `SSL connection required`

**Solution:** Add to connection string:
```
?sslmode=require
```

### Password Contains Special Characters

**Error:** Connection fails with special characters

**Solution:** URL-encode the password:
```javascript
const password = "p@ss#word!";
const encoded = encodeURIComponent(password);
// Use in connection string
```

### Database Suspended

**Error:** `compute is not yet available`

**Cause:** Free tier auto-suspends after 5 min inactivity

**Solution:**
- Wait 1-2 seconds for wake-up
- Happens only on first request
- Consider Pro plan for always-on

---

## 📝 Environment Variables

### Required
```env
DATABASE_URL=postgresql://user:pass@host/db?sslmode=require
DATABASE_PROVIDER=postgresql
```

### Connection String Formats

**Default:**
```
postgresql://user:pass@ep-xyz.aws.neon.tech/neondb?sslmode=require
```

**With pooling (recommended for serverless):**
```
postgresql://user:pass@ep-xyz-pooler.aws.neon.tech/neondb?sslmode=require
```

**Direct connection (for migrations):**
```
postgresql://user:pass@ep-xyz.aws.neon.tech/neondb?sslmode=require
```

---

## 💡 Performance Tips

### 1. Use Connection Pooling
Already configured in `lib/prisma.ts` with:
```typescript
connection_limit: 10
```

### 2. Use Pooled Connection
Neon provides two endpoints:
- **Pooled:** `ep-xyz-pooler.aws.neon.tech` (for app)
- **Direct:** `ep-xyz.aws.neon.tech` (for migrations)

For production, use pooled endpoint.

### 3. Index Your Queries
```sql
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_orders_status ON orders(status);
```

### 4. Monitor Performance
Check slow queries in Neon dashboard:
1. Go to **Monitoring**
2. Click **"Queries"**
3. Review slowest queries

---

## 🔄 Backup Strategy

### Automatic (Neon Handles)
- Point-in-time recovery
- 7-day history (free tier)
- 30-day history (pro tier)

### Manual Backup
```bash
# Backup to file
pg_dump "[Neon connection string]" > backup_$(date +%Y%m%d).sql

# Restore from file
psql "[Neon connection string]" < backup_20251024.sql
```

---

## 📊 Monitoring & Alerts

### Neon Console
1. Storage usage
2. Compute time
3. Connection count
4. Query performance

### Set Up Alerts (Pro)
1. Go to project settings
2. Configure notifications for:
   - High storage usage
   - Connection limits
   - Query performance

---

## 🆘 Support

### Neon Resources
- **Docs:** https://neon.tech/docs
- **Discord:** https://discord.gg/neon
- **Support:** https://neon.tech/docs/introduction/support

### Status
- **Status Page:** https://status.neon.tech

---

## ✅ Checklist

- [ ] Neon account created
- [ ] Project created
- [ ] Connection string copied
- [ ] Added to Render environment variables
- [ ] DATABASE_PROVIDER=postgresql set
- [ ] Migrations run successfully
- [ ] Database seeded (optional)
- [ ] Connection verified via health check
- [ ] Monitoring configured
- [ ] Backup strategy in place

---

## 🎉 You're Connected!

Your Neon database is now powering your Taadiway platform!

**Next Steps:**
1. ✅ Test the connection
2. ✅ Run migrations
3. ✅ Seed data (optional)
4. ✅ Monitor performance
5. ✅ Set up backups

**Connection:** Neon PostgreSQL ↔️ Render Web Service ✅

**Happy database management!** 🐘
