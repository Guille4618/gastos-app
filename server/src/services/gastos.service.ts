import type { Gasto } from "../../src/types";
import { randomUUID } from "crypto";

let gastos: Gasto[] = [];

export function getGastos(usuarioId: string): Gasto[] {
  return gastos.filter(g => g.usuarioId === usuarioId);
}

export function createGasto(data: Omit<Gasto, "id">, usuarioId: string): Gasto {
  const nuevo: Gasto = { id: randomUUID(), ...data, usuarioId };
  gastos.push(nuevo);
  return nuevo;
}

export function updateGasto(id: string, data: Omit<Gasto, "id">, usuarioId: string): Gasto | null {
  const index = gastos.findIndex(g => g.id === id && g.usuarioId === usuarioId);
  if (index === -1) return null;
  gastos[index] = { id, ...data, usuarioId };
  return gastos[index];
}

export function deleteGasto(id: string, usuarioId: string): boolean {
  const index = gastos.findIndex(g => g.id === id && g.usuarioId === usuarioId);
  if (index === -1) return false;
  gastos.splice(index, 1);
  return true;
}