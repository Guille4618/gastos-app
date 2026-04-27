# Despliegue

## Frontend — Vercel
El frontend está desplegado en Vercel conectado al repositorio de GitHub.
Cada push a `main` despliega automáticamente.

URL: https://gastos-app-tau-one.vercel.app/

Variable de entorno configurada en Vercel:
- `VITE_API_URL` = URL del backend en Railway

## Backend — Railway
El backend está desplegado en Railway.

URL: https://gastos-app-production-a27a.up.railway.app

Comandos configurados:
- Build: `cd server && npm install`
- Start: `cd server && npm run dev`