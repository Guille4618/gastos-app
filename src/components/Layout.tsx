import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { usuario, cerrarSesion } = useAuth();

  async function handleCerrarSesion() {
    await cerrarSesion();
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white shadow-md">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">💸 GastosApp</h1>
          <nav className="flex gap-4 items-center">
            <Link
              to="/"
              className={`hover:underline ${location.pathname === "/" ? "font-bold" : ""}`}
            >
              Inicio
            </Link>
            <Link
              to="/estadisticas"
              className={`hover:underline ${location.pathname === "/estadisticas" ? "font-bold" : ""}`}
            >
              Estadísticas
            </Link>
            <span className="text-sm opacity-75">{usuario?.email}</span>
            <button
              onClick={handleCerrarSesion}
              className="bg-white text-blue-600 px-3 py-1 rounded-lg text-sm hover:bg-blue-50 transition"
            >
              Cerrar sesión
            </button>
          </nav>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 py-6">{children}</main>
    </div>
  );
}