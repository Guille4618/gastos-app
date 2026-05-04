import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import type { User } from "firebase/auth";
import { auth } from "../firebase";

interface AuthContextType {
  usuario: User | null;
  cargando: boolean;
  registrar: (email: string, password: string) => Promise<void>;
  iniciarSesion: (email: string, password: string) => Promise<void>;
  cerrarSesion: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<User | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const unsuscribe = onAuthStateChanged(auth, (user) => {
      setUsuario(user);
      setCargando(false);
    });
    return unsuscribe;
  }, []);

  async function registrar(email: string, password: string) {
    await createUserWithEmailAndPassword(auth, email, password);
  }

  async function iniciarSesion(email: string, password: string) {
    await signInWithEmailAndPassword(auth, email, password);
  }

  async function cerrarSesion() {
    await signOut(auth);
  }

  return (
    <AuthContext.Provider value={{ usuario, cargando, registrar, iniciarSesion, cerrarSesion }}>
      {!cargando && children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return context;
}