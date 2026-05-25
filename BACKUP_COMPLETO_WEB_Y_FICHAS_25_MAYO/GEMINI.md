# JulieFicha PWA - AI Assistant Guidelines

## 1. Encoding and File Editing (CRITICAL)
- **UTF-8 Requirement:** All files in this project use UTF-8 encoding. When modifying files (especially HTML and JS) via PowerShell, ALWAYS use [System.Text.Encoding]::UTF8 to prevent corrupting Spanish characters (á, é, í, ó, ú, ñ).
- **Large Files:** If a file is large (>20KB) and the default replace/edit tools fail, use PowerShell scripts to completely rewrite the file or perform robust regex replacements. Better yet, keep the code modular to avoid large files.

## 2. Architecture
- **Frontend:** HTML, CSS, Vanilla JS. No frameworks.
- **Backend/DB:** Supabase (PostgreSQL).
- **Offline Capabilities:** Uses a Service Worker (sw.js). When updating JS/CSS, bump the version in sw.js cache name to force clients to update.
- **Module Structure:** The application logic is split into ES6 modules inside the js/ directory:
  - config.js: Constants and environment.
  - db.js: Supabase interaction.
  - signature.js: Canvas signature pad logic.
  - pdf.js: PDF generation logic.
  - ui.js: DOM manipulation.
  - pp.js: Main entry point.

## 3. Security (Supabase)
- **RLS (Row Level Security):** The non key is public. Security is enforced via RLS in Supabase.
  - ichas: Allow public INSERT. Deny UPDATE/DELETE.
  - estilistas: Allow public SELECT. Deny INSERT/UPDATE/DELETE.
  - evidencia (Storage): Allow public INSERT and SELECT. Deny UPDATE/DELETE.

## 4. Performance & Reliability
- **Uploads:** Wait for all image uploads to finish and return URLs before inserting the record into the database.
- **Signatures:** Use Singleton pattern or clear existing instances before re-initializing SignaturePad to prevent memory leaks and ghost canvas issues.
