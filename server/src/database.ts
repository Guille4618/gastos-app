import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI ?? "";

export async function conectarDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Conectado a MongoDB");
  } catch (error) {
    console.error("❌ Error conectando a MongoDB:", error);
    process.exit(1);
  }
}