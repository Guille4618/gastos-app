# 💸 GastosApp

Aplicación web fullstack para el control de gastos personales, familiares y de empresa. Orientada a autónomos y PYMEs con soporte para IVA e IRPF.

## 🌐 URLs

- **Frontend (producción):** https://gastos-app-tau-one.vercel.app/
- **Backend (producción):** https://gastos-app-production-a27a.up.railway.app
- **Tablero Trello:** https://trello.com/b/1TJHDhGh/gastosapp

## 🚀 Tecnologías

### Frontend
- React 18 + TypeScript
- Vite
- Tailwind CSS
- React Router v6
- Firebase Auth

### Backend
- Node.js + Express + TypeScript
- MongoDB Atlas + Mongoose
- Firebase Admin SDK (verificación de tokens)

## ✨ Funcionalidades

- 🔐 Registro e inicio de sesión con Firebase Auth
- 💰 Añadir, listar y eliminar gastos
- 🧾 Campos fiscales: IVA (0%, 4%, 10%, 21%) y retención IRPF (0%, 7%, 15%, 19%, 21%)
- 📊 Resumen fiscal automático por gasto y en estadísticas
- 👨‍👩‍👧‍👦 Grupos familiares/empresa con código de invitación
- 🔍 Filtros por categoría y rango de fechas
- 📱 Diseño responsive con Tailwind CSS

## 🗂️ Estructura del proyecto

gastos-app/
src/
api/          # Cliente de API tipado
components/   # Componentes reutilizables
context/      # Context API (Auth, Gastos, Grupos)
hooks/        # Custom hooks
pages/        # Páginas (Home, Estadísticas, Grupos, Login, Registro)
types/        # Interfaces y tipos TypeScript
utils/        # Funciones utilitarias
server/
src/
controllers/  # Controladores de la API
models/       # Modelos de MongoDB
routes/       # Rutas de Express
services/     # Lógica de negocio
docs/             # Documentación del proyecto

## 🛠️ Instalación y uso local

### Requisitos
- Node.js v18+
- Cuenta en MongoDB Atlas
- Proyecto en Firebase

### Frontend
```bash
npm install
npm run dev
```

### Backend
```bash
cd server
npm install
npm run dev
```

### Variables de entorno

**Frontend** (`.env.local`):

VITE_API_URL=http://localhost:3000/api/v1
**Backend** (`server/.env`):

MONGODB_URI=tu_connection_string_de_mongodb
PORT=3000
## 📚 Documentación

Toda la documentación del proyecto está en la carpeta `docs/`:

- `agile.md` — Metodologías Agile, Scrum y Kanban
- `idea.md` — Definición del proyecto
- `project-management.md` — Gestión del proyecto
- `design.md` — Arquitectura y decisiones técnicas
- `components.md` — Documentación de componentes
- `hooks.md` — Documentación de hooks
- `context.md` — Documentación del Context API
- `routing.md` — Estructura de rutas
- `forms.md` — Documentación de formularios
- `api.md` — Endpoints de la API REST
- `deployment.md` — Proceso de despliegue
- `retrospective.md` — Reflexión final