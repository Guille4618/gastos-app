import { useGastos } from "../context/GastosContext";
import type { CategoriaGasto } from "../types";

const COLORES: Record<CategoriaGasto, string> = {
  "Alimentación": "bg-green-500",
  "Transporte": "bg-blue-500",
  "Ocio": "bg-purple-500",
  "Salud": "bg-red-500",
  "Ropa": "bg-pink-500",
  "Hogar": "bg-yellow-500",
  "Otros": "bg-gray-500",
};

export function Estadisticas() {
  const { gastos, cargando } = useGastos();

  if (cargando) return (
    <div className="bg-white rounded-xl shadow p-6 text-center text-gray-400">
      Cargando estadísticas...
    </div>
  );

  const total = gastos.reduce((acc, g) => acc + g.cantidad, 0);

  const porCategoria = gastos.reduce((acc, g) => {
    acc[g.categoria] = (acc[g.categoria] || 0) + g.cantidad;
    return acc;
  }, {} as Record<CategoriaGasto, number>);

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Resumen total
        </h2>
        <p className="text-4xl font-bold text-blue-600">
          {total.toFixed(2)} €
        </p>
        <p className="text-gray-400 mt-1">{gastos.length} gastos registrados</p>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Por categoría
        </h2>
        {Object.entries(porCategoria).length === 0 ? (
          <p className="text-gray-400">No hay gastos registrados todavía.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {Object.entries(porCategoria).map(([cat, cantidad]) => {
              const porcentaje = total > 0 ? (cantidad / total) * 100 : 0;
              return (
                <div key={cat}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-700">{cat}</span>
                    <span className="text-gray-500">{cantidad.toFixed(2)} €</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3">
                    <div
                      className={`${COLORES[cat as CategoriaGasto]} h-3 rounded-full transition-all`}
                      style={{ width: `${porcentaje}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}