import { Response } from "express";
import { getGastos, createGasto, updateGasto, deleteGasto } from "../services/gastos.service";
import type { RequestConUsuario } from "../index";

export function obtenerGastos(req: RequestConUsuario, res: Response) {
  const gastos = getGastos(req.usuarioId!);
  res.json({ exito: true, datos: gastos });
}

export function crearGasto(req: RequestConUsuario, res: Response) {
  const gasto = createGasto(req.body, req.usuarioId!);
  res.status(201).json({ exito: true, datos: gasto });
}

export function editarGasto(req: RequestConUsuario, res: Response) {
  const gasto = updateGasto(req.params.id, req.body, req.usuarioId!);
  if (!gasto) {
    res.status(404).json({ exito: false, error: "Gasto no encontrado" });
    return;
  }
  res.json({ exito: true, datos: gasto });
}

export function eliminarGasto(req: RequestConUsuario, res: Response) {
  const eliminado = deleteGasto(req.params.id, req.usuarioId!);
  if (!eliminado) {
    res.status(404).json({ exito: false, error: "Gasto no encontrado" });
    return;
  }
  res.json({ exito: true, datos: null });
}