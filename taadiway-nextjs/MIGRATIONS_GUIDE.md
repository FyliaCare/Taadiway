# Prisma Migration Creation Guide

This guide helps you create and manage database migrations for Taadiway.

---

## 🗄️ Database Strategy

- **Development:** SQLite (file:./prisma/dev.db)
- **Production:** PostgreSQL (Render hosted)

---

## 📝 Creating Migrations

### For Production Deployment (PostgreSQL)

1. **Set PostgreSQL URL temporarily:**
```powershell
# In PowerShell
$env:DATABASE_URL="postgresql://user:pass@localhost:5432/taadiway_temp"
$env:DATABASE_PROVIDER="postgresql"
```

2. **Create initial migration:**
```bash
npx prisma migrate dev --name init
```

This creates `prisma/migrations/` folder with SQL files.

3. **Restore SQLite for dev:**
```powershell
$env:DATABASE_URL="file:./prisma/dev.db"
$env:DATABASE_PROVIDER="sqlite"
```

---

## 🚀 Deploying Migrations on Render

### Automatic (Recommended)

Migrations run automatically during build via:
```bash
npx prisma migrate deploy
```

This is included in the build command.

### Manual (If Needed)

1. Go to Render dashboard
2. Open your web service
3. Click **Shell** tab
4. Run:
```bash
npx prisma migrate deploy
```

---

## 🔄 Migration Workflow

### Adding New Tables/Fields

1. **Update schema.prisma**
```prisma
model NewTable {
  id String @id @default(cuid())
  name String
  // ... fields
}
```

2. **Create migration:**
```bash
npx prisma migrate dev --name add_new_table
```

3. **Commit and push:**
```bash
git add prisma/
git commit -m "Add new table migration"
git push
```

4. **Render auto-deploys** and runs migration

---

## 🧪 Testing Migrations

### Local Testing
```bash
# Reset database
npx prisma migrate reset

# Apply migrations
npx prisma migrate deploy

# Seed data
npm run prisma:seed
```

### Production Testing
Use Render's **Preview Environments** for testing migrations before production.

---

## ⚠️ Important Notes

1. **Never edit migration files** after they're created
2. **Always commit migrations** before deploying
3. **Test migrations locally** before production
4. **Backup database** before major schema changes
5. **Use --create-only** for review before applying:
   ```bash
   npx prisma migrate dev --create-only --name my_migration
   ```

---

## 🔍 Checking Migration Status

### Local
```bash
npx prisma migrate status
```

### Production (Render Shell)
```bash
npx prisma migrate status
```

---

## 🚨 Troubleshooting

### Migration Failed

**Error:** "Migration failed to apply"
```bash
# Check status
npx prisma migrate status

# If needed, mark as applied manually
npx prisma migrate resolve --applied "migration_name"
```

### Schema Drift

**Error:** "Database schema is out of sync"
```bash
# Generate new migration to sync
npx prisma migrate dev --name fix_schema_drift
```

### Reset Production Database (DANGER!)

⚠️ **This deletes all data!**
```bash
# Only in emergency
npx prisma migrate reset --force
```

---

## 📚 Resources

- [Prisma Migrations Docs](https://www.prisma.io/docs/concepts/components/prisma-migrate)
- [Render Databases](https://render.com/docs/databases)
- [Migration Best Practices](https://www.prisma.io/docs/guides/migrate/production-troubleshooting)

---

**Migration files location:** `prisma/migrations/`
