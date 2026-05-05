import { Router } from "express";
import {
  obtenerGrupo,
  crearGrupoController,
  unirseAGrupoController,
} from "../controllers/grupos.controller";

export const gruposRouter = Router();

gruposRouter.get("/mio", obtenerGrupo);
gruposRouter.post("/", crearGrupoController);
gruposRouter.post("/unirse", unirseAGrupoController);