import { useState } from "react";
import type { CategoriaGasto, Gasto, TipoIVA, RetencionIRPF } from "../types";
import { useGastos } from "../context/GastosContext";

const CATEGORIAS: CategoriaGasto[] = [
  "Alimentación", "Transporte", "Ocio", "Salud", "Ropa", "Hogar", "Otros"
];

const TIPOS_IVA: TipoIVA[] = [0, 4, 10, 21];
const RETENCIONES_IRPF: RetencionIRPF[] = [0, 7, 15, 19, 21];

export function GastoForm() {
  const { agregarGasto } = useGastos();
  const [form, setForm] = useState<Omit<Gasto, "id" | "usuarioId">>({
    nombre: "",
    cantidad: 0,
    categoria: "Otros",
    fecha: new Date().toISOString().split("T")[0],
    tipoIVA: 21,
    retencionIRPF: 0,
  });

  const baseImponible = form.cantidad;
  const cuotaIVA = (baseImponible * form.tipoIVA) / 100;
  const totalConIVA = baseImponible + cuotaIVA;
  const retencion = (baseImponible * form.retencionIRPF) / 100;
  const totalAPagar = totalConIVA - retencion;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.nombre || form.cantidad <= 0) return;
    await agregarGasto(form);
    setForm({
      nombre: "",
      cantidad: 0,
      categoria: "Otros",
      fecha: new Date().toISOString().split("T")[0],
      tipoIVA: 21,
      retencionIRPF: 0,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 flex flex-col gap-4">
      <h2 className="text-xl font-semibold text-gray-800">Añadir gasto</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input
          type="text"
          placeholder="Nombre del gasto"
          value={form.nombre}
          onChange={e => setForm(prev => ({ ...prev, nombre: e.target.value }))}
          className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="number"
          placeholder="Base imponible (€)"
          value={form.cantidad || ""}
          onChange={e => setForm(prev => ({ ...prev, cantidad: parseFloat(e.target.value) }))}
          className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <select
          value={form.categoria}
          onChange={e => setForm(prev => ({ ...prev, categoria: e.target.value as CategoriaGasto }))}
          className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {CATEGORIAS.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <input
          type="date"
          value={form.fecha}
          onChange={e => setForm(prev => ({ ...prev, fecha: e.target.value }))}
          className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <select
          value={form.tipoIVA}
          onChange={e => setForm(prev => ({ ...prev, tipoIVA: parseInt(e.target.value) as TipoIVA }))}
          className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {TIPOS_IVA.map(iva => (
            <option key={iva} value={iva}>IVA {iva}%</option>
          ))}
        </select>
        <select
          value={form.retencionIRPF}
          onChange={e => setForm(prev => ({ ...prev, retencionIRPF: parseInt(e.target.value) as RetencionIRPF }))}
          className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {RETENCIONES_IRPF.map(irpf => (
            <option key={irpf} value={irpf}>IRPF {irpf}%</option>
          ))}
        </select>
      </div>

      {form.cantidad > 0 && (
        <div className="bg-blue-50 rounded-lg p-4 text-sm flex flex-col gap-1">
          <p className="font-semibold text-blue-800 mb-1">Resumen fiscal</p>
          <div className="flex justify-between text-gray-600">
            <span>Base imponible:</span>
            <span>{baseImponible.toFixed(2)} €</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>IVA ({form.tipoIVA}%):</span>
            <span>+{cuotaIVA.toFixed(2)} €</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Retención IRPF ({form.retencionIRPF}%):</span>
            <span>-{retencion.toFixed(2)} €</span>
          </div>
          <div className="flex justify-between font-bold text-blue-800 border-t pt-1 mt-1">
            <span>Total a pagar:</span>
            <span>{totalAPagar.toFixed(2)} €</span>
          </div>
        </div>
      )}

      <button
        type="submit"
        className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition"
      >
        Añadir gasto
      </button>
    </form>
  );
}