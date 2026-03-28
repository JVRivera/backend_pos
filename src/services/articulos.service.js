import { prisma } from '../config/prisma.js';

export const getArticulos = async () => {
  return await prisma.articulos.findMany();
};

export const getArticuloById = async (id) => {
  return await prisma.articulos.findUnique({
    where: { id: Number(id) },
  });
};

export const createArticulo = async (data) => {

  const { articulo, descripcion, existencia, precioventa, preciocosto } = data;

  return await prisma.articulos.create({
    data: {
      articulo,
      descripcion,
      existencia: Number(existencia),
      precioventa: Number(precioventa),
      preciocosto: Number(preciocosto),
    }
  });

};

export const updateArticulo = async (id, data) => {
  return await prisma.articulos.update({
    where: { id: Number(id) },
    data: {
      articulo: data.articulo,
      descripcion: data.descripcion,
      existencia: data.existencia,
      precioventa: data.precioventa,
      preciocosto: data.preciocosto,
    },
  });
};

export const deleteArticulo = async (id) => {
  return await prisma.articulos.delete({
    where: { id: Number(id) },
  });
};