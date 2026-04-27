import type { Gasto, RespuestaAPI } from "../types";

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000/api/v1";

export async function obtenerGastos(): Promise<RespuestaAPI<Gasto[]>> {
  const res = await fetch(`${BASE_URL}/gastos`);
  return res.json();
}

export async function crearGasto(
  gasto: Omit<Gasto, "id">
): Promise<RespuestaAPI<Gasto>> {
  const res = await fetch(`${BASE_URL}/gastos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(gasto),
  });
  return res.json();
}

export async function editarGasto(
  id: string,
  gasto: Omit<Gasto, "id">
): Promise<RespuestaAPI<Gasto>> {
  const res = await fetch(`${BASE_URL}/gastos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(gasto),
  });
  return res.json();
}

export async function eliminarGasto(
  id: string
): Promise<RespuestaAPI<null>> {
  const res = await fetch(`${BASE_URL}/gastos/${id}`, {
    method: "DELETE",
  });
  return res.json();
}