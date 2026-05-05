import mongoose from "mongoose";

const GrupoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  adminId: { type: String, required: true },
  miembros: [{ type: String }],
  codigo: { type: String, required: true, unique: true },
}, { timestamps: true });

export const GrupoModel = mongoose.model("Grupo", GrupoSchema);