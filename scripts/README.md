# Migration Fix Scripts

These are utility scripts used to fix migration files in the project.

## Scripts

### `fix_migrations.php`
Adds `Schema::hasTable()` checks around `Schema::create()` calls to prevent errors when running migrations multiple times.

**Usage:**
```bash
php scripts/fix_migrations.php [--dry-run] [--backup]
```

- `--dry-run`: Preview changes without applying them
- `--backup`: Create backup files before modifying

### `fix_migration_syntax.php`
Fixes incorrect closing brace placement in migration files.

**Usage:**
```bash
php scripts/fix_migration_syntax.php
```

## Status

✅ All migrations have been fixed:
- 77 migrations already have `Schema::hasTable()` checks
- All syntax errors have been corrected

These scripts are kept for reference and potential future use.

