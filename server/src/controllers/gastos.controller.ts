import { Response } from "express";
import { getGastos, createGasto, updateGasto, deleteGasto } from "../services/gastos.service";
import type { RequestConUsuario } from "../index";

export async function obtenerGastos(req: RequestConUsuario, res: Response) {
  const gastos = await getGastos(req.usuarioId!);
  res.json({ exito: true, datos: gastos });
}

export async function crearGasto(req: RequestConUsuario, res: Response) {
  const gasto = await createGasto(req.body, req.usuarioId!);
  res.status(201).json({ exito: true, datos: gasto });
}

export async function editarGasto(req: RequestConUsuario, res: Response) {
  const gasto = await updateGasto(req.params.id, req.body, req.usuarioId!);
  if (!gasto) {
    res.status(404).json({ exito: false, error: "Gasto no encontrado" });
    return;
  }
  res.json({ exito: true, datos: gasto });
}

export async function eliminarGasto(req: RequestConUsuario, res: Response) {
  const eliminado = await deleteGasto(req.params.id, req.usuarioId!);
  if (!eliminado) {
    res.status(404).json({ exito: false, error: "Gasto no encontrado" });
    return;
  }
  res.json({ exito: true, datos: null });
}