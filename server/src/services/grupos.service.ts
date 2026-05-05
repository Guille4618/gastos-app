import { GrupoModel } from "../models/Grupo";

function generarCodigo(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

export async function crearGrupo(nombre: string, adminId: string) {
  const grupo = new GrupoModel({
    nombre,
    adminId,
    miembros: [adminId],
    codigo: generarCodigo(),
  });
  return grupo.save();
}

export async function getGrupoPorUsuario(usuarioId: string) {
  return GrupoModel.findOne({ miembros: usuarioId });
}

export async function unirseAGrupo(codigo: string, usuarioId: string) {
  const grupo = await GrupoModel.findOne({ codigo });
  if (!grupo) return null;
  if (!grupo.miembros.includes(usuarioId)) {
    grupo.miembros.push(usuarioId);
    await grupo.save();
  }
  return grupo;
}