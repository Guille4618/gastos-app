import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { gastosRouter } from "./routes/gastos";
import { gruposRouter } from "./routes/grupos";
import { admin } from "./firebase-admin";
import { conectarDB } from "./database";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

export interface RequestConUsuario extends Request {
  usuarioId?: string;
}

async function verificarToken(
  req: RequestConUsuario,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split("Bearer ")[1];
  if (!token) {
    res.status(401).json({ exito: false, error: "Token no proporcionado" });
    return;
  }
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.usuarioId = decoded.uid;
    next();
  } catch {
    res.status(401).json({ exito: false, error: "Token inválido" });
  }
}

app.use("/api/v1/gastos", verificarToken, gastosRouter);
app.use("/api/v1/grupos", verificarToken, gruposRouter);

conectarDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
});