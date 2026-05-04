import type { Gasto, RespuestaAPI } from "../types";
import { auth } from "../firebase";

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000/api/v1";

async function getAuthHeaders(): Promise<HeadersInit> {
  const token = await auth.currentUser?.getIdToken();
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export async function obtenerGastos(): Promise<RespuestaAPI<Gasto[]>> {
  const headers = await getAuthHeaders();
  const res = await fetch(`${BASE_URL}/gastos`, { headers });
  return res.json();
}

export async function crearGasto(
  gasto: Omit<Gasto, "id">
): Promise<RespuestaAPI<Gasto>> {
  const headers = await getAuthHeaders();
  const res = await fetch(`${BASE_URL}/gastos`, {
    method: "POST",
    headers,
    body: JSON.stringify(gasto),
  });
  return res.json();
}

export async function editarGasto(
  id: string,
  gasto: Omit<Gasto, "id">
): Promise<RespuestaAPI<Gasto>> {
  const headers = await getAuthHeaders();
  const res = await fetch(`${BASE_URL}/gastos/${id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(gasto),
  });
  return res.json();
}

export async function eliminarGasto(
  id: string
): Promise<RespuestaAPI<null>> {
  const headers = await getAuthHeaders();
  const res = await fetch(`${BASE_URL}/gastos/${id}`, {
    method: "DELETE",
    headers,
  });
  return res.json();
}