import { prisma } from '../config/prisma.js';

//obtener clientes 
export const getClientes = async () => {
  return await prisma.clientes.findMany();
};

//crear cliente
export const createCliente = async (data) => {

  console.log(data);

  const { nombre, direccion, telefono, nit } = data;

  return await prisma.clientes.create({
    data: {
      nombre,
      direccion,
      telefono,
      nit,
    }
  });

};

//actualizr cliente
export const updateCliente = async (id, data) => {
  return await prisma.clientes.update({
    where: { id: Number(id) },
    data: {
      nombre: data.nombre,
      direccion: data.direccion,
      telefono: data.telefono,
      nit: data.nit,
    },
  });
};

//eliminar cliente
export const deleteCliente = async (id) => {
  return await prisma.clientes.delete({
    where: { id: Number(id) },
  });
};

//buscar cliente por nombre 
export const buscarClientes = async (search) => {
  return await prisma.clientes.findMany({
    where: {
      OR: [
        {
          nombre: {
            contains: search,
            mode: "insensitive"
          }
        },
        {
          direccion: {
            contains: search,
            mode: "insensitive"
          }
        },        
        {
          telefono: {
            contains: search,
            mode: "insensitive"
          }
        },
        {
          nit: {
            contains: search,
            mode: "insensitive"
          }
        }
      ]
    },
    take: 20,
    orderBy: {
      nombre: "asc"
    }
  });
};