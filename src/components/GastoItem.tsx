import type { Gasto } from "../types";
import { useGastos } from "../context/GastosContext";

const COLORES: Record<string, string> = {
  "Alimentación": "bg-green-100 text-green-800",
  "Transporte": "bg-blue-100 text-blue-800",
  "Ocio": "bg-purple-100 text-purple-800",
  "Salud": "bg-red-100 text-red-800",
  "Ropa": "bg-pink-100 text-pink-800",
  "Hogar": "bg-yellow-100 text-yellow-800",
  "Otros": "bg-gray-100 text-gray-800",
};

export function GastoItem({ gasto }: { gasto: Gasto }) {
  const { borrarGasto } = useGastos();

  const cuotaIVA = (gasto.cantidad * gasto.tipoIVA) / 100;
  const totalConIVA = gasto.cantidad + cuotaIVA;
  const retencion = (gasto.cantidad * gasto.retencionIRPF) / 100;
  const totalAPagar = totalConIVA - retencion;

  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <span className="font-semibold text-gray-800">{gasto.nombre}</span>
          <div className="flex gap-2 items-center">
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${COLORES[gasto.categoria]}`}>
              {gasto.categoria}
            </span>
            <span className="text-xs text-gray-400">{gasto.fecha}</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-lg font-bold text-blue-600">{totalAPagar.toFixed(2)} €</p>
            <p className="text-xs text-gray-400">Base: {gasto.cantidad.toFixed(2)} €</p>
          </div>
          <button
            onClick={() => borrarGasto(gasto.id)}
            className="text-red-400 hover:text-red-600 transition text-xl"
          >
            ✕
          </button>
        </div>
      </div>
      <div className="flex gap-3 text-xs text-gray-500">
        <span className="bg-gray-50 px-2 py-1 rounded">IVA {gasto.tipoIVA}% (+{cuotaIVA.toFixed(2)} €)</span>
        <span className="bg-gray-50 px-2 py-1 rounded">IRPF {gasto.retencionIRPF}% (-{retencion.toFixed(2)} €)</span>
      </div>
    </div>
  );
}