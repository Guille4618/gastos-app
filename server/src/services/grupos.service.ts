import { randomUUID } from "crypto";

interface Grupo {
  id: string;
  nombre: string;
  adminId: string;
  miembros: string[];
  codigo: string;
}

let grupos: Grupo[] = [];

function generarCodigo(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

export function crearGrupo(nombre: string, adminId: string): Grupo {
  const nuevo: Grupo = {
    id: randomUUID(),
    nombre,
    adminId,
    miembros: [adminId],
    codigo: generarCodigo(),
  };
  grupos.push(nuevo);
  return nuevo;
}

export function getGrupoPorUsuario(usuarioId: string): Grupo | null {
  return grupos.find(g => g.miembros.includes(usuarioId)) ?? null;
}

export function unirseAGrupo(codigo: string, usuarioId: string): Grupo | null {
  const grupo = grupos.find(g => g.codigo === codigo);
  if (!grupo) return null;
  if (!grupo.miembros.includes(usuarioId)) {
    grupo.miembros.push(usuarioId);
  }
  return grupo;
}