OMEGA TRADE CENTER — v4
========================

WHAT V4 FIXES
-------------
Products added in Admin are now stored in a shared online Supabase database and product images are stored in Supabase Storage. Customers can therefore see products added by Admin from the live GitHub Pages site.

IMPORTANT SECURITY NOTE
-----------------------
This version keeps the simple Admin password you requested. The password is a client-side convenience gate, not real server-side authentication. Because the site uses a public Supabase key, a technically skilled person could bypass the page and database rules. For a small/simple catalog this may be acceptable, but a production store should use real Supabase authentication and protected server-side policies.

SETUP (ONE TIME)
----------------
1. Create a free Supabase project at https://supabase.com/
2. Open your project and go to SQL Editor.
3. Open supabase-schema.sql from this ZIP.
4. Copy ALL of its contents into the Supabase SQL Editor and click Run.
5. In Supabase go to Project Settings > API.
6. Copy the Project URL.
7. Copy the Publishable/anon public API key.
8. Open config.js in this folder.
9. Replace:
   YOUR_SUPABASE_URL
   YOUR_SUPABASE_ANON_KEY
   with your real values.
10. Save config.js.
11. Upload ALL files in this folder to the ROOT of your GitHub repository (same place as index.html).
12. Wait for GitHub Pages to deploy.

FILES THAT MUST BE IN THE REPOSITORY ROOT
-----------------------------------------
index.html
admin-login.html
admin.html
script.js
style.css
config.js
supabase.js

DO NOT PUT THEM INSIDE AN EXTRA FOLDER.

ADMIN PASSWORD
--------------
The v4 Admin password remains:
OmegaAdmin123!

You can change it inside admin-login.html by changing ADMIN_PASSWORD.

HOW TO USE
----------
1. Open the live customer catalog.
2. Click Admin.
3. Enter the Admin password.
4. Add product name, category, description and image.
5. Click Add Product to Catalog.
6. The product is saved online.
7. Open/refresh the customer catalog: the new product appears there.

If you change config.js after uploading, make sure the file is uploaded to GitHub again.
