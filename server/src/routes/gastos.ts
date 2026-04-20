import { Router } from "express";
import {
  obtenerGastos,
  crearGasto,
  editarGasto,
  eliminarGasto,
} from "../controllers/gastos.controller";

export const gastosRouter = Router();

gastosRouter.get("/", obtenerGastos);
gastosRouter.post("/", crearGasto);
gastosRouter.put("/:id", editarGasto);
gastosRouter.delete("/:id", eliminarGasto);