import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../config/db.js";

//funcion auxiliar para generar token JWT
const generateToken = (usuario) => {
return jwt.sign(
    { id: usuario.id, 
    email: usuario.email,
    rol: usuario.rol},
    process.env.JWT_SECRET || 'secreto_temporal',
    { expiresIn: process.env.JWT_EXPIRES_IN || '24h'}
);
};

// =================================================
// 1. REGISTRO DE USUARIO LOCAL
//==================================================

export const registrarLocal = async (req, res) => {
try {
    const { nombre , email, password} = req.body;

    //validar campos obligatorios
}



}
