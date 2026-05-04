import { useGastos } from "../context/GastosContext";
import type { CategoriaGasto, ResumenFiscal } from "../types";

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

  const resumenFiscal: ResumenFiscal = gastos.reduce((acc, g) => {
    const cuotaIVA = (g.cantidad * g.tipoIVA) / 100;
    const retencion = (g.cantidad * g.retencionIRPF) / 100;
    return {
      baseImponible: acc.baseImponible + g.cantidad,
      cuotaIVA: acc.cuotaIVA + cuotaIVA,
      retencionIRPF: acc.retencionIRPF + retencion,
      totalConIVA: acc.totalConIVA + g.cantidad + cuotaIVA,
      totalAPagar: acc.totalAPagar + g.cantidad + cuotaIVA - retencion,
    };
  }, { baseImponible: 0, cuotaIVA: 0, retencionIRPF: 0, totalConIVA: 0, totalAPagar: 0 });

  const porCategoria = gastos.reduce((acc, g) => {
    acc[g.categoria] = (acc[g.categoria] || 0) + g.cantidad;
    return acc;
  }, {} as Record<CategoriaGasto, number>);

  return (
    <div className="flex flex-col gap-6">

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Resumen fiscal</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-500">Base imponible</p>
            <p className="text-xl font-bold text-gray-800">{resumenFiscal.baseImponible.toFixed(2)} €</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-3">
            <p className="text-xs text-gray-500">Cuota IVA</p>
            <p className="text-xl font-bold text-blue-600">+{resumenFiscal.cuotaIVA.toFixed(2)} €</p>
          </div>
          <div className="bg-green-50 rounded-lg p-3">
            <p className="text-xs text-gray-500">Retención IRPF</p>
            <p className="text-xl font-bold text-green-600">-{resumenFiscal.retencionIRPF.toFixed(2)} €</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-500">Total con IVA</p>
            <p className="text-xl font-bold text-gray-800">{resumenFiscal.totalConIVA.toFixed(2)} €</p>
          </div>
          <div className="bg-blue-600 rounded-lg p-3 col-span-2 md:col-span-2">
            <p className="text-xs text-white opacity-75">Total a pagar</p>
            <p className="text-2xl font-bold text-white">{resumenFiscal.totalAPagar.toFixed(2)} €</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Por categoría</h2>
        {Object.entries(porCategoria).length === 0 ? (
          <p className="text-gray-400">No hay gastos registrados todavía.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {Object.entries(porCategoria).map(([cat, cantidad]) => {
              const total = resumenFiscal.baseImponible;
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