# SnapBurger · Theo Kiosk (React + Supabase)

This is a minimal kiosk app you can deploy to Netlify and connect to your Supabase project.

## 1) Prereqs
- Supabase project created (you already did this) with the schema from our chat.
- Node.js 18+ on your machine (only if you want to test locally).

## 2) Local run (optional)
```bash
npm install
# create a .env file in project root with:
# VITE_SUPABASE_URL=your-supabase-url
# VITE_SUPABASE_ANON_KEY=your-anon-key
npm run dev
```
Open http://localhost:5173

## 3) Deploy to Netlify
1. Create a new **GitHub repo**, then push this folder to it.
2. In Netlify: **Add new site → Import from Git** → select your repo.
3. Build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. **Environment variables** (Netlify → Site settings → Environment variables):
   - `VITE_SUPABASE_URL` = your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY` = your Supabase anon public key
5. Deploy. Netlify will give you a URL.

## 4) Test flow
- Open your Netlify URL.
- Add items → **Place Order**.
- In Supabase → Table Editor → `orders`, edit the order `status` to `in_kitchen`, then `ready`, then `served`.
- Watch the kiosk page update live.

## Notes
- This app is intentionally simple: no auth, no routing, demo-friendly policies.
- Tighten RLS and add Auth before any real pilot.
