import express from "express";
import cors from "cors";
import { gastosRouter } from "./routes/gastos";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use("/api/v1/gastos", gastosRouter);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});