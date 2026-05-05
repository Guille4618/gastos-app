import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { Grupo } from "../types";
import { auth } from "../firebase";

interface GrupoContextType {
  grupo: Grupo | null;
  cargando: boolean;
  crearGrupo: (nombre: string) => Promise<void>;
  unirseAGrupo: (codigo: string) => Promise<void>;
  salirDeGrupo: () => void;
}

const GrupoContext = createContext<GrupoContextType | null>(null);

export function GrupoProvider({ children }: { children: ReactNode }) {
  const [grupo, setGrupo] = useState<Grupo | null>(null);
  const [cargando, setCargando] = useState(false);

  const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000/api/v1";

  async function getAuthHeaders(): Promise<HeadersInit> {
    const token = await auth.currentUser?.getIdToken();
    return {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  }

  useEffect(() => {
    cargarGrupo();
  }, []);

  async function cargarGrupo() {
    try {
      setCargando(true);
      const headers = await getAuthHeaders();
      const res = await fetch(`${BASE_URL}/grupos/mio`, { headers });
      const data = await res.json();
      if (data.exito) setGrupo(data.datos);
    } catch {
      console.error("No se pudo cargar el grupo");
    } finally {
      setCargando(false);
    }
  }

  async function crearGrupo(nombre: string) {
    const headers = await getAuthHeaders();
    const res = await fetch(`${BASE_URL}/grupos`, {
      method: "POST",
      headers,
      body: JSON.stringify({ nombre }),
    });
    const data = await res.json();
    if (data.exito) setGrupo(data.datos);
  }

  async function unirseAGrupo(codigo: string) {
    const headers = await getAuthHeaders();
    const res = await fetch(`${BASE_URL}/grupos/unirse`, {
      method: "POST",
      headers,
      body: JSON.stringify({ codigo }),
    });
    const data = await res.json();
    if (data.exito) setGrupo(data.datos);
    else throw new Error(data.error);
  }

  function salirDeGrupo() {
    setGrupo(null);
  }

  return (
    <GrupoContext.Provider value={{ grupo, cargando, crearGrupo, unirseAGrupo, salirDeGrupo }}>
      {children}
    </GrupoContext.Provider>
  );
}

export function useGrupo(): GrupoContextType {
  const context = useContext(GrupoContext);
  if (!context) throw new Error("useGrupo debe usarse dentro de GrupoProvider");
  return context;
}