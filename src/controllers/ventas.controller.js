import * as ventasService from '../services/ventas.service.js';

export const crearVenta = async (req, res) => {
  try {

    const venta = await ventasService.crearVenta(req.body);

    res.status(201).json({
      ok: true,
      venta
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      ok: false,
      message: error.message,
      error: error
    });
  }
};


export const getVentasPorFecha = async (req, res) => {
  try {

    const { fechaini, fechafin } = req.query;

    console.log("Fechas recibidas:", fechaini, fechafin);

    const ventas = await ventasService.getVentasPorFecha(
      fechaini,
      fechafin
    );

    res.json({
      ok: true,
      ventas
    });

  } catch (error) {

    console.error("Error getVentasPorFecha:", error);

    res.status(500).json({
      ok: false,
      message: error.message,
      error
    });
  }
};

export const obtenerVentaPorId = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || isNaN(id)) return res.status(400).json({ mensaje: "ID inválido" });

    const venta = await ventasService.getVentaPorId(id);

    if (!venta) return res.status(404).json({ mensaje: "Venta no encontrada" });

    res.json(venta);
  } catch (error) {
    console.error("Error en obtenerVentaPorId:", error);
    res.status(500).json({ mensaje: error.message });
  }
};


export const remove = async (req, res) => {
  try {
    const data = await ventasService.deleteVenta(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
