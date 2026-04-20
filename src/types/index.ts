export interface Gasto {
    id: string;
    nombre: string;
    cantidad: number;
    categoria: CategoriaGasto;
    fecha: string;
  }
  
  export type CategoriaGasto =
    | "Alimentación"
    | "Transporte"
    | "Ocio"
    | "Salud"
    | "Ropa"
    | "Hogar"
    | "Otros";
  
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