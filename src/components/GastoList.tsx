import { useGastos } from "../context/GastosContext";
import { GastoItem } from "./GastoItem";

export function GastoList() {
  const { gastosFiltrados, cargando, error } = useGastos();

  if (cargando) return (
    <div className="bg-white rounded-xl shadow p-6 text-center text-gray-400">
      Cargando gastos...
    </div>
  );

  if (error) return (
    <div className="bg-red-50 rounded-xl shadow p-6 text-center text-red-500">
      {error}
    </div>
  );

  if (gastosFiltrados.length === 0) return (
    <div className="bg-white rounded-xl shadow p-6 text-center text-gray-400">
      No hay gastos registrados todavía.
    </div>
  );

  const total = gastosFiltrados.reduce((acc, g) => acc + g.cantidad, 0);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Mis gastos</h2>
        <span className="text-blue-600 font-bold text-lg">
          Total: {total.toFixed(2)} €
        </span>
      </div>
      {gastosFiltrados.map(gasto => (
        <GastoItem key={gasto.id} gasto={gasto} />
      ))}
    </div>
  );
}