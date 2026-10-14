import mysql from "mysql2/promise";
import dotenv from "dotenv";

// Asegurar que las variables de entorno esten cargadas
dotenv.config();

// Crear el pool de conexiones utilizando las variables del archivo .env
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || "marketplace",
  waitForConnections: true,
  connectionLimit: 10, // Maximo de conexiones simultaneas en el pool
  queueLimit: 0, // Sin limite de peticiones en cola
});

// Funcion opcional para verificar la conexion al iniciar el servidor
export const probarConexionDB = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Conexion a la base de datos MySQL exitosa");
    connection.release(); // Liberar la conexion de vuelta al pool
  } catch (error) {
    console.error(
      " Error critico al conectar con la base de datos MySQL:",
      error.message,
    );

    process.exit(1); // Detener la app si la base de datos no responde
  }
};

// Exportar el pool para usarlo en los controladores o modelos
export default pool;
