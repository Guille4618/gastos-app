import { useState } from "react";
import type { CategoriaGasto, Gasto } from "../types";
import { useGastos } from "../context/GastosContext";

const CATEGORIAS: CategoriaGasto[] = [
  "Alimentación", "Transporte", "Ocio", "Salud", "Ropa", "Hogar", "Otros"
];

export function GastoForm() {
  const { agregarGasto } = useGastos();
  const [form, setForm] = useState<Omit<Gasto, "id">>({
    nombre: "",
    cantidad: 0,
    categoria: "Otros",
    fecha: new Date().toISOString().split("T")[0],
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.nombre || form.cantidad <= 0) return;
    await agregarGasto(form);
    setForm({
      nombre: "",
      cantidad: 0,
      categoria: "Otros",
      fecha: new Date().toISOString().split("T")[0],
    });
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 flex flex-col gap-4">
      <h2 className="text-xl font-semibold text-gray-800">Añadir gasto</h2>

      <input
        type="text"
        placeholder="Nombre del gasto"
        value={form.nombre}
        onChange={e => setForm(prev => ({ ...prev, nombre: e.target.value }))}
        className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
        type="number"
        placeholder="Cantidad (€)"
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

      <button
        type="submit"
        className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition"
      >
        Añadir gasto
      </button>
    </form>
  );
}