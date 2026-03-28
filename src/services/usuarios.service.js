import { prisma } from '../config/prisma.js';
import bcrypt from 'bcrypt';

// obtener usuarios 
export const getUsuarios = async () => {
  return await prisma.usuarios.findMany();
};


// crear usuario
export const createUsuario = async (data) => {

  const { nombre, email, rol, password } = data;

  // hashear password
  const hashedPassword = await bcrypt.hash(password, 10);

  return await prisma.usuarios.create({
    data: {
      nombre,
      email,
      rol,
      password: hashedPassword,
    }
  });

};

//actualizr usuario
export const updateUsuario = async (id, data) => {
  const { nombre, email, rol, password } = data;
  // hashear password
  const hashedPassword = await bcrypt.hash(password, 10);

  return await prisma.usuarios.update({
    where: { id: Number(id) },
    data: {
      nombre,
      email,
      rol,
      password: hashedPassword,
    }
  });
};


//eliminar usuario
export const deleteUsuario = async (id) => {
  return await prisma.usuarios.delete({
    where: { id: Number(id) },
  });
};