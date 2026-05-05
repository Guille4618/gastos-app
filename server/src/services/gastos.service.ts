import { GastoModel } from "../models/Gasto";

export async function getGastos(usuarioId: string) {
  return GastoModel.find({ usuarioId });
}

export async function createGasto(data: any, usuarioId: string) {
  const gasto = new GastoModel({ ...data, usuarioId });
  return gasto.save();
}

export async function updateGasto(id: string, data: any, usuarioId: string) {
  return GastoModel.findOneAndUpdate(
    { _id: id, usuarioId },
    data,
    { new: true }
  );
}

export async function deleteGasto(id: string, usuarioId: string) {
  const resultado = await GastoModel.findOneAndDelete({ _id: id, usuarioId });
  return resultado !== null;
}