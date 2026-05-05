import { Response } from "express";
import { crearGrupo, getGrupoPorUsuario, unirseAGrupo } from "../services/grupos.service";
import type { RequestConUsuario } from "../index";

export function obtenerGrupo(req: RequestConUsuario, res: Response) {
  const grupo = getGrupoPorUsuario(req.usuarioId!);
  if (!grupo) {
    res.json({ exito: false, datos: null });
    return;
  }
  res.json({ exito: true, datos: grupo });
}

export function crearGrupoController(req: RequestConUsuario, res: Response) {
  const { nombre } = req.body;
  if (!nombre) {
    res.status(400).json({ exito: false, error: "El nombre es obligatorio" });
    return;
  }
  const grupo = crearGrupo(nombre, req.usuarioId!);
  res.status(201).json({ exito: true, datos: grupo });
}

export function unirseAGrupoController(req: RequestConUsuario, res: Response) {
  const { codigo } = req.body;
  if (!codigo) {
    res.status(400).json({ exito: false, error: "El código es obligatorio" });
    return;
  }
  const grupo = unirseAGrupo(codigo, req.usuarioId!);
  if (!grupo) {
    res.status(404).json({ exito: false, error: "Código de grupo no válido" });
    return;
  }
  res.json({ exito: true, datos: grupo });
}