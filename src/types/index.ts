export interface Gasto {
  id: string;
  usuarioId?: string;
  nombre: string;
  cantidad: number;
  categoria: CategoriaGasto;
  fecha: string;
  tipoIVA: TipoIva;
  retencionIRPF: RetencionIRPF;
}

export type CategoriaGasto =
  | "Alimentación"
  | "Transporte"
  | "Ocio"
  | "Salud"
  | "Ropa"
  | "Hogar"
  | "Otros";


export type TipoIVA = 0 | 4 | 10 | 21;
export type RetencionIRPF = 0 | 7 | 15 | 19 | 21;

export interface ResumenFiscal {
  baseImponible: number;
  cuotaIVA: number;
  retencionIRPF: number;
  totalConIVA: number;
  totalAPagar: number;
}

export interface RespuestaAPI<T> {
  exito: boolean;
  datos: T;
  error?: string;
}

export interface FiltrosGasto {
  categoria: CategoriaGasto | "Todas";
  fechaDesde: string;
  fechaHasta: string;
}

export interface Grupo {
  id: string;
  nombre: string;
  adminId: string;
  miembros: string[];
  codigo: string;
}

export interface GastoGrupo extends Gasto {
  grupoId: string;
}