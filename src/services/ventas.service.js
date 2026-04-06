import { prisma } from '../config/prisma.js';

export const crearVenta = async (data) => {

  console.log(data);

  const {
    idcliente,
    subtotal,
    descuento,
    total,
    detalle
  } = data;

  const factura = await prisma.$transaction(async (tx) => {

    // 1. Crear factura
    const factura = await tx.facturas.create({
      data: {
        idcliente,
        fecha: new Date(),
        subtotal,
        descuento,
        total
      }
    });

    // 2. Crear detalle factura
    await tx.detallefacturas.createMany({
      data: detalle.map(item => ({
        idfactura: factura.id,
        idarticulo: Number(item.idarticulo),
        cantidad: Number(item.cantidad),
        precioventa: Number(item.precioventa),
        preciocosto: Number(item.preciocosto),
        tipodesc: item.tipodesc,
        descuento: Number(item.descuento),
        total: Number(item.total)
      }))
    });

    // 3. Descontar inventario
    for (const item of detalle) {
      await tx.articulos.update({
        where: {
          id: item.idarticulo
        },
        data: {
          existencia: {
            decrement: item.cantidad
          }
        }
      });
    }

    // 🔥 4. Obtener factura con relaciones
    const facturaCompleta = await tx.facturas.findUnique({
      where: {
        id: factura.id
      },
      include: {
        clientes: true,
        detallefacturas: {
          include: {
            articulos: true
          }
        }
      }
    });

    return facturaCompleta;

  });

  return factura;
};

// obtener ventas por rango de fecha
export const getVentasPorFecha = async (fechaini, fechafin) => {

  return await prisma.facturas.findMany({
    where: {
      fecha: {
        gte: new Date(`${fechaini}T00:00:00.000`),
        lte: new Date(`${fechafin}T23:59:59.999`)
      }
    },
    include: {
      clientes: true
    },
    orderBy: {
      fecha: 'desc'
    }
  });

};

// obtener una venta por ID
export const getVentaPorId = async (id) => {
  try {
    // convertimos a número
    const venta = await prisma.facturas.findUnique({
      where: { id: Number(id) },
      include: {
        clientes: true,
        detallefacturas: true // no incluimos articulos directamente
      }
    });

    if (!venta) return null;

    // opcional: mapear detallefacturas e intentar traer articulos de manera segura
    const detalleConArticulos = await Promise.all(
      venta.detallefacturas.map(async (d) => {
        try {
          const articulo = await prisma.articulos.findUnique({
            where: { id: d.idarticulo }
          });
          return { ...d, articulos: articulo || null };
        } catch {
          return { ...d, articulos: null };
        }
      })
    );

    return { ...venta, detallefacturas: detalleConArticulos };
  } catch (error) {
    console.error("Error en getVentaPorId:", error);
    throw error; // lo maneja el controller
  }
};


//eliminar venta
export const deleteVenta = async (id) => {
  return await prisma.facturas.delete({
    where: { id: Number(id) },
  });
};