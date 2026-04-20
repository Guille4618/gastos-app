import { Request, Response } from "express";
import { getGastos, createGasto, updateGasto, deleteGasto } from "../services/gastos.service";

export function obtenerGastos(req: Request, res: Response) {
  const gastos = getGastos();
  res.json({ exito: true, datos: gastos });
}

export function crearGasto(req: Request, res: Response) {
  const gasto = createGasto(req.body);
  res.status(201).json({ exito: true, datos: gasto });
}

export function editarGasto(req: Request, res: Response) {
  const gasto = updateGasto(req.params.id, req.body);
  if (!gasto) {
    res.status(404).json({ exito: false, error: "Gasto no encontrado" });
    return;
  }
  res.json({ exito: true, datos: gasto });
}

export function eliminarGasto(req: Request, res: Response) {
  const eliminado = deleteGasto(req.params.id);
  if (!eliminado) {
    res.status(404).json({ exito: false, error: "Gasto no encontrado" });
    return;
  }
  res.json({ exito: true, datos: null });
}