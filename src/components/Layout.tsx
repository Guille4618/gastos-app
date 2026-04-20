import { Link, useLocation } from "react-router-dom";

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white shadow-md">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">💸 GastosApp</h1>
          <nav className="flex gap-4">
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
          </nav>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 py-6">{children}</main>
    </div>
  );
}