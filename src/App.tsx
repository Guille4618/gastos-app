import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GastosProvider } from "./context/GastosContext";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Estadisticas } from "./pages/Estadisticas";
import { NotFound } from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <GastosProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/estadisticas" element={<Estadisticas />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </GastosProvider>
    </BrowserRouter>
  );
}

export default App;