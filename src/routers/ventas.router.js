import { Router } from 'express';
import * as ventasController from '../controllers/ventas.controller.js';

const router = Router();

//rutas para CRUD de la tabla usuarios
// Crear venta
router.post("/", ventasController.crearVenta);
router.get("/por-fecha", ventasController.getVentasPorFecha);
router.get("/:id", ventasController.obtenerVentaPorId);
router.delete("/:id", ventasController.remove);

export default router;