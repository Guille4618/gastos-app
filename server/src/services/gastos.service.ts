import type { Gasto } from "../../src/types";
import { randomUUID } from "crypto";

let gastos: Gasto[] = [
  {
    id: randomUUID(),
    nombre: "Supermercado",
    cantidad: 45.50,
    categoria: "Alimentación",
    fecha: "2026-04-15"
  },
  {
    id: randomUUID(),
    nombre: "Metro mensual",
    cantidad: 54.60,
    categoria: "Transporte",
    fecha: "2026-04-01"
  },
  {
    id: randomUUID(),
    nombre: "Netflix",
    cantidad: 12.99,
    categoria: "Ocio",
    fecha: "2026-04-10"
  }
];

export function getGastos(): Gasto[] {
  return gastos;
}

export function createGasto(data: Omit<Gasto, "id">): Gasto {
  const nuevo: Gasto = { id: randomUUID(), ...data };
  gastos.push(nuevo);
  return nuevo;
}

export function updateGasto(id: string, data: Omit<Gasto, "id">): Gasto | null {
  const index = gastos.findIndex(g => g.id === id);
  if (index === -1) return null;
  gastos[index] = { id, ...data };
  return gastos[index];
}

export function deleteGasto(id: string): boolean {
  const index = gastos.findIndex(g => g.id === id);
  if (index === -1) return false;
  gastos.splice(index, 1);
  return true;
}