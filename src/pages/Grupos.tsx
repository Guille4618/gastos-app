import { useState } from "react";
import { useGrupo } from "../context/GrupoContext";

export function Grupos() {
  const { grupo, cargando, crearGrupo, unirseAGrupo, salirDeGrupo } = useGrupo();
  const [nombreGrupo, setNombreGrupo] = useState("");
  const [codigo, setCodigo] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copiado, setCopiado] = useState(false);

  async function handleCrear(e: React.FormEvent) {
    e.preventDefault();
    if (!nombreGrupo) return;
    await crearGrupo(nombreGrupo);
    setNombreGrupo("");
  }

  async function handleUnirse(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      await unirseAGrupo(codigo);
      setCodigo("");
    } catch {
      setError("Código de grupo no válido");
    }
  }

  function handleCopiar() {
    if (!grupo) return;
    navigator.clipboard.writeText(grupo.codigo);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  }

  if (cargando) return (
    <div className="bg-white rounded-xl shadow p-6 text-center text-gray-400">
      Cargando...
    </div>
  );

  if (grupo) return (
    <div className="flex flex-col gap-6">
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          👨‍👩‍👧‍👦 {grupo.nombre}
        </h2>
        <p className="text-gray-500 text-sm mb-4">
          {grupo.miembros.length} miembro{grupo.miembros.length !== 1 ? "s" : ""}
        </p>
        <div className="bg-blue-50 rounded-lg p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 mb-1">Código para invitar</p>
            <p className="text-2xl font-bold text-blue-600 tracking-widest">
              {grupo.codigo}
            </p>
          </div>
          <button
            onClick={handleCopiar}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm"
          >
            {copiado ? "¡Copiado!" : "Copiar"}
          </button>
        </div>
        <button
          onClick={salirDeGrupo}
          className="mt-4 text-red-400 hover:text-red-600 text-sm hover:underline"
        >
          Salir del grupo
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Crear un grupo</h2>
        <form onSubmit={handleCrear} className="flex gap-3">
          <input
            type="text"
            placeholder="Nombre del grupo (ej: Familia García)"
            value={nombreGrupo}
            onChange={e => setNombreGrupo(e.target.value)}
            className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Crear
          </button>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Unirse a un grupo</h2>
        {error && (
          <div className="bg-red-50 text-red-500 rounded-lg px-4 py-2 text-sm mb-3">
            {error}
          </div>
        )}
        <form onSubmit={handleUnirse} className="flex gap-3">
          <input
            type="text"
            placeholder="Código del grupo"
            value={codigo}
            onChange={e => setCodigo(e.target.value.toUpperCase())}
            className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 tracking-widest"
            maxLength={6}
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Unirse
          </button>
        </form>
      </div>
    </div>
  );
}