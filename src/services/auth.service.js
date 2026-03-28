import { prisma } from '../config/prisma.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const loginService = async ({ email, password }) => {

  const usuario = await prisma.usuarios.findUnique({
    where: { email }
  });  

  if (!usuario) {
    throw new Error("Usuario o contraseña incorrectos");
  }

  const passwordValido = await bcrypt.compare(
    password,
    usuario.password
  );


  if (!passwordValido) {
    throw new Error("Usuario o contraseña incorrectos");
  }

  const token = jwt.sign(
    {
      id: usuario.id,
      rol: usuario.rol
    },
    process.env.JWT_SECRET || "secreto",
    {
      expiresIn: "8h"
    }
  );

  return {
    token,
    usuario: {
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol
    }
  };
};