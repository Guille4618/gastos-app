import type { CategoriaGasto } from "../types";
import { useGastos } from "../context/GastosContext";

const CATEGORIAS: CategoriaGasto[] = [
  "Alimentación", "Transporte", "Ocio", "Salud", "Ropa", "Hogar", "Otros"
];

export function FiltroBar() {
  const { filtros, setFiltros } = useGastos();

  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-wrap gap-3 items-center">
      <select
        value={filtros.categoria}
        onChange={e => setFiltros({ ...filtros, categoria: e.target.value as CategoriaGasto | "Todas" })}
        className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="Todas">Todas las categorías</option>
        {CATEGORIAS.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      <input
        type="date"
        value={filtros.fechaDesde}
        onChange={e => setFiltros({ ...filtros, fechaDesde: e.target.value })}
        className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
        type="date"
        value={filtros.fechaHasta}
        onChange={e => setFiltros({ ...filtros, fechaHasta: e.target.value })}
        className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button
        onClick={() => setFiltros({ categoria: "Todas", fechaDesde: "", fechaHasta: "" })}
        className="text-sm text-blue-600 hover:underline"
      >
        Limpiar filtros
      </button>
    </div>
  );
}