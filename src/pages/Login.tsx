import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export function Login() {
  const { iniciarSesion } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setCargando(true);
    try {
      await iniciarSesion(email, password);
      navigate("/");
    } catch {
      setError("Email o contraseña incorrectos");
    } finally {
      setCargando(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow p-8 w-full max-w-md flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-gray-800 text-center">💸 GastosApp</h1>
        <h2 className="text-lg font-semibold text-gray-600 text-center">Iniciar sesión</h2>

        {error && (
          <div className="bg-red-50 text-red-500 rounded-lg px-4 py-2 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <button
            type="submit"
            disabled={cargando}
            className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition disabled:opacity-50"
          >
            {cargando ? "Cargando..." : "Iniciar sesión"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500">
          ¿No tienes cuenta?{" "}
          <Link to="/registro" className="text-blue-600 hover:underline">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
}