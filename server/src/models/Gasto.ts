import mongoose from "mongoose";

const GastoSchema = new mongoose.Schema({
  usuarioId: { type: String, required: true },
  grupoId: { type: String, default: null },
  nombre: { type: String, required: true },
  cantidad: { type: Number, required: true },
  categoria: { type: String, required: true },
  fecha: { type: String, required: true },
  tipoIVA: { type: Number, required: true, default: 21 },
  retencionIRPF: { type: Number, required: true, default: 0 },
}, { timestamps: true });

export const GastoModel = mongoose.model("Gasto", GastoSchema);