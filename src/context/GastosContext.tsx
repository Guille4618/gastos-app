import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { Gasto, FiltrosGasto } from "../types";
import { obtenerGastos, crearGasto, editarGasto, eliminarGasto } from "../api/client";

interface GastosContextType {
  gastos: Gasto[];
  cargando: boolean;
  error: string | null;
  filtros: FiltrosGasto;
  gastosFiltrados: Gasto[];
  agregarGasto: (gasto: Omit<Gasto, "id">) => Promise<void>;
  actualizarGasto: (id: string, gasto: Omit<Gasto, "id">) => Promise<void>;
  borrarGasto: (id: string) => Promise<void>;
  setFiltros: (filtros: FiltrosGasto) => void;
}

const GastosContext = createContext<GastosContextType | null>(null);

export function GastosProvider({ children }: { children: ReactNode }) {
  const [gastos, setGastos] = useState<Gasto[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filtros, setFiltros] = useState<FiltrosGasto>({
    categoria: "Todas",
    fechaDesde: "",
    fechaHasta: "",
  });

  useEffect(() => {
    cargarGastos();
  }, []);

  async function cargarGastos() {
    try {
      setCargando(true);
      const respuesta = await obtenerGastos();
      if (respuesta.exito) setGastos(respuesta.datos);
      else setError("Error al cargar los gastos");
    } catch {
      setError("No se pudo conectar con el servidor");
    } finally {
      setCargando(false);
    }
  }

  async function agregarGasto(gasto: Omit<Gasto, "id">) {
    const respuesta = await crearGasto(gasto);
    if (respuesta.exito) setGastos(prev => [...prev, respuesta.datos]);
  }

  async function actualizarGasto(id: string, gasto: Omit<Gasto, "id">) {
    const respuesta = await editarGasto(id, gasto);
    if (respuesta.exito)
      setGastos(prev => prev.map(g => (g.id === id ? respuesta.datos : g)));
  }

  async function borrarGasto(id: string) {
    const respuesta = await eliminarGasto(id);
    if (respuesta.exito) setGastos(prev => prev.filter(g => g.id !== id));
  }

  const gastosFiltrados = gastos.filter(g => {
    const porCategoria =
      filtros.categoria === "Todas" || g.categoria === filtros.categoria;
    const porFechaDesde = !filtros.fechaDesde || g.fecha >= filtros.fechaDesde;
    const porFechaHasta = !filtros.fechaHasta || g.fecha <= filtros.fechaHasta;
    return porCategoria && porFechaDesde && porFechaHasta;
  });

  return (
    <GastosContext.Provider
      value={{
        gastos,
        cargando,
        error,
        filtros,
        gastosFiltrados,
        agregarGasto,
        actualizarGasto,
        borrarGasto,
        setFiltros,
      }}
    >
      {children}
    </GastosContext.Provider>
  );
}

export function useGastos(): GastosContextType {
  const context = useContext(GastosContext);
  if (!context) throw new Error("useGastos debe usarse dentro de GastosProvider");
  return context;
}