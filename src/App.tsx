import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { GastosProvider } from "./context/GastosContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Estadisticas } from "./pages/Estadisticas";
import { NotFound } from "./pages/NotFound";
import { Login } from "./pages/Login";
import { Registro } from "./pages/Registro";

function RutaProtegida({ children }: { children: React.ReactNode }) {
  const { usuario } = useAuth();
  if (!usuario) return <Navigate to="/login" />;
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      <Route
        path="/"
        element={
          <RutaProtegida>
            <GastosProvider>
              <Layout>
                <Home />
              </Layout>
            </GastosProvider>
          </RutaProtegida>
        }
      />
      <Route
        path="/estadisticas"
        element={
          <RutaProtegida>
            <GastosProvider>
              <Layout>
                <Estadisticas />
              </Layout>
            </GastosProvider>
          </RutaProtegida>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;