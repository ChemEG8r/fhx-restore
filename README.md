# FHX Restore Runbook

Interactive checklist/walkthrough for restoring a DeltaV configuration
database from an FHX export, built from Emerson KBA **NK-1300-0236**
("Restoring the DeltaV Configuration Database from a Backup", DeltaV
v9.3.x–v14.x).

- Phase-by-phase checklist of the full FHX restore path, with KBA section
  references on each step, copyable commands/paths, and stylized dialog
  mockups highlighting the exact control to click (both import checkboxes,
  "The Site" → Yes then "No to All", etc.).
- Two preflight questions (custom device definitions? VCAT?) tailor the
  list — conditional phases appear only when relevant.
- A hard decision gate at the import log: Errors = stop, don't download;
  plus a Warnings guide screen covering the four typical warning types.
- Progress, toggles, and a notes field persist in localStorage and sync
  across devices through `/api/state` (Cloudflare Pages Function + Workers
  KV bound as `STATE`). "Start a fresh restore" clears everywhere.

Not an Emerson product — a personal working aid. Always cross-check the
current KBA revision for your DeltaV version.

Deploy: `npx wrangler pages deploy . --project-name fhx-restore --branch main`
(needs `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`).
