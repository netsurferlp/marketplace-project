import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { probarConexionDB } from "./config/db.js"; //Importar la función para probar la conexión a la base de datos

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware Global - Configuración de CORS dinamica usando variables de entorno
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173", // URL of React frontend
    credentials: true, // Necesario para recibir y enviar cookies httpOnly desde el frontend
  }),
);
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET || "default_secret")); // Configuración de cookie-parser con una clave secreta para firmar cookies

// Ruta de Prueba
app.get("/", (req, res) => {
  res.json({ message: "¡Bienvenido a la API!" });
});

app.listen(PORT, async () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
  await probarConexionDB(); // Probar la conexión a la base de datos al iniciar el servidor
});
